// lobby.js — ПРОСТОЕ ЛОББИ ТОЧНО КАК НА ТВОЁМ СКРИНЕ 11.1
window.lobbySystem = {
  init() {
    // большая кнопка
    const playBtn = document.getElementById('play-button');
    if (playBtn) playBtn.addEventListener('click', () => this.startGame());

    // мелкие кнопки (работают с твоим switchTab если есть)
    const howBtn = document.getElementById('how-play-btn');
    if (howBtn) howBtn.addEventListener('click', () => alert('WASD — бегай, мышь — стреляй. Убей всех, брат! 🔥'));

    const caseBtn = document.getElementById('open-case-btn');
    if (caseBtn) caseBtn.addEventListener('click', () => { window.switchTab ? window.switchTab('cases') : alert('Кейсы открыты'); });

    const invBtn = document.getElementById('inventory-btn');
    if (invBtn) invBtn.addEventListener('click', () => { window.switchTab ? window.switchTab('inventory') : alert('Инвентарь'); });

    const shopBtn = document.getElementById('shop-btn');
    if (shopBtn) shopBtn.addEventListener('click', () => { window.switchTab ? window.switchTab('shop') : alert('Магазин'); });

    console.log('%c✅ Простое лобби 11.1 готово — точно как на скрине', 'color:#00ffcc; font-size:18px');
  },

  showLobby() {
    const lobby = document.getElementById('lobby-screen');
    if (lobby) lobby.style.display = 'flex';
  },

  startGame() {
    const lobby = document.getElementById('lobby-screen');
    if (lobby) lobby.style.display = 'none';

    if (window.game && typeof window.game.start === 'function') {
      window.game.start('classic');
      console.log('🎮 Игра запущена — 15 ботов, классика!');
    } else {
      console.error('❌ game.js не видит start() — кинь мне код game.js, перелопачу');
    }
  }
};

// Автозапуск
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => window.lobbySystem.init());
} else {
  window.lobbySystem.init();
}