document.addEventListener('DOMContentLoaded', () => {
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    if (hamburger && navLinks) {
        hamburger.addEventListener('click', () => {
            const isActive = navLinks.classList.toggle('active');
            hamburger.classList.toggle('active');
            
            // Accessibility update
            hamburger.setAttribute('aria-expanded', isActive);
            navLinks.setAttribute('aria-hidden', !isActive);
        });
    }

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (navLinks.classList.contains('active') && 
            !navLinks.contains(e.target) && 
            !hamburger.contains(e.target)) {
            navLinks.classList.remove('active');
            hamburger.classList.remove('active');
            
            // Accessibility update
            hamburger.setAttribute('aria-expanded', 'false');
            navLinks.setAttribute('aria-hidden', 'true');
        }
    });

    // Close menu when clicking a link
    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            hamburger.classList.remove('active');
            
            // Accessibility update
            hamburger.setAttribute('aria-expanded', 'false');
            navLinks.setAttribute('aria-hidden', 'true');
        });
    });
});
