// ====================== GAME.JS — ФИНАЛЬНАЯ ПРОСТАЯ ВЕРСИЯ (12.0) ======================

const WORLD_W = 1600;
const WORLD_H = 1000;
let camera = { x: 0, y: 0 };

let player = {
    x: WORLD_W * 0.3,
    y: WORLD_H * 0.7,
    size: 18,
    speed: 7.2,
    hp: 100,
    armor: 100,
    angle: 0,
    money: 800
};

let bullets = [], enemyBullets = [], enemies = [], allies = [], particles = [], walls = [];
let score = 0, round = 1;
let roundTime = 115;
let timerInterval = null;
let gameState = 'menu';
let currentMap = 0;

const mapLayouts = [
    // Карта 1 — DUST MINI
    [{x:150,y:120,w:500,h:25},{x:820,y:120,w:380,h:25},{x:280,y:480,w:340,h:25},{x:780,y:580,w:450,h:25},{x:180,y:180,w:25,h:420},{x:1150,y:80,w:25,h:380},{x:680,y:320,w:25,h:280}],
    // Карта 2 — MIRAGE MINI
    [{x:100,y:200,w:300,h:25},{x:900,y:150,w:450,h:25},{x:200,y:550,w:500,h:25},{x:1050,y:480,w:350,h:25},{x:250,y:100,w:25,h:380},{x:1200,y:250,w:25,h:400}]
];

function createMap() {
    walls = mapLayouts[currentMap];
}

function spawnEnemy(side) {
    const sideNum = Math.random() * 4 | 0;
    let ex = WORLD_W / 2, ey = WORLD_H / 2;
    if (sideNum === 0) { ex = Math.random() * WORLD_W; ey = -40; }
    else if (sideNum === 1) { ex = WORLD_W + 40; ey = Math.random() * WORLD_H; }
    else if (sideNum === 2) { ex = Math.random() * WORLD_W; ey = WORLD_H + 40; }
    else { ex = -40; ey = Math.random() * WORLD_H; }

    const isT = side === 'T';
    (isT ? enemies : allies).push({
        x: ex, y: ey, size: 18, speed: 2.8 + Math.random() * 1.2,
        hp: 45, color: isT ? '#cc2222' : '#0066cc',
        lastShot: 0, angle: 0, isT: isT
    });
}

function startRoundTimer() {
    roundTime = 115;
    clearInterval(timerInterval);
    timerInterval = setInterval(() => {
        if (gameState !== 'playing') return;
        roundTime--;
        const min = Math.floor(roundTime / 60);
        const sec = roundTime % 60;
        const timerEl = document.getElementById('timer-text');
        if (timerEl) timerEl.textContent = `\( {min}: \){sec < 10 ? '0' : ''}${sec}`;
        if (roundTime <= 0) endRound("TERRORISTS WIN");
    }, 1000);
}

function endRound(text) {
    clearInterval(timerInterval);
    alert(text);
}

function update() {
    if (gameState !== 'playing') return;
    player.x = Math.max(40, Math.min(WORLD_W - 40, player.x));
    player.y = Math.max(40, Math.min(WORLD_H - 40, player.y));
}

function draw() {
    const ctx = document.getElementById('c').getContext('2d');
    ctx.fillStyle = '#0a1a0a';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.save();
    ctx.translate(-camera.x, -camera.y);

    ctx.fillStyle = currentMap === 0 ? '#223311' : '#ddcc88';
    ctx.fillRect(0, 0, WORLD_W, WORLD_H);

    ctx.fillStyle = '#555';
    for (let w of walls) ctx.fillRect(w.x, w.y, w.w, w.h);

    // Игрок (простой синий квадратик)
    ctx.save();
    ctx.translate(player.x, player.y);
    ctx.rotate(player.angle || 0);
    ctx.fillStyle = '#0066cc';
    ctx.fillRect(-14, -14, 28, 28);
    ctx.fillStyle = '#88aaff';
    ctx.beginPath();
    ctx.arc(0, -18, 9, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();

    // Боты T (красные квадратики)
    for (let e of enemies) {
        ctx.save();
        ctx.translate(e.x, e.y);
        ctx.rotate(e.angle || 0);
        ctx.fillStyle = '#cc2222';
        ctx.fillRect(-14, -14, 28, 28);
        ctx.fillStyle = '#ff8888';
        ctx.beginPath();
        ctx.arc(0, -18, 9, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();

        ctx.fillStyle = '#fff';
        ctx.font = 'bold 16px Arial';
        ctx.textAlign = 'center';
        ctx.fillText('T', e.x, e.y + 6);
    }

    ctx.restore();
}

function loop() {
    update();
    draw();
    requestAnimationFrame(loop);
}

function launchGame() {
    if (selectedMap === -1) return;

    showLoading(() => {
        currentMap = selectedMap;

        document.getElementById('mapSelect').style.display = 'none';
        document.getElementById('c').style.display = 'block';
        document.getElementById('gameHUD').style.display = 'block';

        player.x = WORLD_W * 0.3;
        player.y = WORLD_H * 0.7;
        player.hp = 100;
        player.armor = 100;

        enemies = [];
        allies = [];
        camera.x = 0;
        camera.y = 0;

        gameState = 'playing';
        createMap();

        for (let i = 0; i < 5; i++) spawnEnemy('T');
        for (let i = 0; i < 4; i++) spawnEnemy('CT');

        startRoundTimer();
        loop();
    });
}

window.launchGame = launchGame;
window.spawnEnemy = spawnEnemy;
window.createMap = createMap;