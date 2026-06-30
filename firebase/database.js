// firebase/database.js
import { FIREBASE_DB_URL } from './config.js';

// Animelarni bazadan yuklab olish funksiyasi
export const fetchAnimeData = async () => {
    try {
        // Siz bergan anime_data.json havolasiga so'rov yuboramiz
        const response = await fetch(`${FIREBASE_DB_URL}/anime_data.json`);
        
        if (!response.ok) {
            throw new Error(`Xatolik yuz berdi: ${response.status}`);
        }
        
        const data = await response.json();
        console.log("Bazadan kelgan animelar:", data);
        return data;
    } catch (error) {
        console.error("Firebase'dan ma'lumot olishda xatolik:", error);
        return null;
    }
};

// Foydalanuvchi ma'lumotlarini bazaga saqlash funksiyasi (ixtiyoriy)
export const saveUserData = async (userId, userData) => {
    try {
        const response = await fetch(`${FIREBASE_DB_URL}/users/${userId}.json`, {
            method: 'PUT', // PUT usuli eski ma'lumotni yangilaydi
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userData)
        });
        return await response.json();
    } catch (error) {
        console.error("Foydalanuvchini saqlashda xatolik:", error);
    }
};
