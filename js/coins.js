// js/coins.js
import { showNexaNotification } from './notification.js';

export const updateCoinBalance = (amount, reason) => {
    // Aslida bu ma'lumot Firebase'dan keladi, hozircha LocalStorage ishlatamiz
    let currentBalance = parseInt(localStorage.getItem('nexa_coins')) || 0;
    
    currentBalance += amount;
    if (currentBalance < 0) currentBalance = 0; // Balans minusga kirmasligi kerak
    
    localStorage.setItem('nexa_coins', currentBalance);

    // HTML dagi barcha coin ko'rsatkichlarini yangilash
    document.querySelectorAll('.user-coin-display').forEach(el => {
        el.innerText = currentBalance;
    });

    // Foydalanuvchiga xabar berish
    if (amount > 0) {
        showNexaNotification("Daromad!", `+${amount} Coin. (${reason})`, "success");
    } else if (amount < 0) {
        showNexaNotification("Xarajat", `${amount} Coin sarflandi.`, "warning");
    }
};

window.updateCoinBalance = updateCoinBalance;
