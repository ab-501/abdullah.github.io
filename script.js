document.addEventListener("DOMContentLoaded", async () => {
    // Get NavBar for all pages
    fetch('header.html')
        .then(response => response.text())
        .then(html => {
            document.getElementById('navbar').innerHTML = html;
        });

    // Containers
    let coinContainer = document.getElementById("CoinGrid");
    let capContainer = document.getElementById("CapGrid");
    let totalContainer = document.getElementById("TotalContainer");

    // Load Items
    let coins = await loadItems("Coins.csv", "Coins") || [];
    let caps = await loadItems("Caps.csv", "Caps") || [];

    // Render all coins and caps
    if(coinContainer){
        coins.forEach(coin => coinContainer.appendChild(createCard(coin, "coin", "CoinCard", "coinImage", "Coins")));
    }
    if(capContainer){
        caps.forEach(cap => capContainer.appendChild(createCard(cap, "cap", "CapCard", "capImage", "Caps")));
    }

    let coinCountry = [
        "UK", "Germany", "Italy", "Spain", "Qatar", "USA", "Israel",
        "Pakistan", "Norway", "Saudi Arabia", "Morocco", "Mexico",
        "Switzerland", "Japan", "Romania", "Poland", "Thailand"
    ];

    let coinDenomination = ["1", "2", "5", "10", "20", "25", "50"];

    let coinCurrency = [
        "Pence", "Pound", "Euro", "Euro Cent", "Fils",
        "Dirhams", "Dime", "New Sheqalim", "Pakistani Rupee", "Krone",
        "Riyals", "Halalas", "New Pesos", "Swiss Franc", "Yen", "Romanian Leu",
        "Zloty", "Thai Baht"
    ];

    let capCountry = [
        "England", "Scotland", "Canada", "Italy", "Spain", "France",
        "Germany", "China", "Dubai", "United States", "Switzerland",
        "Algeria"
    ];

    let coinCountrySection = document.getElementById("coinCountry");
    let coinDenominationSection = document.getElementById("coinDenomination");
    let coinCurrencySection = document.getElementById("coinCurrency");
    let capCountrySection = document.getElementById("capCountry");

    if(coinCountrySection){
        coinCountry.forEach(c => {
            let a = document.createElement("a");
            a.href = "#";
            a.textContent = c;
            coinCountrySection.appendChild(a);
        });
    }
    if(coinDenominationSection){
        coinDenomination.forEach(c => {
            let a = document.createElement("a");
            a.href = "#";
            a.textContent = c;
            coinDenominationSection.appendChild(a);
        });
    }
    if(coinCurrencySection){
        coinCurrency.forEach(c => {
            let a = document.createElement("a");
            a.href = "#";
            a.textContent = c;
            coinCurrencySection.appendChild(a);
        });
    }
    if(capCountrySection){
        capCountry.forEach(c => {
            let a = document.createElement("a");
            a.href = "#";
            a.textContent = c;
            capCountrySection.appendChild(a);
        }); 
    }

    // Check for text and display appropriate info
    let coinSearch = document.getElementById("coinSearch");
    let capSearch = document.getElementById("capSearch");

    let displaySearch = (data, display, type, search) => {
        let container = document.getElementById(display);
        container.innerHTML = "";
        let found = false;
        data.forEach(item => {
            if (Object.values(item).some(v => v?.toString().toLowerCase().includes(search.toLowerCase()))) {
                found = true;
                let card = type === "coin" ? createCard(item, "coin", "CoinCard", "coinImage", "Coins") : createCard(item, "cap", "CapCard", "capImage", "Caps");
                container.appendChild(card);
            }
        });
        document.getElementById(type === "coin" ? "CoinSearchDisplaySeperation" : "CapSearchDisplaySeperation").style.display = found ? "block" : "none";
    };

    if(coinSearch){
        coinSearch.addEventListener("keyup", () => {
            displaySearch(coins, "CoinSearchDisplay", "coin", coinSearch.value);
        });
    }
    if (capSearch){
        capSearch.addEventListener("keyup", () => {
            displaySearch(caps, "CapSearchDisplay", "cap", capSearch.value);
        });
    }

    document.querySelectorAll(".CoinInfoSection").forEach(section => {
        section.addEventListener("click", (e) => {
            if (e.target.tagName === "A") {
                coinSearch.value = e.target.textContent;
                displaySearch(coins, "CoinSearchDisplay", "coin", coinSearch.value);
            }
        })
    });
    document.querySelectorAll("div.CapInfoSection, div.InfoSection").forEach(section => {
        section.addEventListener("click", (e) => {
            if (e.target.tagName === "A") {
                capSearch.value = e.target.textContent;
                displaySearch(caps, "CapSearchDisplay", "cap", capSearch.value);
             }
        })
    });

    // Calculate estimated total value of coins
    let pence = 0; let pounds = 0; let euroCents = 0; let euros = 0;
    coins.forEach(c => {
        
        let val = Number(c.Denomination) * Number(c.Quantity);
        switch(c.Currency){
            case "Pence": pence += val; break;
            case "Pound": pounds += val; break;
            case "Euro Cent": euroCents += val; break;
            case "Euro": euros += val; break;
        }
    });
    let totalPounds = pounds + pence/100;
    let totalEuros = euros + euroCents/100;
    let total = totalPounds + totalEuros*0.87;
    if(totalContainer){
        totalContainer.innerHTML = `<p>Estimated Total Value: £${total.toFixed(2)} GBP</p>`;
    }

    google.charts.load('current', {'packages':['corechart']});
    google.charts.setOnLoadCallback(drawCoinPieChart);
    function drawCoinPieChart() {
        let pence = 0; let pounds = 0; let euroCents = 0; let euros = 0;
        let fils = 0; let dirhams = 0; let dime = 0; let newSheqalim = 0;
        let pakistaniRupee = 0; let krone = 0; let riyals = 0; let halalas = 0;
        let newPesos = 0; let swissFrancs = 0; let yen = 0; let romanianLeu = 0;
        let zloty = 0; let thaiBaht = 0;
        coins.forEach(c => {
            switch(c.Currency){
                case "Pence": pence++; break;
                case "Pound": pounds++; break;
                case "Euro Cent": euroCents++; break;
                case "Euro": euros++; break;
                case "Fils": fils++; break;
                case "Dirhams": dirhams++; break;
                case "Dime": dime++; break;
                case "New Sheqalim": newSheqalim++; break;
                case "Pakistani Rupee": pakistaniRupee++; break;
                case "Krone": krone++; break;
                case "Riyals": riyals++; break;
                case "Halalas": halalas++; break;
                case "New Pesos": newPesos++; break;
                case "Swiss Franc": swissFrancs++; break;
                case "Yen": yen++; break;
                case "Romanian Leu": romanianLeu++; break;
                case "Zloty": zloty++; break;
                case "Thai Baht": thaiBaht++; break;
            }
        });

        let data = google.visualization.arrayToDataTable([
            ['Currency', 'Quantity'],
            ['Pence', pence],
            ['Pounds', pounds],
            ['Euro', euros],
            ['Euro Cent', euroCents],
            ['Fils', fils],
            ['Dirhams', dirhams],
            ['US Dime', dime],
            ['New Sheqalim', newSheqalim],
            ['Pakistani Rupee', pakistaniRupee],
            ['Krone', krone],
            ['Riyals', riyals],
            ['Halalas', halalas],
            ['New Pesos', newPesos],
            ['Swiss Francs', swissFrancs],
            ['Japanese Yen', yen],
            ['Romanian Leu', romanianLeu],
            ['Polish Zloty', zloty],
            ['Thailand Baht', thaiBaht]
        ]);

        let options = {
            title: 'Currency',
            backgroundColor: "none"
        };
        let chart = new google.visualization.PieChart(document.getElementById('coinPieChart'));
        chart.draw(data, options);
    }

    google.charts.setOnLoadCallback(drawCoinBarChart);
    function drawCoinBarChart() {
        let denomHalf = 0; let denomOne = 0; let denomTwo = 0; let denomFive = 0;
        let denomTen = 0 ; let denomTwenty = 0; let denomTwentyFive = 0; let denomFifty = 0;
        coins.forEach(c => {
            switch(c.Denomination){
                case "1/2":denomHalf++; break;
                case "1": denomOne++; break;
                case "2": denomTwo++; break;
                case "5": denomFive++; break;
                case "10": denomTen++; break;
                case "20": denomTwenty++; break;
                case "25": denomTwentyFive++; break;
                case "50": denomFifty++; break;
            }
        })
        console.log(denomFifty);

      let data = google.visualization.arrayToDataTable([
        ['Denomination', 'Quantity'],
        ['Half', denomHalf], 
        ['One', denomOne], 
        ['Two', denomTwo],
        ['Five', denomFive],
        ['Ten', denomTen], 
        ['Twenty', denomTwenty], 
        ['Twenty Five', denomTwentyFive],
        ['Fifty', denomFifty]
      ]);

      let options = {
        title: 'Quantity of Denominations',
        backgroundColor: "none",
        chartArea: {width: '50%'},
        legend: "none",
        hAxis: {
          title: 'Quantity',
          minValue: 0
        },
        vAxis: {
          title: 'Denominations'
        }
      };
      let chart = new google.visualization.BarChart(document.getElementById('coinBarChart'));
      chart.draw(data, options);
    } 

    google.charts.setOnLoadCallback(drawCapBeverageTypeChartChart);
    function drawCapBeverageTypeChartChart() {
        let capBeverageType = {};
        caps.forEach(c => {
            capBeverageType[c.BeverageType] =
                (capBeverageType[c.BeverageType] || 0) + 1;
        });

      let data = google.visualization.arrayToDataTable([
        ['Beverage Type', 'Quantity'],
        ['Alcohol', capBeverageType.Alcohol],
        ['Juice', capBeverageType.Juice],
        ['Milk', capBeverageType.Milk],
        ['Soda', capBeverageType.Soda],
        ['Still Water', capBeverageType["Still Water"]]
      ]);

      let options = {
        title: 'Quantity of Beverage Type',
        backgroundColor: "none",
        chartArea: {width: '50%'},
        legend: "none",
        hAxis: {
          title: 'Quantity',
          minValue: 0
        },
        vAxis: {
          title: 'Denominations'
        }
      };
      let chart = new google.visualization.BarChart(document.getElementById('capBeverageTypeChart'));
      chart.draw(data, options);
    } 

    google.charts.setOnLoadCallback(drawCapTypePieChart);
    function drawCapTypePieChart() {
        let screw = 0; let crown = 0; let cork = 0; 
        caps.forEach(c => {
            switch(c.CapType){
                case "Screw Cap": screw++; break;
                case "Crown Cap": crown++; break;
                case "Cork": cork++; break;
            }
        });

        let data = google.visualization.arrayToDataTable([
            ['Cap Type', 'Quantity'],
            ['Screw Cap', screw],
            ['Crown Cap', crown],
            ['Cork', cork]
        ]);

        let options = {
            title: 'Cap Type',
            backgroundColor: "none"
        };
        let chart = new google.visualization.PieChart(document.getElementById('capTypePieChart'));
        chart.draw(data, options);
    }

    google.charts.setOnLoadCallback(drawCapMaterialPieChart);
    function drawCapMaterialPieChart() {
        let capMaterial = {};
        caps.forEach(c => {
            capMaterial[c.Material] =
                (capMaterial[c.Material] || 0) + 1;
        });

        let data = google.visualization.arrayToDataTable([
            ['Material', 'Quantity'],
            ['Plastic', capMaterial.Plastic],
            ['Metal', capMaterial.Metal],
            ['Cork', capMaterial["Cork Oak Tree"]]
        ]);

        let options = {
            title: 'Material',
            backgroundColor: "none"
        };
        let chart = new google.visualization.PieChart(document.getElementById('capMaterialPieChart'));
        chart.draw(data, options);
    }

    google.charts.setOnLoadCallback(drawCapEdgeTypePieChart);
    function drawCapEdgeTypePieChart() {
        let capEdgeType = {};
        caps.forEach(c => {
            capEdgeType[c.EdgeType] =
                (capEdgeType[c.EdgeType] || 0) + 1;
        });

        let data = google.visualization.arrayToDataTable([
            ['Edge Type', 'Quantity'],
            ['Plain', capEdgeType.Milled],
            ['Reeded', capEdgeType.Reeded],
            ['Crown', capEdgeType.Crown],
            ['Smooth', capEdgeType.Smooth]
        ]);

        let options = {
            title: 'Edge Type',
            backgroundColor: "none"
        };
        let chart = new google.visualization.PieChart(document.getElementById('capEdgeTypePieChart'));
        chart.draw(data, options);
    }

    google.charts.setOnLoadCallback(drawCapDesignPieChart);
    function drawCapDesignPieChart() {
        let capDesign = {};
        caps.forEach(c => {
            capDesign[c.Design] =
                (capDesign[c.Design] || 0) + 1;
        });

        let data = google.visualization.arrayToDataTable([
            ['Design', 'Quantity'],
            ['Logo', capDesign.Logo],
            ['Please Recycle Me', capDesign["Please Recycle Me"]],
            ['I Am Attached To Recycle Together', capDesign["I Am Attached To Recycle Together"]]
        ]);

        let options = {
            title: 'Design',
            backgroundColor: "none"
        };
        let chart = new google.visualization.PieChart(document.getElementById('capDesignPieChart'));
        chart.draw(data, options);
    }

});

// loadItems("Coins.csv", "Coins");
// loadItems("Caps.csv", "Caps");
async function loadItems(csvFile, errorMsg){
    try {
        let response = await fetch("assets/" + csvFile);
        let text = await response.text();

        let result = Papa.parse(text, {
            header: true,
            skipEmptyLines: true,
        });

        return result.data;
    } catch (err) {
        console.error("Error loading " + errorMsg + ":", err);
    }
}

// loadItemImages(coin.ID, "coinImages", "Coins");
// loadItemImages(cap.Name, "capImages", "Caps");
async function loadItemImages(search, itemImages, errorMsg) {
    search += ".png"
    // search = search.concat(".png");
    try {
        let response = await fetch(`assets/${itemImages}/${search}`);
        return await response.blob();
    } catch (err) {
        console.error(`Error loading ${errorMsg}:`, err);
    }
}

function coinTitle(card, coin){
    card.title = "Name: " + coin.ID + "\n" + 
    "Year: " + coin.Year + " | " + "Quantity: " + coin.Quantity
}

function capTitle(card, cap){
    return card.title = "Name: " + cap.Name + "\n" +
    "Country of Origin: " + cap.CountryOrigin + "\n" + 
    "Beverage Type: " + cap.BeverageType + "\n" + 
    "Quantity: " + cap.Quantity
}

// createCard(coin, "coin", "CoinCard", "coinImage", "Coins")
// createCard(cap, "cap", "CapCard", "capImage", "Caps")
function createCard(item, type, cardName, itemImage, errorMsg){
    let card = document.createElement("div");
    card.classList.add(cardName);
    card.innerHTML = `
        <img loading="lazy" class="${itemImage}" alt="${itemImage}" src="assets/images/firstLoad.png" width="75" height="75">
    `;
    let img = card.querySelector("." + itemImage);
    loadItemImages(type === "coin" ? item.ID : item.Name, itemImage + "s", errorMsg).then((blob) => {
        img.src = URL.createObjectURL(blob);
        type === "coin" ? coinTitle(card, item) : capTitle(card, item)
    });
    img.onerror = () => {
        card.style.display = "none";
    };
    return card;
}