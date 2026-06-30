// js/achievement.js

const userAchievements = [
    { id: "first_blood", title: "Birinchi Qadam", desc: "NEXA ga birinchi marta kirdingiz", isUnlocked: true, xp: 50 },
    { id: "otaku_10", title: "Otaku", desc: "10 ta epizod tomosha qildingiz", isUnlocked: false, xp: 300 },
    { id: "rich_boy", title: "Boyvachcha", desc: "Hisobingizda 1000+ Coin yig'ildi", isUnlocked: false, xp: 500 }
];

export const loadAchievementsGrid = () => {
    const container = document.getElementById('achievements-container');
    if (!container) return;

    container.innerHTML = '';
    userAchievements.forEach(ach => {
        const statusClass = ach.isUnlocked ? 'unlocked' : 'locked';
        const iconColor = ach.isUnlocked ? '#ffd700' : '#555';
        
        container.innerHTML += `
            <div class="achievement-card ${statusClass}" style="display: flex; align-items: center; gap: 15px; padding: 10px; background: rgba(255,255,255,0.05); border-radius: 8px; margin-bottom: 10px;">
                <i class="fas ${ach.isUnlocked ? 'fa-trophy' : 'fa-lock'}" style="color: ${iconColor}; font-size: 24px;"></i>
                <div>
                    <h4 style="margin: 0; font-size: 14px;">${ach.title}</h4>
                    <p style="margin: 0; font-size: 11px; color: #aaa;">${ach.desc}</p>
                </div>
                <span style="margin-left: auto; font-size: 12px; color: #00ff88;">+${ach.xp} XP</span>
            </div>
        `;
    });
};
