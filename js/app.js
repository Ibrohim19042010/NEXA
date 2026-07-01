
// js/app.js

// Navigatsiya funksiyasini chaqirib olamiz
import { initNavigation } from './navigation.js';

document.addEventListener('DOMContentLoaded', () => {
    // Agar dastur Telegram ichida ochilsa, ekranni to'liq egallashini ta'minlaymiz
    if (window.Telegram && window.Telegram.WebApp) {
        const tg = window.Telegram.WebApp;
        tg.expand(); 
    }

    const preloader = document.getElementById('preloader');
    const appContainer = document.getElementById('app-container');

    // Sun'iy yuklanish jarayoni (baza ulanmaguncha 1.5 soniya kutib ochadi)
    setTimeout(() => {
        // 1. Preloaderni yashirish
        if (preloader) {
            preloader.style.display = 'none';
        }
        
        // 2. Asosiy ilovani ekranga chiqarish
        if (appContainer) {
            appContainer.style.display = 'block';
        }

        // 3. Pastki menyudagi tugmalar ishlashini ta'minlash
        initNavigation();
        
    }, 1500); // 1500 millisoniya (1.5 soniya)
});
