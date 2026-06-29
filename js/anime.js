// js/anime.js
const ANIME_DB_URL = "https://nexaanimebot-default-rtdb.firebaseio.com/anime_data.json";

// Animelarni bazadan olish
export const fetchAnimes = async () => {
    try {
        const response = await fetch(ANIME_DB_URL);
        const data = await response.json();
        // Firebase dan kelgan objectni array'ga o'tkazish
        return data ? Object.values(data) : [];
    } catch (error) {
        console.error("Animelarni yuklashda xatolik:", error);
        return [];
    }
};

// Anime sahifasi ochilganda katalogga chizish
export const loadAnimeCatalog = async () => {
    const grid = document.getElementById('anime-catalog-grid');
    if (!grid) return;
    
    grid.innerHTML = '<p style="color: white; text-align: center;">Katalog yuklanmoqda...</p>';
    
    const animes = await fetchAnimes();
    grid.innerHTML = ''; // Loadingni tozalash

    if (animes.length === 0) {
        grid.innerHTML = '<p>Hozircha animelar yo\'q.</p>';
        return;
    }

    animes.forEach(anime => {
        const card = document.createElement('div');
        card.className = 'anime-card-glass';
        // HTML tuzilmasi
        card.innerHTML = `
            <div class="anime-card-img">
                ${anime.premium ? '<span class="premium-badge"><i class="fas fa-crown"></i></span>' : ''}
                <img src="${anime.image || 'assets/default-anime.jpg'}" alt="${anime.title}">
            </div>
            <div class="anime-card-info">
                <h4>${anime.title}</h4>
                <p><i class="fas fa-star text-warning"></i> ${anime.rating || 'N/A'}</p>
            </div>
        `;
        // Modalni ochish funksiyasi
        card.onclick = () => openAnimeModal(anime);
        grid.appendChild(card);
    });
};

// HTML da onclick="closeAnimeModal()" ishlatilgan
window.closeAnimeModal = () => {
    document.getElementById('anime-details-modal').classList.add('hidden');
};

const openAnimeModal = (anime) => {
    document.getElementById('modal-anime-title').innerText = anime.title;
    document.getElementById('modal-anime-rating').innerHTML = `<i class="fas fa-star text-warning"></i> ${anime.rating || 'N/A'}`;
    document.getElementById('modal-anime-genre').innerHTML = `<i class="fas fa-tags"></i> ${anime.genre || 'Janr kiritilmagan'}`;
    document.getElementById('modal-anime-description').innerText = anime.description || 'Tavsif mavjud emas.';
    
    if (anime.premium) {
        document.getElementById('modal-premium-tag').classList.remove('hidden');
        document.getElementById('premium-lock-container').classList.remove('hidden');
        document.getElementById('episodes-wrapper').classList.add('hidden');
    } else {
        document.getElementById('modal-premium-tag').classList.add('hidden');
        document.getElementById('premium-lock-container').classList.add('hidden');
        document.getElementById('episodes-wrapper').classList.remove('hidden');
    }

    document.getElementById('anime-details-modal').classList.remove('hidden');
};
