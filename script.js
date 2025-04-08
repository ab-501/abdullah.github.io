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
    let capCount = {};
    let displayedNames = new Set();

    caps.forEach(cap => {
        capCount[cap.Name] = (capCount[cap.Name] || 0) + 1;
    });

    caps.forEach(cap => {
        if (!displayedNames.has(cap.Name)) {
            displayedNames.add(cap.Name);

            let card = document.createElement("div");
            card.classList.add("CapCard");

            let duplicateText = capCount[cap.Name] > 1 ? `Duplicates: ${capCount[cap.Name]}` : "";

            card.innerHTML = `
                <h1>${cap.Name}</h1>
                <h2>${cap.CapType}</h2>
                <p>${cap.Material}</p>
                <h3>${cap.Design}</h3>
                <h3>${cap.Country}</h3>
                <h3>${cap.BeverageType}</h3>
                <p>${duplicateText}</p>
            `;

            capContainer.appendChild(card);
        }
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
    let backDesignCount = {};
    let displayedDesigns = new Set();
    let duplicateCount = 0;
    let duplicates = [];

    coins.forEach(row => {
        let design = row.BackDesign;
        backDesignCount[design] = (backDesignCount[design] || 0) + 1;
    });

    for (let design in backDesignCount) {
        if (backDesignCount[design] > 1) {
            duplicateCount += backDesignCount[design];
            duplicates.push({ design, count: backDesignCount[design] });
        }
    }

    coins.forEach(coin => {
        if (!displayedDesigns.has(coin.BackDesign)) {
            displayedDesigns.add(coin.BackDesign);

            let card = document.createElement("div");
            card.classList.add("CoinCard");

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

            let duplicate = duplicates.find(d => d.design === coin.BackDesign);

            let duplicateText = duplicate ? `Duplicates: ${duplicate.count}` : "";

            card.innerHTML = `
                <h1>${coin.Denomination} ${coin.Currency}</h1>
                <h2>${coin.FrontDesign}</h2>
                <p>${coin.BackDesign}</p>
                <h3>${coin.Country} ${coin.Year}</h3>
                <h3>${duplicateText}</h3>
            `;

            coinContainer.appendChild(card);
        }
    });
});


// loadCSV().then(coins => {
//     console.log(Object.keys(coins[0]));
//     let found = [];
//     let display = [];
//     let c = 0;
//     coins.forEach(row => {
//         if(found.includes(row.BackDesign)){
//             // display = row;
//             c++;
//         }
//         console.log(c);
//         // console.log("Country:", row.Country);
//     });
// });




// const apiKey = 'ebq4G7c4fZw5q8HKrx1ZTAcolXnnuNLm2RC8o2d';
// console.log(apiKey)
//
// fetch('https://api.numista.com/v3/types/95420', {
//     method: 'GET',
//     headers: {
//         'Numista-API-Key': apiKey,
//         'Accept': 'application/json'
//     }
// })
//     .then(response => {
//         if (!response.ok) {
//             throw new Error(`HTTP error! Status: ${response.status}`);
//         }
//         console.log(response);
//         return response.text();
//     })
//     .then(data => {
//         console.log('Coin data:', data);
//     })
//     .catch(error => {
//         console.error('Error fetching data from Numista API:', error);
//     });
