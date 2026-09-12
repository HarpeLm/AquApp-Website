document.addEventListener('DOMContentLoaded', () => {

    // ── Menu overlay ── //
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
        if (!menuOverlay.contains(e.target) && e.target !== menuToggle) closeMenu();
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') closeMenu();
    });

    // ── Accordéon FAQ ── //
    const questions = document.querySelectorAll('.faq-question');

    questions.forEach((btn) => {
        btn.addEventListener('click', () => {
            const answer = btn.nextElementSibling;
            const isOpen = btn.getAttribute('aria-expanded') === 'true';

            // Ferme tous les autres
            questions.forEach((other) => {
                if (other !== btn) {
                    other.setAttribute('aria-expanded', 'false');
                    other.nextElementSibling.classList.remove('open');
                }
            });

            // Toggle celui-ci
            btn.setAttribute('aria-expanded', String(!isOpen));
            answer.classList.toggle('open', !isOpen);
        });
    });

    // ── Animation des cartes ── //
    const cards = document.querySelectorAll('.faq-card');

    if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.style.animationPlayState = 'running';
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.08 });

        cards.forEach((card) => {
            card.style.animationPlayState = 'paused';
            observer.observe(card);
        });
    } else {
        cards.forEach((card) => { card.style.opacity = '1'; });
    }

});