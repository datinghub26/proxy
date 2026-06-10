function randomSession(length = 10) {

```
const chars =
    "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

let result = "";

for (let i = 0; i < length; i++) {

    result += chars.charAt(
        Math.floor(Math.random() * chars.length)
    );
}

return result;
```

}

function generate() {

```
const host =
    document.getElementById("host").value.trim();

const port =
    document.getElementById("port").value.trim();

const username =
    document.getElementById("username").value.trim();

const password =
    document.getElementById("password").value.trim();

const provider =
    document.getElementById("provider").value;

const country =
    document.getElementById("country").value;

const sessionTime =
    document.getElementById("sessionTime").value.trim();

const count =
    parseInt(
        document.getElementById("count").value
    );

if (
    !host ||
    !port ||
    !username ||
    !password ||
    !sessionTime
) {
    alert("Please complete all fields.");
    return;
}

if (!count || count < 1) {
    alert("Enter a valid amount.");
    return;
}

let output = "";

for (let i = 0; i < count; i++) {

    const sessid = randomSession(10);

    let fullUser = "";

    if (provider === "abc") {

        fullUser =
            `${username}-region-${country}` +
            `-sessid-${sessid}` +
            `-sesstime-${sessionTime}`;

    } else {

        fullUser =
            `${username}-country-${country}` +
            `-ssid-${sessid}` +
            `-sst-${sessionTime}`;
    }

    output +=
        `${host}:${port}:${fullUser}:${password}\n`;
}

document.getElementById("output").value =
    output;
```

}

function copyText() {

```
const textarea =
    document.getElementById("output");

if (!textarea.value) {
    alert("Nothing to copy.");
    return;
}

navigator.clipboard
    .writeText(textarea.value)
    .then(() => {
        alert("Copied!");
    })
    .catch(() => {
        alert("Failed to copy.");
    });
```

}
