// js/admin.js
import { tg } from './utils.js';

export const initAdminLogic = () => {
    // Admin logikasi ishga tushganda faqat kerakli tablarni aktiv qilish
    switchAdminTab('anime');
};

window.switchAdminTab = (tabName) => {
    // Barcha tab contentlarni yashirish
    document.querySelectorAll('.admin-tab-panel').forEach(el => el.classList.add('hidden'));
    document.querySelectorAll('.admin-tab-btn').forEach(el => el.classList.remove('active'));
    
    // Tanlanganini ochish
    document.getElementById(`admin-tab-content-${tabName}`).classList.remove('hidden');
    // Tugmani aktiv qilish bo'yicha logikani qo'shish mumkin
};

window.handleAnimeSubmit = (e) => {
    e.preventDefault(); // Sahifa yangilanishini to'xtatish
    
    const title = document.getElementById('adm-anime-title').value;
    const isPremium = document.getElementById('adm-anime-premium').checked;

    // Bu yerda Firebase Realtime Database'ga fetch POST yuborasiz
    console.log("Anime qo'shildi:", title, "Premium:", isPremium);
    tg.showAlert(`${title} muvaffaqiyatli bazaga qo'shildi!`);
    
    e.target.reset(); // Formani tozalash
};
