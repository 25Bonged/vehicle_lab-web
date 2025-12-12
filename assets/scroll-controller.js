// Full-Page Scroll Controller with GSAP ScrollTrigger
// Implements snap-scroll (page-by-page) functionality

class ScrollController {
    constructor() {
        this.sections = [];
        this.currentSection = 0;
        this.isScrolling = false;
        this.scrollProgress = 0;
        this.threeScene = null;
        
        this.init();
    }

    init() {
        // Wait for DOM and GSAP to be ready
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => {
                setTimeout(() => this.setupScroll(), 500);
            });
        } else {
            setTimeout(() => this.setupScroll(), 500);
        }
    }

    setupScroll() {
        this.sections = document.querySelectorAll('.scroll-section');
        
        if (this.sections.length === 0) return;

        // Wait for GSAP to be ready
        if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') {
            setTimeout(() => this.setupScroll(), 100);
            return;
        }

        gsap.registerPlugin(ScrollTrigger);

        // Track scroll progress globally
        ScrollTrigger.create({
            trigger: document.body,
            start: "top top",
            end: () => document.body.scrollHeight - window.innerHeight,
            scrub: true,
            onUpdate: (self) => {
                this.scrollProgress = self.progress;
                
                // Calculate current section based on actual section positions
                const scrollY = window.scrollY + window.innerHeight / 2; // Use middle of viewport
                const navHeight = document.querySelector('nav')?.offsetHeight || 80;
                
                let newSection = 0;
                for (let i = 0; i < this.sections.length; i++) {
                    const section = this.sections[i];
                    const sectionTop = section.offsetTop - navHeight;
                    const sectionBottom = sectionTop + section.offsetHeight;
                    
                    if (scrollY >= sectionTop && scrollY < sectionBottom) {
                        newSection = i;
                        break;
                    }
                }
                
                if (newSection !== this.currentSection && newSection >= 0 && newSection < this.sections.length) {
                    this.currentSection = newSection;
                    this.updateSectionIndicators();
                }
                
                // Update 3D scene if available
                if (this.threeScene) {
                    this.threeScene.onScroll(self.progress);
                }
            }
        });

        // Animate sections on scroll
        this.sections.forEach((section, index) => {
            gsap.from(section, {
                opacity: 0,
                y: 50,
                scrollTrigger: {
                    trigger: section,
                    start: "top 80%",
                    end: "top 20%",
                    toggleActions: "play none none reverse"
                }
            });
        });

        // Setup keyboard navigation
        this.setupKeyboardNavigation();
        
        // Setup touch/swipe for mobile
        this.setupTouchNavigation();
    }

    setupKeyboardNavigation() {
        let isNavigating = false;
        
        window.addEventListener('keydown', (e) => {
            if (isNavigating) return;
            
            if (e.key === 'ArrowDown' || e.key === 'PageDown' || e.key === ' ') {
                e.preventDefault();
                this.scrollToSection(this.currentSection + 1);
                isNavigating = true;
                setTimeout(() => { isNavigating = false; }, 1000);
            } else if (e.key === 'ArrowUp' || e.key === 'PageUp') {
                e.preventDefault();
                this.scrollToSection(this.currentSection - 1);
                isNavigating = true;
                setTimeout(() => { isNavigating = false; }, 1000);
            } else if (e.key === 'Home') {
                e.preventDefault();
                this.scrollToSection(0);
            } else if (e.key === 'End') {
                e.preventDefault();
                this.scrollToSection(this.sections.length - 1);
            }
        });
    }

    setupTouchNavigation() {
        let touchStartY = 0;
        let touchEndY = 0;
        const minSwipeDistance = 50;

        window.addEventListener('touchstart', (e) => {
            touchStartY = e.changedTouches[0].screenY;
        });

        window.addEventListener('touchend', (e) => {
            touchEndY = e.changedTouches[0].screenY;
            const swipeDistance = touchStartY - touchEndY;

            if (Math.abs(swipeDistance) > minSwipeDistance) {
                if (swipeDistance > 0) {
                    // Swipe up - next section
                    this.scrollToSection(this.currentSection + 1);
                } else {
                    // Swipe down - previous section
                    this.scrollToSection(this.currentSection - 1);
                }
            }
        });
    }

    scrollToSection(index) {
        if (index < 0 || index >= this.sections.length) return;
        if (this.isScrolling) return;
        
        this.isScrolling = true;
        const targetSection = this.sections[index];
        if (targetSection) {
            const navHeight = document.querySelector('nav')?.offsetHeight || 80;
            const targetPosition = targetSection.offsetTop - navHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
            
            this.currentSection = index;
            this.updateSectionIndicators();
            
            // Reset scrolling flag after animation completes
            setTimeout(() => {
                this.isScrolling = false;
            }, 1000);
        }
    }

    updateSectionIndicators() {
        const indicators = document.querySelectorAll('.section-indicator');
        indicators.forEach((indicator, index) => {
            if (index === this.currentSection) {
                indicator.classList.add('active');
            } else {
                indicator.classList.remove('active');
            }
        });
    }

    setThreeScene(threeScene) {
        this.threeScene = threeScene;
    }
}

// Export for module or global
if (typeof module !== 'undefined' && module.exports) {
    module.exports = ScrollController;
}
window.ScrollController = ScrollController;

