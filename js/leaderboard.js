// js/leaderboard.js
import { formatNumber } from './utils.js';
import { getRankByXP } from './rank.js';

export const initLeaderboardLogic = async () => {
    // Faraziy ma'lumotlar bazasi kelishi (Buni fetch bilan Firestore dan olasiz)
    const mockUsers = [
        { name: "Sung Jin-Woo", xp: 600000, avatar: "assets/user1.jpg" },
        { name: "Cha Hae-In", xp: 120000, avatar: "assets/user2.jpg" },
        { name: "Choi Jong-In", xp: 85000, avatar: "assets/user3.jpg" },
        { name: "Baek Yoonho", xp: 65000, avatar: "assets/user4.jpg" },
        { name: "Thomas Andre", xp: 450000, avatar: "assets/user5.jpg" }
    ];

    // XP bo'yicha kattadan kichikka qarab saralash
    mockUsers.sort((a, b) => b.xp - a.xp);

    // Top 3 ni shohsupaga (Podium) o'tkazish
    if (mockUsers[0]) setPodiumUser(1, mockUsers[0]);
    if (mockUsers[1]) setPodiumUser(2, mockUsers[1]);
    if (mockUsers[2]) setPodiumUser(3, mockUsers[2]);

    // Qolgan foydalanuvchilarni (4-o'rindan boshlab) ro'yxatga chizish
    const container = document.getElementById('leaderboard-rows-container');
    if(!container) return;
    
    container.innerHTML = '';
    mockUsers.slice(3, 100).forEach((user, index) => {
        const userRank = getRankByXP(user.xp);
        container.innerHTML += `
            <div class="leaderboard-row">
                <span class="rank-pos">${index + 4}</span>
                <span class="user-name">${user.name}</span>
                <span class="user-xp" style="color: ${userRank.color}">${userRank.name} (${formatNumber(user.xp)} XP)</span>
            </div>
        `;
    });
};

const setPodiumUser = (place, user) => {
    document.getElementById(`user-top${place}-name`).innerText = user.name;
    document.getElementById(`user-top${place}-xp`).innerText = `${formatNumber(user.xp)} XP`;
    // document.getElementById(`user-top${place}-avatar`).src = user.avatar;
};
