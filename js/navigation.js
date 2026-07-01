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
