// js/navigation.js
import { initHomeLogic } from './app.js'; // Home yuklanganda ishlaydigan funksiya
import { loadAnimeCatalog } from './anime.js';

const appContainer = document.getElementById('app'); // index.html dagi asosiy div

export const navigateToPage = async (pageName) => {
    try {
        // HTML shablonni fetch orqali yuklab olish
        const response = await fetch(`pages/${pageName}.html`);
        if (!response.ok) throw new Error(`${pageName} sahifasi topilmadi`);
        
        const html = await response.text();
        appContainer.innerHTML = html;

        // Sahifaga qarab JS logikalarni ishga tushirish
        initPageLogic(pageName);
        
        // Telegram Back Button (orqaga qaytish tugmasi)
        if (pageName !== 'home') {
            window.Telegram.WebApp.BackButton.show();
            window.Telegram.WebApp.BackButton.onClick(() => navigateToPage('home'));
        } else {
            window.Telegram.WebApp.BackButton.hide();
        }

    } catch (error) {
        console.error("Navigatsiya xatosi:", error);
        appContainer.innerHTML = `<div class="error-msg">Xatolik yuz berdi. Sahifa yuklanmadi.</div>`;
    }
};

const initPageLogic = (pageName) => {
    switch (pageName) {
        case 'home':
            initHomeLogic();
            break;
        case 'anime':
            loadAnimeCatalog();
            break;
        case 'profile':
            // initProfileLogic(); // profile.js dan chaqiriladi
            break;
        // Boshqa sahifalar logikalari shu yerga qo'shiladi
    }
};

// Global doirada chaqirish uchun window ga biriktiramiz (HTML dagi onclick="" lar ishlashi uchun)
window.navigateToPage = navigateToPage;
