function showShop() {
    hideAll();
    const screen = document.getElementById('shopScreen');
    screen.style.display = 'flex';
    screen.innerHTML = `
        <h1 style="margin-bottom:30px;">🛒 МАГАЗИН</h1>
        <div style="width:100%; max-width:520px; padding:0 20px;">
            <div onclick="buyCase()" class="mapCard" style="font-size:22px; padding:30px;">📦 PREMIUM КЕЙС<br><span style="color:#ffff00; font-size:18px;">1200 🪙</span></div>
            <div onclick="buyPixels()" class="mapCard" style="border-color:#ffff00; margin-top:20px; font-size:22px; padding:30px;">💎 +1000 PIXELS<br><span style="color:#ffff00; font-size:18px;">300 🪙</span></div>
        </div>
        <div class="btn" onclick="backToLobby()" style="margin-top:40px;">НАЗАД В ЛОББИ</div>
    `;
}

function buyCase() {
    if (coins >= 1200) {
        coins -= 1200;
        updateCurrencies();
        startCaseOpening('premium');
    } else alert("🚫 Недостаточно COINS!");
}

function buyPixels() {
    if (coins >= 300) {
        coins -= 300;
        pixels += 1000;
        updateCurrencies();
        alert("✅ +1000 PIXELS куплено!");
    } else alert("🚫 Недостаточно COINS!");
}

window.showShop = showShop;