// js/app.js
import { getUserData, formatNumber, tg } from './utils.js';
import { navigateToPage } from './navigation.js';
import { fetchAnimes } from './anime.js';

// Platforma yuklanganda
document.addEventListener('DOMContentLoaded', () => {
    // WebApp orqali ranglarni moslashtirish (Telegram temasi)
    document.documentElement.style.setProperty('--bg-color', tg.themeParams.bg_color || '#0d0d12');
    document.documentElement.style.setProperty('--text-color', tg.themeParams.text_color || '#ffffff');
    
    // Dastlabki sahifani yuklash
    navigateToPage('home');
});

// Home sahifasi logikasi
export const initHomeLogic = async () => {
    const user = getUserData();
    
    // Foydalanuvchi ma'lumotlarini HTML ga yozish
    const nameEl = document.getElementById('user-display-name');
    if (nameEl) nameEl.innerText = user.first_name || user.username;
    
    // Asosiy sahifaga trending animelarni chiqarish (namuna)
    const trendingContainer = document.getElementById('trending-anime-container');
    if(trendingContainer) {
        const animes = await fetchAnimes();
        trendingContainer.innerHTML = '';
        
        animes.slice(0, 5).forEach(anime => {
            trendingContainer.innerHTML += `
                <div class="trending-card" onclick="openAnimeModal(${JSON.stringify(anime).replace(/"/g, '&quot;')})">
                    <img src="${anime.image || 'assets/default.jpg'}" alt="${anime.title}">
                    <h5>${anime.title}</h5>
                </div>
            `;
        });
    }
};
