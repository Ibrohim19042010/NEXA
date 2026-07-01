// js/app.js
import { tg, getUserData } from './utils.js';
import { navigateToPage } from './navigation.js';
import { fetchAnimes } from './anime.js';

// Dastur birinchi marta ochilganda ishlaydigan kod
document.addEventListener('DOMContentLoaded', () => {
    
    // Telegram Web App orqali ilovani to'liq ekranga ochish
    tg.expand();

    // Dastlabki sahifani yuklash (Home)
    navigateToPage('home');
});

// Asosiy (Home) sahifasi yuklanganda bajariladigan ishlar
export const initHomeLogic = async () => {
    const user = getUserData();
    
    // 1. Foydalanuvchi ismini chiqarish
    const nameEl = document.getElementById('user-display-name');
    if (nameEl) nameEl.innerText = user.first_name || user.username || "Hunter";
    
    // 2. Trenddagi Animelarni Firebase'dan olib ekranga chizish
    const trendingContainer = document.getElementById('trending-anime-container');
    if(trendingContainer) {
        const animes = await fetchAnimes();
        trendingContainer.innerHTML = ''; // Loadingni tozalash
        
        // Faqat eng dastlabki 5 ta animeni trendga chiqaramiz
        animes.slice(0, 5).forEach(anime => {
            trendingContainer.innerHTML += `
                <div class="trending-card" onclick="openAnimeModal(${JSON.stringify(anime).replace(/"/g, '&quot;')})">
                    <img src="${anime.image || 'assets/default.jpg'}" alt="${anime.title}" style="width:100px; height:150px; border-radius:10px;">
                    <h5 style="margin-top:5px; font-size:12px;">${anime.title}</h5>
                </div>
            `;
        });
    }
};
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
