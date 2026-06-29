// js/chat.js

export const initChatLogic = () => {
    // Sahifa yuklanganda Global chatni ochamiz
    switchChatTab('global');
};

window.switchChatTab = (type) => {
    const globalBtn = document.getElementById('tab-global-chat');
    const privateBtn = document.getElementById('tab-private-chat');
    
    if (type === 'global') {
        globalBtn.classList.add('active');
        privateBtn.classList.remove('active');
        document.getElementById('chat-messages-container').innerHTML = '<p class="chat-empty-state">Global xabarlar...</p>';
    } else {
        privateBtn.classList.add('active');
        globalBtn.classList.remove('active');
        document.getElementById('chat-messages-container').innerHTML = '<p class="chat-empty-state">Private xabarlar...</p>';
    }
};

window.sendChatMessage = () => {
    const input = document.getElementById('chat-message-input');
    const message = input.value.trim();
    
    if (!message) return;

    // Chat bazasiga yozish logikasi (Firestore yoki RTDB)
    console.log("Yangi xabar yuborildi:", message);
    
    // Yuborgach tozalash
    input.value = '';
};
