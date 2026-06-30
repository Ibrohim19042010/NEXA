// js/premium.js
import { showNexaNotification } from './notification.js';

export const initPremiumLogic = () => {
    console.log("Premium sahifasi yuklandi.");
};

window.buyPremiumSubscription = (months) => {
    const tg = window.Telegram.WebApp;
    let starsPrice = months === 1 ? 250 : 2000; 

    tg.showConfirm(`Siz ${months} oylik NEXA Premium statusini ${starsPrice} Telegram Stars evaziga xarid qilyapsiz. Davom etamizmi?`, (confirmed) => {
        if (confirmed) {
            // Bu yerda bot backendiga to'lov so'rovi yuboriladi
            showNexaNotification("So'rov yuborildi", "Telegram orqali to'lovni tasdiqlashingiz kutilmoqda...", "info");
            
            // To'lov o'tgandan keyingi simulyatsiya
            setTimeout(() => {
                showNexaNotification("Muvaffaqiyatli!", "Siz endi Premium foydalanuvchisiz! Barcha reklamalar o'chirildi va 4K sifat ochildi.", "premium");
                // Baza yangilash kodi shu yerda bo'ladi
            }, 3000);
        }
    });
};
