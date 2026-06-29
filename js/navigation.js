// js/navigation.js

// 1. Barcha sahifa mantiqlarini (logikalarini) chaqirib olamiz
import { initHomeLogic } from './app.js'; 
import { loadAnimeCatalog } from './anime.js';
import { initProfileLogic } from './profile.js';
import { initQuizLogic } from './quiz.js';
import { initLeaderboardLogic } from './leaderboard.js';
import { initAdminLogic } from './admin.js';
import { initChatLogic } from './chat.js';

const appContainer = document.getElementById('app');

// 2. Sahifani HTML'dan yuklab, ekranga chiqarish funksiyasi
export const navigateToPage = async (pageName) => {
    try {
        const response = await fetch(`pages/${pageName}.html`);
        if (!response.ok) throw new Error(`${pageName}.html topilmadi`);
        
        const html = await response.text();
        appContainer.innerHTML = html; // Ekranga chizish

        // 3. Qaysi sahifa ochilganiga qarab uning JS funksiyasini ishga tushiramiz
        switch (pageName) {
            case 'home': initHomeLogic(); break;
            case 'anime': loadAnimeCatalog(); break;
            case 'profile': initProfileLogic(); break;
            case 'quiz': initQuizLogic(); break;
            case 'leaderboard': initLeaderboardLogic(); break;
            case 'add': initAdminLogic(); break;
            case 'chat': initChatLogic(); break;
        }
        
        // 4. Telegram orqaga qaytish (Back Button) mantiqini sozlash
        if (pageName !== 'home') {
            window.Telegram.WebApp.BackButton.show();
            window.Telegram.WebApp.BackButton.onClick(() => {
                navigateToPage('home');
                // Menyudagi 'home' tugmasini yana aktiv qilish
                document.querySelectorAll('.nav-item').forEach(i => i.classList.remove('active'));
                document.querySelector('.nav-item').classList.add('active');
            });
        } else {
            window.Telegram.WebApp.BackButton.hide();
        }

    } catch (error) {
        console.error("Navigatsiya xatosi:", error);
        appContainer.innerHTML = `<div style="color:red; text-align:center; padding: 20px;">Sahifa yuklanishida xatolik yuz berdi.</div>`;
    }
};

// HTML onclick lari ishlashi uchun global o'zgaruvchiga tenglaymiz
window.navigateToPage = navigateToPage;
