function randomSession(length = 10) {
  const chars = "abcdefghijklmnopqrstuvwxyz0123456789";

  let result = "";

  for (let i = 0; i < length; i++) {
    result += chars.charAt(
      Math.floor(Math.random() * chars.length)
    );
  }

  return result;
}

function generate() {

  const host = document.getElementById("host").value.trim();
  const port = document.getElementById("port").value.trim();
  const username = document.getElementById("username").value.trim();
  const password = document.getElementById("password").value.trim();

  const country = document
    .getElementById("country")
    .value
    .trim()
    .toUpperCase();

  const operator = document
    .getElementById("operator")
    .value
    .trim();

  const sessionTime = document
    .getElementById("sessionTime")
    .value
    .trim();

  const count = parseInt(
    document.getElementById("count").value
  );

  if (!host || !port || !username || !password) {
    alert("Please fill Host, Port, Username and Password.");
    return;
  }

  if (!count || count <= 0) {
    alert("Enter a valid Amount.");
    return;
  }

  let output = "";

  for (let i = 0; i < count; i++) {

    const sessid = randomSession(10);

    let fullUser = `${username}-region-${country}`;

    if (operator !== "") {
      fullUser += `-isp-${operator}`;
    }

    fullUser += `-sessid-${sessid}-sesstime-${sessionTime}`;

    output += `${host}:${port}:${fullUser}:${password}\n`;
  }

  document.getElementById("output").value = output;
}

function copyText() {

  const textarea =
    document.getElementById("output");

  if (!textarea.value) {
    alert("Nothing to copy.");
    return;
  }

  navigator.clipboard.writeText(textarea.value);

  alert("Copied!");
}
