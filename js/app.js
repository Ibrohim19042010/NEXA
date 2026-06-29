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
