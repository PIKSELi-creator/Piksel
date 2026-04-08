<script>
// animation.js — КРУТАЯ АНИМАЦИЯ КЕЙСОВ + ИНВЕНТАРЬ + FPS-КАРТА
const canvas = document.getElementById('c');
const ctx = canvas.getContext('2d');

let currentAnimation = null;

// === ОТКРЫТИЕ КЕЙСА ===
function openCase(caseType = 'dragon') {
  document.getElementById('casesScreen').style.display = 'none';
  document.getElementById('caseOpening').style.display = 'block';
  canvas.style.display = 'block';
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  let angle = 0;
  let scale = 1;
  let items = [
    { name: 'AWP | Dragon Lore Mini', rarity: 'legendary', color: '#ff00aa' },
    { name: 'AK-47 | Fire Serpent', rarity: 'epic', color: '#ff8800' },
    { name: 'M4A1-S | Hot Rod', rarity: 'rare', color: '#00ff88' }
  ];
  let currentItem = 0;
  let speed = 8;

  currentAnimation = setInterval(() => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Фон с бликами
    ctx.fillStyle = 'rgba(10,10,30,0.95)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.shadowBlur = 80;
    ctx.shadowColor = '#00ffff';
    
    // Кейс вращается
    ctx.save();
    ctx.translate(canvas.width/2, canvas.height/2);
    ctx.rotate(angle * Math.PI / 180);
    ctx.scale(scale, scale);
    
    // Кейс-бокс
    ctx.fillStyle = '#111133';
    ctx.fillRect(-150, -100, 300, 200);
    ctx.strokeStyle = '#00ffff';
    ctx.lineWidth = 20;
    ctx.strokeRect(-150, -100, 300, 200);
    
    // Надпись
    ctx.fillStyle = '#ffff00';
    ctx.font = 'bold 42px Courier New';
    ctx.textAlign = 'center';
    ctx.fillText('🔥 ' + caseType.toUpperCase() + ' 🔥', 0, 20);
    ctx.restore();
    
    angle += speed;
    scale = 1 + Math.sin(angle/10) * 0.1;
    speed *= 0.985; // замедление как в CS2
    
    // Выпадает предмет
    if (speed < 0.8 && currentItem < items.length) {
      ctx.shadowBlur = 120;
      ctx.shadowColor = items[currentItem].color;
      ctx.fillStyle = items[currentItem].color;
      ctx.font = 'bold 48px Courier New';
      ctx.fillText('🎉 ' + items[currentItem].name, canvas.width/2, canvas.height * 0.7);
      
      // Конфетти
      for (let i = 0; i < 30; i++) {
        ctx.fillStyle = ['#ff00ff','#00ffff','#ffff00'][Math.floor(Math.random()*3)];
        ctx.fillRect(Math.random()*canvas.width, Math.random()*canvas.height, 12, 12);
      }
      
      if (Math.random() > 0.7) currentItem++;
    }
    
    if (speed < 0.2) {
      clearInterval(currentAnimation);
      setTimeout(() => {
        // Добавляем в инвентарь
        addToInventory(items[items.length-1]);
        document.getElementById('caseOpening').style.display = 'none';
        document.getElementById('inventoryScreen').style.display = 'block';
        canvas.style.display = 'none';
      }, 1200);
    }
  }, 16);
}

// === ИНВЕНТАРЬ ===
let inventory = [];

function addToInventory(item) {
  inventory.push(item);
  renderInventory();
}

function renderInventory() {
  const container = document.getElementById('inventoryScreen');
  container.innerHTML = `<h2 style="color:#00ff88;text-align:center;margin:20px">🎒 ИНВЕНТАРЬ (${inventory.length}/50)</h2>`;
  inventory.forEach((item, i) => {
    const div = document.createElement('div');
    div.className = 'inventory-slot';
    div.style.cssText = `margin:10px;padding:15px;background:#111;border:3px solid ${item.color};color:white;display:inline-block;width:45%`;
    div.innerHTML = `<b>\( {item.name}</b><br><small> \){item.rarity}</small>`;
    div.draggable = true;
    div.ondragstart = (e) => e.dataTransfer.setData('text', i);
    container.appendChild(div);
  });
}

// === КАРТА + ИГРОК ОТ ПЕРВОГО ЛИЦА (FPS) ===
let player = { x: 400, y: 300, angle: 0, speed: 5 };
let keys = {};

function startFirstPersonGame() {
  document.getElementById('mapSelect').style.display = 'none';
  document.getElementById('gameHUD').style.display = 'block';
  canvas.style.display = 'block';
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  // Мини-карта Dust 2 в первом лице
  function drawFPS() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Пол + стены (простой raycast-стиль)
    ctx.fillStyle = '#222211';
    ctx.fillRect(0, canvas.height/2, canvas.width, canvas.height/2); // пол
    
    ctx.fillStyle = '#113311';
    ctx.fillRect(0, 0, canvas.width, canvas.height/2); // потолок
    
    // Стены
    for (let i = 0; i < 12; i++) {
      const dist = 300 + Math.sin(player.angle + i) * 100;
      const height = canvas.height / (dist / 200);
      ctx.fillStyle = i % 3 === 0 ? '#00ff88' : '#334433';
      ctx.fillRect(i * (canvas.width/12), (canvas.height - height)/2, canvas.width/12, height);
    }
    
    // Прицел
    ctx.strokeStyle = '#00ffff';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(canvas.width/2 - 30, canvas.height/2);
    ctx.lineTo(canvas.width/2 + 30, canvas.height/2);
    ctx.moveTo(canvas.width/2, canvas.height/2 - 30);
    ctx.lineTo(canvas.width/2, canvas.height/2 + 30);
    ctx.stroke();
    
    // HUD
    ctx.fillStyle = '#ff0000';
    ctx.font = 'bold 28px Courier New';
    ctx.fillText('HP 100  AMMO 30/120', 30, canvas.height - 30);
    
    // Движение
    if (keys['w']) { player.x += Math.cos(player.angle) * player.speed; player.y += Math.sin(player.angle) * player.speed; }
    if (keys['s']) { player.x -= Math.cos(player.angle) * player.speed; player.y -= Math.sin(player.angle) * player.speed; }
    if (keys['a']) player.angle -= 0.08;
    if (keys['d']) player.angle += 0.08;
  }
  
  setInterval(drawFPS, 16);
  
  // Тач + клавиши
  window.addEventListener('keydown', e => keys[e.key] = true);
  window.addEventListener('keyup', e => keys[e.key] = false);
  
  // Стрельба по тапу
  canvas.addEventListener('touchstart', () => {
    ctx.fillStyle = '#ffff00';
    ctx.font = 'bold 60px Courier New';
    ctx.fillText('💥 БАХ!', canvas.width/2 - 100, canvas.height/2);
    setTimeout(() => drawFPS(), 80);
  });
}

// Экспорт для остальных файлов
window.openCase = openCase;
window.startFirstPersonGame = startFirstPersonGame;
window.renderInventory = renderInventory;
</script>