// js/notification.js

export const showNexaNotification = (title, message, type = 'info') => {
    // Xabarnoma uchun yangi element yaratish
    const toast = document.createElement('div');
    toast.className = `nexa-toast toast-${type} animate-fade-in`;
    
    // Turiga qarab ikonka tanlash
    let icon = "fa-info-circle";
    if (type === 'success') icon = "fa-check-circle";
    if (type === 'premium') icon = "fa-crown";
    if (type === 'warning') icon = "fa-exclamation-triangle";

    toast.innerHTML = `
        <div class="toast-content" style="display: flex; align-items: center; gap: 10px; background: rgba(30, 30, 40, 0.9); padding: 15px; border-radius: 10px; border-left: 4px solid #00ff88; margin-bottom: 10px;">
            <i class="fas ${icon} toast-icon" style="font-size: 20px; color: #00ff88;"></i>
            <div>
                <strong style="display: block; font-size: 14px; color: white;">${title}</strong>
                <span style="font-size: 12px; color: #aaa;">${message}</span>
            </div>
        </div>
    `;

    // Ekranga qoshish
    let container = document.getElementById('toast-container');
    if (!container) {
        container = document.createElement('div');
        container.id = 'toast-container';
        container.style.cssText = 'position: fixed; top: 20px; right: 20px; z-index: 9999;';
        document.body.appendChild(container);
    }
    
    container.appendChild(toast);

    // 4 soniyadan so'ng o'chirish
    setTimeout(() => {
        toast.style.opacity = '0';
        setTimeout(() => toast.remove(), 500);
    }, 4000);
};

// HTML elementlaridan chaqirish uchun window ga ulaymiz
window.showNexaNotification = showNexaNotification;
