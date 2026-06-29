// js/rank.js

const ranks = [
    { id: 1, name: "E", minXP: 0, color: "#a5a5a5", badge: "e-badge" },
    { id: 2, name: "D", minXP: 500, color: "#8b5a2b", badge: "d-badge" },
    { id: 3, name: "C", minXP: 2000, color: "#4682b4", badge: "c-badge" },
    { id: 4, name: "B", minXP: 5000, color: "#cd7f32", badge: "b-badge" },
    { id: 5, name: "A", minXP: 10000, color: "#c0c0c0", badge: "a-badge" },
    { id: 6, name: "S", minXP: 25000, color: "#ffd700", badge: "s-badge" },
    { id: 7, name: "SS", minXP: 50000, color: "#ff4500", badge: "ss-badge" },
    { id: 8, name: "National Hunter", minXP: 100000, color: "#8a2be2", badge: "national-badge" },
    { id: 9, name: "Shadow Monarch", minXP: 500000, color: "#000000", badge: "shadow-badge" }
];

// XP ga qarab Rankni topish
export const getRankByXP = (xp) => {
    // Arrayni teskari qilib (eng katta XP dan boshlab) qidiramiz
    return ranks.slice().reverse().find(rank => xp >= rank.minXP) || ranks[0];
};

// Progress bar uchun foizni hisoblash (Keyingi rankgacha qancha qoldi)
export const calculateRankProgress = (currentXP) => {
    const currentRank = getRankByXP(currentXP);
    const nextRank = ranks.find(r => r.id === currentRank.id + 1);

    if (!nextRank) return 100; // Shadow Monarch bo'lsa (Maksimum)

    const xpNeeded = nextRank.minXP - currentRank.minXP;
    const xpGained = currentXP - currentRank.minXP;
    return (xpGained / xpNeeded) * 100;
};
