// firebase/auth.js

export const getUserData = () => {
    // Telegram Web App obyekti borligini tekshiramiz
    const tg = window.Telegram?.WebApp;
    
    if (tg && tg.initDataUnsafe && tg.initDataUnsafe.user) {
        const user = tg.initDataUnsafe.user;
        return {
            id: user.id,
            first_name: user.first_name,
            last_name: user.last_name || "",
            username: user.username || "Mavjud emas",
            isPremium: user.is_premium || false
        };
    }
    
    // Agar dastur brauzerda test qilinayotgan bo'lsa (Telegramdan tashqarida)
    return {
        id: 123456789,
        first_name: "Test",
        last_name: "Foydalanuvchi",
        username: "test_user",
        isPremium: false
    };
};
