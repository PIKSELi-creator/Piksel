let pixels = 10000;
let coins = 100000;

function updateCurrencies() {
    document.querySelectorAll('.currency span').forEach(el => {
        if (el.textContent.includes('🪙')) el.textContent = `${coins} 🪙`;
        if (el.textContent.includes('💎')) el.textContent = `${pixels} 💎`;
    });
}

function hideAll() {
    document.querySelectorAll('#pubgLobby, #mapSelect, #inventoryScreen, #shopScreen, #casesScreen').forEach(el => el.style.display = 'none');
}

function showMainLobby() {
    hideAll();
    const lobby = document.getElementById('pubgLobby');
    lobby.style.display = 'flex';
    lobby.innerHTML = `
        <div class="lobby-header">
            <div style="display:flex; align-items:center; gap:12px;">
                <h1 style="font-size:22px; color:#00ff9d;">КС ГО МИНИ 11.1</h1>
            </div>
            <div class="currency">
                <span style="color:#ffff00;">${coins} 🪙</span>
                <span style="color:#00ffff;">${pixels} 💎</span>
            </div>
        </div>
        <div class="tab-bar">
            <div class="tab active">🏠 ЛОББИ</div>
            <div class="tab" onclick="showMapSelect()">🎮 ИГРАТЬ</div>
            <div class="tab" onclick="showCases()">📦 КЕЙСЫ</div>
            <div class="tab" onclick="showShop()">🛒 МАГАЗИН</div>
            <div class="tab" onclick="showInventory()">🎒 ИНВЕНТАРЬ</div>
        </div>
        <div style="flex:1; display:flex; flex-direction:column; justify-content:center; align-items:center; padding:20px; gap:25px;">
            <div onclick="showMapSelect()" style="width:100%; max-width:420px; padding:35px 20px; background:linear-gradient(90deg,#00ff9d,#00cc77); color:#000; font-size:28px; text-align:center; border:8px solid #000; border-radius:15px; box-shadow:0 0 40px #00ff9d; cursor:pointer;">▶️ ИГРАТЬ СЕЙЧАС</div>
            <div style="display:flex; gap:20px; width:100%; max-width:420px;">
                <div onclick="showHowToPlay()" class="mapCard" style="flex:1;">❔<br>КАК ИГРАТЬ</div>
                <div onclick="showCases()" class="mapCard" style="flex:1;">🔥<br>ОТКРЫТЬ<br>КЕЙС</div>
            </div>
            <div onclick="showInventory()" class="mapCard" style="width:100%; max-width:420px;">🎒 ИНВЕНТАРЬ</div>
            <div onclick="showShop()" class="mapCard" style="width:100%; max-width:420px;">🛒 МАГАЗИН</div>
        </div>
        <div style="text-align:center; padding:15px; color:#666; font-size:12px;">Версия 11.1 • Полноценный шутер</div>
    `;
}

function showHowToPlay() {
    hideAll();
    const screen = document.getElementById('mapSelect'); // используем этот див
    screen.style.display = 'flex';
    screen.innerHTML = `
        <h1 style="margin:30px;color:#ffcc00;">❔ КАК ИГРАТЬ</h1>
        <div style="max-width:460px; text-align:left; padding:20px; font-size:18px; line-height:1.6;">
            <p><b>WASD</b> — движение</p>
            <p><b>Мышь</b> — прицел + стрельба</p>
            <p><b>R</b> — перезарядка</p>
            <p>Уничтожь всех ботов!</p>
            <p>Боты теперь тоже стреляют — осторожно!</p>
        </div>
        <div class="btn" onclick="backToLobby()" style="margin-top:40px;">НАЗАД В ЛОББИ</div>
    `;
}

function showMapSelect() { /* как раньше */ 
    hideAll();
    const screen = document.getElementById('mapSelect');
    screen.style.display = 'flex';
    screen.innerHTML = `
        <h1 style="margin:40px; color:#ffcc00;">🎮 ВЫБЕРИ КАРТУ</h1>
        <div onclick="launchGame('dust2_mini')" class="mapCard" style="margin:20px auto; max-width:360px; font-size:24px;">DUST 2 MINI<br><small style="font-size:14px;">Классика</small></div>
        <div class="btn" onclick="backToLobby()" style="margin-top:30px;">← НАЗАД В ЛОББИ</div>
    `;
}

function launchGame(mapId) {
    const canvas = document.getElementById('c');
    const hud = document.getElementById('gameHUD');
    canvas.style.display = 'block';
    hud.style.display = 'block';
    hud.innerHTML = `<div class="kill-counter">KILLS: <span id="killCount">0</span></div>`;
    resizeCanvas();
    if (typeof window.startGame === 'function') window.startGame(mapId);
}

function backToLobby() {
    document.getElementById('c').style.display = 'none';
    document.getElementById('gameHUD').style.display = 'none';
    document.getElementById('gameHUD').innerHTML = '';
    hideAll();
    showMainLobby();
}

function resizeCanvas() { /* как раньше */ 
    const canvas = document.getElementById('c');
    if (!canvas) return;
    const w = window.visualViewport ? window.visualViewport.width : window.innerWidth;
    const h = window.visualViewport ? window.visualViewport.height : window.innerHeight;
    canvas.width = Math.floor(w);
    canvas.height = Math.floor(h);
    if (typeof window.redrawGame === 'function') window.redrawGame();
}

window.addEventListener('load', () => {
    showMainLobby();
    resizeCanvas();
    window.addEventListener('resize', () => setTimeout(resizeCanvas, 100));
    console.log('%c✅ ui.js 11.1 — готов к бою!', 'color:#00ff9d; font-size:16px');
});