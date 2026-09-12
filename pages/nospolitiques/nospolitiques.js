document.addEventListener('DOMContentLoaded', () => {

    // ── Menu overlay toggle ── //
    const menuToggle = document.getElementById('menuToggle');
    const menuOverlay = document.getElementById('menuOverlay');

    function openMenu() {
        const rect = menuToggle.getBoundingClientRect();
        const overlayWidth = Math.min(320, window.innerWidth * 0.88);
        let left = rect.right - overlayWidth;
        if (left < 8) left = 8;
        menuOverlay.style.top = (rect.bottom + 8) + 'px';
        menuOverlay.style.left = left + 'px';
        menuOverlay.style.right = 'auto';
        menuOverlay.classList.add('open');
        menuToggle.setAttribute('aria-expanded', 'true');
    }

    function closeMenu() {
        menuOverlay.classList.remove('open');
        menuToggle.setAttribute('aria-expanded', 'false');
    }

    menuToggle.addEventListener('click', (e) => {
        e.stopPropagation();
        menuOverlay.classList.contains('open') ? closeMenu() : openMenu();
    });

    document.addEventListener('click', (e) => {
        if (menuOverlay.contains(e.target) || e.target === menuToggle) return;
        closeMenu();
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') closeMenu();
    });

    // ── Gestion des onglets ── //
    const tabsWrapper = document.querySelector('.tabs');
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');

    function activateTab(btn) {
        if (!btn) return;
        const target = btn.getAttribute('data-tab');
        const targetEl = document.getElementById(target);
        if (!targetEl) return;

        tabBtns.forEach(b => b.classList.remove('active'));
        tabContents.forEach(c => c.classList.remove('active'));

        btn.classList.add('active');
        targetEl.classList.add('active');
    }

    if (tabsWrapper) {
        tabsWrapper.addEventListener('click', (e) => {
            const btn = e.target.closest('.tab-btn');
            if (!btn) return;
            activateTab(btn);
        });
    }

    // ── Navigation data-link ── //
    const linkTargets = document.querySelectorAll('[data-link]');
    linkTargets.forEach((element) => {
        const targetUrl = element.getAttribute('data-link');
        if (!targetUrl) return;
        element.setAttribute('tabindex', '0');
        element.setAttribute('role', 'link');
        element.addEventListener('click', (event) => {
            if (event.target.closest('a, button')) return;
            window.location.href = targetUrl;
        });
        element.addEventListener('keydown', (event) => {
            if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault();
                window.location.href = targetUrl;
            }
        });
    });

});