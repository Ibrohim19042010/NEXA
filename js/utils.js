// js/utils.js

// Telegram Web App obyekti
export const tg = window.Telegram.WebApp;

// Oynani to'liq ekranga ochish
tg.expand();

// Foydalanuvchi ma'lumotlarini olish
export const getUserData = () => {
    if (tg.initDataUnsafe && tg.initDataUnsafe.user) {
        return tg.initDataUnsafe.user;
    }
    // Agar kompyuterda (brauzerda) test qilinayotgan bo'lsa, fake ma'lumot beramiz
    return {
        id: 123456789,
        first_name: "Hunter",
        username: "solo_player"
    };
};

// Sonlarni chiroyli formatlash (masalan: 10000 -> 10 000)
export const formatNumber = (num) => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
};

// Elementni yashirish / ko'rsatish
export const toggleVisibility = (elementId, show) => {
    const el = document.getElementById(elementId);
    if (el) {
        show ? el.classList.remove('hidden') : el.classList.add('hidden');
    }
};
