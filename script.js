// fetch("header.html")
//     .then(response => response.text())
//     .then(data => {
//         document.getElementById("header-placeholder").innerHTML = data;
//     });

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

document.addEventListener("DOMContentLoaded", () => {
    loadCaps().then((caps) => {
        let capContainer = document.getElementById("CapGrid");
        caps.forEach((cap) => {
            let card = document.createElement("div");
            card.classList.add("CapCard");
            styleCapCard(cap, card);
            card.innerHTML = `
            <!--TODO: add cap images-->
            <img class="image" src="assets/github.png" width="200" height="200" alt="test">
            <div class="content">
                <h1>${cap.Name}</h1>
                <h2>${cap.CapType}</h2>
                <h2>${cap.Material}</h2>
                <h3>${cap.FrontDesign}</h3>
                <h3>${cap.Country}</h3>
                <h3>${cap.BeverageType}</h3>
                <h3>Total Quantity: ${cap.Quantity}</h3>
            </div>
            
        `;
            const img = card.querySelector(".image");
            const content = card.querySelector(".content");
            img.hidden = false;
            content.hidden = true;
            card.addEventListener("mouseover", () => {
                img.hidden = true;
                content.hidden = false;
            })
            card.addEventListener("mouseout", () => {
                img.hidden = false;
                content.hidden = true;
            })
            capContainer.appendChild(card);
        });
    });
})


function styleCapCard(cap, card){
    if(cap.BeverageType === "Water"){
        card.style.background = "lightblue";
    }
    if(cap.Name === "Irn Bru" ||
        cap.Name === "Fanta" ||
        cap.Name === "Orangina" ||
        cap.Name === "Schweppes" ||
        cap.Name === "J2O" ||
        cap.Name === "Miranda"
    ){
        card.style.background = "orange";
    }
    if(cap.Name.startsWith("Oasis")){
        card.style.background = "royalblue";
    }
    if(cap.Name.startsWith("Pepsi")){
        card.style.background = "royalblue";
        card.style.color = "ghostwhite"
    }
    if(cap.Name.startsWith("Coca")){
        card.style.background = "indianred";
    }
    if(cap.Name.startsWith("Diet")){
        card.style.background = "silver";
    }
    if(cap.Name.startsWith("Tymbark") ||
        cap.Name.startsWith("7up") ||
        cap.Name.startsWith("Sprite")

    ){
        card.style.background = "seagreen";
    }
    if(cap.Name.startsWith("Coke") || cap.Name.endsWith("kola")){
        card.style.background = "black";
        card.style.color = "ghostwhite";
    }
    if(cap.BeverageType.includes("Lager") ||
        cap.BeverageType.includes("Beer") ||
        cap.BeverageType.includes("Prosecco") ||
        cap.BeverageType.includes("Rum") ||
        cap.BeverageType.includes("Champagne") ||
        cap.BeverageType.includes("Wine")
    ){
        card.style.background = "sandybrown";
    }
}

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

document.addEventListener("DOMContentLoaded", () => {
    loadCoins().then((coins) => {
        let coinContainer = document.getElementById("CoinGrid");
        coins.forEach((coin) => {
            let card = document.createElement("div");
            card.classList.add("CoinCard");
            styleCoinCard(coin, card);

            card.innerHTML = `
                <!--TODO: add coin images-->
                <img class="image" src="assets/github.png" width="200" height="200" alt="test">
                <div class="content">
                    <h1>${coin.Denomination} ${coin.Currency}</h1>
                    <h2 style="max-width: 30ch">${coin.FrontDesign}</h2>
                    <p style="max-width: 40ch; text-align: center">${coin.BackDesign}</p>
                    <h3>${coin.Country} ${coin.Year}</h3>
                    <h3>Total Quantity: ${coin.Quantity}</h3>
                </div>
        `;
            const img = card.querySelector(".image");
            const content = card.querySelector(".content");
            img.hidden = false;
            content.hidden = true;
            card.addEventListener("mouseover", () => {
                img.hidden = true;
                content.hidden = false;
            })
            card.addEventListener("mouseout", () => {
                img.hidden = false;
                content.hidden = true;
            })
            coinContainer.appendChild(card);
        });
    });
})

function styleCoinCard(coin, card){
    if((coin.Currency === "Pence" || coin.Currency === "Euro") && ["10", "20", "50"].includes(coin.Denomination)){
        card.style.background = "silver";
    }

    if((coin.Denomination === "5" || coin.Denomination === "1" || coin.Denomination === "2") && coin.Currency === "Pence"){
        card.style.background = "sandybrown";
    }

    if(["1", "2",].includes(coin.Denomination) && coin.Currency === "Pound"){
        card.style.background = "gold";
    }

    if(["1", "2",].includes(coin.Denomination) && coin.Currency === "Euro"){
        card.style.background = "lightgoldenrodyellow";
    }

    if(coin.Denomination === "TESCO"){
        card.style.background = "blue";
        card.style.color = "ghostwhite";
    }
}

