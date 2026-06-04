const ispData = {

    US: [
        {
            name: "Comcast",
            value: "as7922_comcast_cable_communications_llc"
        },
        {
            name: "Verizon",
            value: "as701_verizon_business"
        },
        {
            name: "AT&T",
            value: "as7018_att_services_inc"
        },
        {
            name: "Spectrum",
            value: "as20115_charter_communications"
        },
        {
            name: "Cox",
            value: "as22773_cox_communications"
        }
    ],

    DE: [
        {
            name: "Deutsche Telekom",
            value: "as3320_deutsche_telekom_ag"
        },
        {
            name: "Vodafone",
            value: "as3209_vodafone_gmbh"
        },
        {
            name: "O2 Germany",
            value: "as6805_telefonica_germany"
        },
        {
            name: "1&1",
            value: "as8560_ionos_se"
        },
        {
            name: "PYUR",
            value: "as21413_pyur"
        }
    ],

    PL: [
        {
            name: "Orange Polska",
            value: "as5617_orange_polska"
        },
        {
            name: "Play",
            value: "as398101_p4_sp_zoo"
        },
        {
            name: "T-Mobile Polska",
            value: "as12912_t_mobile_polska"
        },
        {
            name: "Plus",
            value: "as8374_polkomtel"
        },
        {
            name: "Netia",
            value: "as12741_netia_sa"
        }
    ]
};

function updateISP() {

    const country =
        document.getElementById("country").value;

    const operator =
        document.getElementById("operator");

    operator.innerHTML = "";

    ispData[country].forEach(isp => {

        const option =
            document.createElement("option");

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

    if (!host || !port || !username || !password) {
        alert("Please complete all fields.");
        return;
    }

    if (!count || count < 1) {
        alert("Invalid amount.");
        return;
    }

    let output = "";

    for (let i = 0; i < count; i++) {

        const sessid =
            randomSession(10);

        const fullUser =
            `${username}-region-${country}-isp-${operator}-sessid-${sessid}-sesstime-${sessionTime}`;

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

    navigator.clipboard.writeText(
        textarea.value
    );

    alert("Copied!");
}

window.onload = updateISP;
