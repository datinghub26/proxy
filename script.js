function randomString(length = 8) {
    const chars = "abcdefghijklmnopqrstuvwxyz0123456789";
    let result = "";
    for (let i = 0; i < length; i++) {
        result += chars[Math.floor(Math.random() * chars.length)];
    }
    return result;
}

function generateProxy() {

    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    const country = document.getElementById("country").value;
    const time = document.getElementById("time").value;

    const session = randomString();

    let formattedUser = "";

    // 🔥 RULE 1
    if (username.includes("50201565-zone-custom-zone")) {
        formattedUser = `resi-region-${country}-sessid-${session}-sesstime-${time}`;
    }

    // 🔥 RULE 2
    else if (username.includes("cpamarketing-zone")) {
        formattedUser = `abc-region-${country.toUpperCase()}-session-${session}-sessTime-${time}`;
    }

    else {
        formattedUser = username;
    }

    const proxy = `43.159.29.144:4950:${formattedUser}:${password}`;

    document.getElementById("output").value = proxy;
}
