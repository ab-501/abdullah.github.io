fetch("header.html")
    .then(response => response.text())
    .then(data => {
        document.getElementById("header-placeholder").innerHTML = data;
    });

async function loadCaps() {
    try {
        const response = await fetch("assets/Caps.csv");
        const text = await response.text();

        const result = Papa.parse(text, {
            header: true,
            skipEmptyLines: true,
        });

        return result.data;
    } catch (err) {
        console.error("Error loading Caps:", err);
    }
}

loadCaps().then(caps => {
    let capContainer = document.getElementById("CapGrid");
    caps.forEach(cap => {
        let card = document.createElement("div");
        card.classList.add("CapCard");

        card.innerHTML = `
            <h1>${cap.Name}</h1>
            <h2>${cap.CapType}</h2>
            <h2>${cap.Material}</h2>
            <h3>${cap.FrontDesign}</h3>
            <h3>${cap.Country}</h3>
            <h3>${cap.BeverageType}</h3>
            <h3>Total Quantity: ${cap.Quantity}</h3>
        `;
        capContainer.appendChild(card);
    });
});


async function loadCoins() {
    try {
        const response = await fetch("assets/Coins.csv");
        const text = await response.text();

        const result = Papa.parse(text, {
            header: true,
            skipEmptyLines: true,
        });

        return result.data;
    } catch (err) {
        console.error("Error loading Coins:", err);
    }
}

loadCoins().then(coins => {
    let coinContainer = document.getElementById("CoinGrid");
    coins.forEach(coin => {
        let card = document.createElement("div");
        card.classList.add("CoinCard");
        styleCoinCard(coin, card);
        card.innerHTML = `
            <h1>${coin.Denomination} ${coin.Currency}</h1>
            <h2>${coin.FrontDesign}</h2>
            <p>${coin.BackDesign}</p>
            <h3>${coin.Country} ${coin.Year}</h3>
            <h3>Total Quantity: ${coin.Quantity}</h3>
        `;
        coinContainer.appendChild(card);
    });
});

function styleCoinCard(coin, card){
    if((coin.Country === "UK" && coin.Currency === "Pence" || coin.Currency === "Euro") && ["10", "20", "50"].includes(coin.Denomination)){
        card.style.background = "silver";
    }

    if(coin.Country === "UK" && (coin.Denomination === "5" || coin.Denomination === "1" || coin.Denomination === "2") && coin.Currency === "Pence"){
        card.style.background = "sandybrown";
    }

    if(coin.Country === "UK" && ["1", "2",].includes(coin.Denomination) && coin.Currency === "Pound"){
        card.style.background = "gold";
    }

    if((coin.Denomination === "1" || coin.Denomination === "2") && coin.Currency === "Euro"){
        card.style.background = "lightgoldenrodyellow";
    }

    if(coin.Denomination === "TESCO"){
        card.style.background = "blue";
        card.style.color = "ghostwhite";
    }
}