const ispData = {

    US: [
        { name: "AT&T (AS7018)", value: "AS7018" },
        { name: "Comcast (AS7922)", value: "AS7922" },
        { name: "Verizon (AS701)", value: "AS701" },
        { name: "Cogent (AS174)", value: "AS174" },
        { name: "Verizon (AS22394)", value: "AS22394" },
        { name: "Level3 (AS3356)", value: "AS3356" },
        { name: "CenturyLink (AS209)", value: "AS209" },
        { name: "Verizon (AS6167)", value: "AS6167" },
        { name: "T-Mobile (AS21928)", value: "AS21928" },
        { name: "Spectrum (AS20115)", value: "AS20115" },
        { name: "Cox (AS22773)", value: "AS22773" },
        { name: "Frontier (AS5650)", value: "AS5650" }
    ],

    DE: [
        { name: "Deutsche Telekom", value: "AS3320" },
        { name: "Vodafone", value: "AS3209" },
        { name: "O2 Germany", value: "AS6805" },
        { name: "1&1", value: "AS8560" },
        { name: "PYUR", value: "AS21413" }
    ],

    PL: [
        { name: "Orange Polska", value: "AS5617" },
        { name: "Play", value: "AS398101" },
        { name: "T-Mobile Polska", value: "AS12912" },
        { name: "Plus", value: "AS8374" },
        { name: "Netia", value: "AS12741" }
    ]
};

function updateISP() {

    const country = document.getElementById("country");
    const operator = document.getElementById("operator");

    if (!country || !operator) {
        return;
    }

    const selectedCountry = country.value;

    operator.innerHTML = "";

    // None option
    const noneOption = document.createElement("option");
    noneOption.value = "";
    noneOption.textContent = "None";
    operator.appendChild(noneOption);

    if (!ispData[selectedCountry]) {
        return;
    }

    ispData[selectedCountry].forEach(isp => {

        const option = document.createElement("option");

        option.value = isp.value;
        option.textContent = isp.name;

        operator.appendChild(option);
    });
}

function randomSession(length = 10) {

    const chars =
        "abcdefghijklmnopqrstuvwxyz0123456789";

    let result = "";

    for (let i = 0; i < length; i++) {

        result += chars.charAt(
            Math.floor(Math.random() * chars.length)
        );
    }

    return result;
}

function generate() {

    const host =
        document.getElementById("host").value.trim();

    const port =
        document.getElementById("port").value.trim();

    const username =
        document.getElementById("username").value.trim();

    const password =
        document.getElementById("password").value.trim();

    const country =
        document.getElementById("country").value;

    const operator =
        document.getElementById("operator").value;

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
        !password
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

        let fullUser =
            `${username}-region-${country}`;

        // Add ISP only if selected
        if (operator !== "") {
            fullUser += `-isp-${operator}`;
        }

        fullUser +=
            `-sessid-${sessid}-sesstime-${sessionTime}`;

        output +=
            `${host}:${port}:${fullUser}:${password}\n`;
    }

    document.getElementById("output").value =
        output;
}

function copyText() {

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
        });
}

document.addEventListener(
    "DOMContentLoaded",
    () => {

        updateISP();

        document
            .getElementById("country")
            .addEventListener(
                "change",
                updateISP
            );
    }
);
