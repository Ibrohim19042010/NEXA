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
// js/navigation.js

export function initNavigation() {
    const navItems = document.querySelectorAll('.nav-item');
    const pages = document.querySelectorAll('.page-view');

    navItems.forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault(); // Bosganda sahifa tepaga sakrab ketishini to'xtatadi

            // 1. Qaysi sahifaga o'tish kerakligini o'qib olamiz
            const targetPageId = item.getAttribute('data-target');

            // Agar data-target topilmasa, hech narsa qilmaymiz
            if (!targetPageId) return;

            // 2. Hamma tugmalardan "faol" (active) holatini olib tashlaymiz
            navItems.forEach(nav => nav.classList.remove('active'));
            // Bosilgan tugmaga "faol" holatini beramiz
            item.classList.add('active');

            // 3. Barcha sahifalarni yashiramiz
            pages.forEach(page => {
                page.style.display = 'none';
                page.classList.remove('active');
            });

            // 4. Bizga kerakli sahifani ekranga chiqaramiz
            const targetPage = document.getElementById(targetPageId);
            if (targetPage) {
                targetPage.style.display = 'block';
                // Kichik animatsiya berish uchun timeout ishlatamiz
                setTimeout(() => {
                    targetPage.classList.add('active');
                }, 50);
            }
        });
    });
}
