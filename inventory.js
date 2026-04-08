window.showInventory = function() {
    hideAll();
    const screen = document.getElementById('inventoryScreen');
    screen.style.display = 'flex';
    let html = `<h1 style="margin:30px;color:#00ffff;">🎒 ИНВЕНТАРЬ</h1><div class="inventory-grid">`;
    
    if (window.inventory && window.inventory.length > 0) {
        window.inventory.forEach(item => {
            html += `
            <div class="inv-item" style="border-color:${item.color};">
                <div style="font-size:42px;">${item.emoji}</div>
                <div style="font-size:13px;margin-top:8px;">${item.name}</div>
                <small>${item.rarity}</small>
            </div>`;
        });
    } else {
        html += `<p style="padding:60px 20px; color:#666; text-align:center;">Инвентарь пуст.<br>Открывай кейсы!</p>`;
    }
    html += `</div><div class="btn" onclick="backToLobby()">НАЗАД В ЛОББИ</div>`;
    screen.innerHTML = html;
};