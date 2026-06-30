// js/assistant.js

export const initAssistantLogic = () => {
    console.log("NEXA Assistant ishga tushdi.");
};

window.sendToAssistant = () => {
    const inputEl = document.getElementById('assistant-input');
    const chatBox = document.getElementById('assistant-chat-box');
    
    const message = inputEl.value.trim();
    if (!message) return;

    // Foydalanuvchi xabarini chizish
    chatBox.innerHTML += `
        <div class="msg user-msg" style="text-align: right; margin-bottom: 10px;">
            <span style="background: #007bff; padding: 8px 12px; border-radius: 12px 12px 0 12px; display: inline-block;">${message}</span>
        </div>
    `;
    inputEl.value = '';

    // Botning javobini simulyatsiya qilish (Loading holati)
    setTimeout(() => {
        chatBox.innerHTML += `
            <div class="msg bot-msg" style="text-align: left; margin-bottom: 10px;">
                <span style="background: #333; padding: 8px 12px; border-radius: 12px 12px 12px 0; display: inline-block;">
                    <i class="fas fa-robot text-primary"></i> Salom! Men NEXA Assistant'man. Savolingiz yuzasidan tez orada admin javob beradi.
                </span>
            </div>
        `;
        // Chatni eng pastiga skroll qilish
        chatBox.scrollTop = chatBox.scrollHeight;
    }, 1000);
};
