document.addEventListener('DOMContentLoaded', () => {
    
    // Telegram WebApp sozlamalari
    if (window.Telegram && window.Telegram.WebApp) {
        const tg = window.Telegram.WebApp;
        tg.expand(); 
    }

    const preloader = document.getElementById('preloader');
    const appContainer = document.getElementById('app-container');

    // Navigatsiya mexanizmi
    function initNavigation() {
        const navItems = document.querySelectorAll('.nav-item');
        const pages = document.querySelectorAll('.page-view');

        navItems.forEach(item => {
            item.addEventListener('click', (e) => {
                e.preventDefault(); 
                const targetPageId = item.getAttribute('data-target');
                
                if (!targetPageId) return;

                navItems.forEach(nav => nav.classList.remove('active'));
                item.classList.add('active');

                pages.forEach(page => {
                    page.style.display = 'none';
                    page.classList.remove('active');
                });

                const targetPage = document.getElementById(targetPageId);
                if (targetPage) {
                    targetPage.style.display = 'block';
                    setTimeout(() => {
                        targetPage.classList.add('active');
                    }, 50);
                }
            });
        });
    }

    // Preloaderni tugatish va ilovani ochish
    setTimeout(() => {
        if (preloader) {
            preloader.style.display = 'none';
        }
        if (appContainer) {
            appContainer.style.display = 'block';
        }
        initNavigation();
    }, 1500); 
});
