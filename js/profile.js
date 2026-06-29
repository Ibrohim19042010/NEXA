// js/profile.js
import { getUserData, formatNumber, tg } from './utils.js';
import { getRankByXP } from './rank.js';

export const initProfileLogic = async () => {
    const user = getUserData();
    
    // Foydalanuvchi ismini chiqarish
    const nameEl = document.getElementById('profile-username');
    if (nameEl) nameEl.innerText = `@${user.username || user.first_name}`;

    // Firebase'dan kelgan faraziy foydalanuvchi ma'lumoti (Buni keyin o'zgartirasiz)
    const userDataFromDB = { xp: 12500, coins: 450, is_admin: true }; 

    // Coin va XP ni formatlab yozish
    document.getElementById('profile-stat-coins').innerText = formatNumber(userDataFromDB.coins);
    document.getElementById('profile-stat-xp').innerText = formatNumber(userDataFromDB.xp);
    
    // Rankni hisoblash va yozish
    const userRank = getRankByXP(userDataFromDB.xp);
    const rankEl = document.getElementById('profile-rank-title');
    rankEl.innerText = `${userRank.name}-Rank`;
    rankEl.style.color = userRank.color;

    // Admin bo'lsa Admin Panel tugmasini ko'rsatish
    if (userDataFromDB.is_admin) {
        document.getElementById('admin-panel-quick-btn').classList.remove('hidden');
    }
};

// HTML-dagi onclick="copyReferralLink()" ishlashi uchun
window.copyReferralLink = () => {
    const refInput = document.getElementById('referral-link-field');
    refInput.select();
    document.execCommand('copy');
    
    // Telegram Web App alert
    tg.showAlert('Referral kodingiz nusxalandi! Do\'stlaringizga yuboring.');
};
