function randomSession(length = 8) {
  const chars = "abcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";
  for (let i = 0; i < length; i++) {
    result += chars[Math.floor(Math.random() * chars.length)];
  }
  return result;
}

function generate() {
  const host = document.getElementById("host").value;
  const port = document.getElementById("port").value;
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;
  const country = document.getElementById("country").value;
  const sessionTime = document.getElementById("sessionTime").value;
  const count = parseInt(document.getElementById("count").value);

  let output = "";

  for (let i = 0; i < count; i++) {
    const sessid = randomSession(10);
    const fullUser = `${username}-region-${country}-sessid-${sessid}-sesstime-${sessionTime}`;
    output += `${host}:${port}:${fullUser}:${password}\n`;
  }

  document.getElementById("output").value = output;
}

// 🔍 FRAUD CHECK FUNCTION
async function checkAllIPs() {
  const output = document.getElementById("output").value;
  const lines = output.split("\n").filter(l => l.trim() !== "");

  let results = "";

  for (let line of lines) {
    const ip = line.split(":")[0];

    try {
      const res = await fetch(`https://YOUR-BACKEND-URL/check?ip=${ip}`);
      const data = await res.json();

      const score = data.score;
      let risk = "LOW";

      if (score > 70) risk = "HIGH";
      else if (score > 40) risk = "MEDIUM";

      results += `${ip} → Score: ${score} (${risk})\n`;

    } catch (err) {
      results += `${ip} → ERROR\n`;
    }
  }

  document.getElementById("output").value = results;
}

function copy() {
  const textarea = document.getElementById("output");
  textarea.select();
  document.execCommand("copy");
  alert("Copied!");
}
