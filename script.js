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

async function loadCapImages(search) {
    search = search.concat(".png");
    try {
        const response = await fetch(`assets/capImages/${search}`);
        return response.blob();
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
            card.innerHTML = `
                <img class="capImage" src="assets/firstLoad.png" width="100" height="100" alt="capImage">
            `;
            const img = card.querySelector(".capImage");
            loadCapImages(cap.Name).then((blob) => {
                img.src = URL.createObjectURL(blob);
            });
            img.onerror = () => {
                card.style.display = "none";
            };
            capContainer.appendChild(card);
        });
    });
})

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

async function loadCoinImages(search) {
    search = search.concat(".png");
    try {
        const response = await fetch(`assets/coinImages/${search}`);
        return await response.blob();
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
            card.innerHTML = `
                <img class="coinImage" src="assets/firstLoad.png" width="100" height="100" alt="coinImage">
            `;
            const img = card.querySelector(".coinImage");
            loadCoinImages(coin.BackDesign).then((blob) => {
                img.src = URL.createObjectURL(blob);
            });
            img.onerror = () => {
                card.style.display = "none";
            };
            coinContainer.appendChild(card);
        });
    });
})

