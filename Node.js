// server.js
const express = require("express");
const axios = require("axios");
const app = express();

app.get("/check", async (req, res) => {
  const ip = req.query.ip;

  try {
    const response = await axios.get(
      `https://api.scamalytics.com/v1/?ip=${ip}&api_key=YOUR_KEY`
    );

    res.json(response.data);
  } catch (err) {
    res.status(500).send("Error");
  }
});

app.listen(3000, () => console.log("Running..."));
