document.addEventListener('DOMContentLoaded', () => {
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const body = document.body;

    if (hamburger && navLinks) {
        hamburger.addEventListener('click', (e) => {
            e.stopPropagation();
            const isActive = navLinks.classList.toggle('active');
            hamburger.classList.toggle('active');
            
            // Prevent body scroll when menu is open
            if (isActive) {
                body.classList.add('menu-open');
                // Save scroll position
                const scrollY = window.scrollY;
                body.style.top = `-${scrollY}px`;
            } else {
                body.classList.remove('menu-open');
                // Restore scroll position
                const scrollY = body.style.top;
                body.style.top = '';
                if (scrollY) {
                    window.scrollTo(0, parseInt(scrollY || '0') * -1);
                }
            }
            
            // Accessibility update
            hamburger.setAttribute('aria-expanded', isActive);
            navLinks.setAttribute('aria-hidden', !isActive);
        });
    }

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (navLinks && navLinks.classList.contains('active') && 
            !navLinks.contains(e.target) && 
            !hamburger.contains(e.target)) {
            navLinks.classList.remove('active');
            hamburger.classList.remove('active');
            body.classList.remove('menu-open');
            
            // Restore scroll position
            const scrollY = body.style.top;
            body.style.top = '';
            if (scrollY) {
                window.scrollTo(0, parseInt(scrollY || '0') * -1);
            }
            
            // Accessibility update
            hamburger.setAttribute('aria-expanded', 'false');
            navLinks.setAttribute('aria-hidden', 'true');
        }
    });

    // Close menu when clicking a link
    if (navLinks) {
        navLinks.querySelectorAll('a, button').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            hamburger.classList.remove('active');
                body.classList.remove('menu-open');
                
                // Restore scroll position
                const scrollY = body.style.top;
                body.style.top = '';
                if (scrollY) {
                    window.scrollTo(0, parseInt(scrollY || '0') * -1);
                }
            
            // Accessibility update
            hamburger.setAttribute('aria-expanded', 'false');
            navLinks.setAttribute('aria-hidden', 'true');
        });
    });
    }
});
