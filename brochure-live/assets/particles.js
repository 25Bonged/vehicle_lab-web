/**
 * Particle Background Animation
 * Creates an interactive particle network background effect
 */

// Get canvas element - will be retrieved when DOM is ready
let canvas = null;
let ctx = null;

// Configuration from CONFIG (fallback to defaults)
const getConfig = () => {
    if (window.CONFIG) {
        return window.CONFIG.PARTICLES;
    }
    
    // Mobile optimization: reduce particles and connection distance on small screens
    const isMobile = window.innerWidth <= 768;
    
    return {
        COUNT: isMobile ? 40 : 60, // Fewer particles on mobile for better performance
        CONNECTION_DISTANCE: isMobile ? 120 : 150, // Shorter connections on mobile
        SPEED: 0.5,
        MIN_SIZE: 1,
        MAX_SIZE: isMobile ? 2 : 3 // Smaller particles on mobile
    };
};

// Get logger (fallback to console)
const getLogger = () => {
    return window.logger || {
        debug: () => {},
        error: (msg, err) => console.error(msg, err)
    };
};

// Function to initialize canvas
function getCanvas() {
    if (!canvas) {
        canvas = document.getElementById('particles');
        if (canvas) {
            ctx = canvas.getContext('2d');
            getLogger().debug('particles.js:canvas', 'Canvas element initialized', {
                canvasFound: !!canvas,
                canvasContext: !!ctx
            });
        }
    }
    return canvas;
}

let width, height;
let particles = [];

// Get configuration values
let config = getConfig();
const particleCount = config.COUNT;
const connectionDistance = config.CONNECTION_DISTANCE;
const particleSpeed = config.SPEED;

function resize() {
    const canvasEl = getCanvas();
    if (!canvasEl) return;
    
    getLogger().debug('particles.js:resize', 'Resize function called', {
        canvasExists: !!canvasEl,
        ctxExists: !!ctx,
        windowWidth: window.innerWidth,
        windowHeight: window.innerHeight
    });
    
    width = window.innerWidth || 1920;
    height = window.innerHeight || 1080;
    
    // Ensure minimum dimensions (smaller defaults for mobile)
    if (width <= 0) width = window.innerWidth > 0 ? window.innerWidth : 375;
    if (height <= 0) height = window.innerHeight > 0 ? window.innerHeight : 667;
    
    canvasEl.width = width;
    canvasEl.height = height;
    
    // Update config if available (will adjust for mobile)
    config = getConfig();
    
    // Reinitialize particles with new count if screen size changed significantly
    const isMobile = width <= 768;
    const wasMobile = particles.length > 0 && particles.length <= 45; // Approximate check
    if (isMobile !== wasMobile && particles.length > 0) {
        // Adjust particle count for mobile/desktop switch
        const targetCount = isMobile ? 40 : 60;
        if (particles.length !== targetCount) {
            particles = [];
            for (let i = 0; i < targetCount; i++) {
                particles.push(new Particle());
            }
        }
    }
}

class Particle {
    constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.vx = (Math.random() - 0.5) * particleSpeed;
        this.vy = (Math.random() - 0.5) * particleSpeed;
        this.size = Math.random() * (config.MAX_SIZE - config.MIN_SIZE) + config.MIN_SIZE;
    }

    update() {
        this.x += this.vx;
        this.y += this.vy;

        if (this.x < 0 || this.x > width) this.vx *= -1;
        if (this.y < 0 || this.y > height) this.vy *= -1;
    }

    draw() {
        if (!ctx) return;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(0, 243, 255, 0.5)'; // Cyan
        ctx.fill();
    }
}

function init() {
    const canvasEl = getCanvas();
    const logger = getLogger();
    
    logger.debug('particles.js:init', 'Particles init started', {
        canvasExists: !!canvasEl,
        ctxExists: !!ctx,
        windowWidth: window.innerWidth,
        windowHeight: window.innerHeight
    });
    
    if (!canvasEl || !ctx) {
        logger.error('particles.js:init:error', null, {
            canvasExists: !!canvasEl,
            ctxExists: !!ctx
        });
        return;
    }
    
    resize();
    
    if (!width || !height || width === 0 || height === 0) {
        logger.error('particles.js:init:sizeError', null, {
            width: width,
            height: height,
            windowWidth: window.innerWidth,
            windowHeight: window.innerHeight
        });
        return;
    }
    
    particles = [];
    for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
    }
    
    logger.debug('particles.js:init:success', 'Particles init completed', {
        particleCount: particles.length,
        width: width,
        height: height
    });
}

function animate() {
    const logger = getLogger();
    const frameLogInterval = window.CONFIG?.ANIMATION?.FRAME_LOG_INTERVAL || 60;
    const isDebug = window.CONFIG?.DEBUG?.ENABLED || window.location.hostname === 'localhost';
    
    // Initialize frame counter
    if (typeof animate.frameCount === 'undefined') {
        animate.frameCount = 0;
        if (isDebug) {
            logger.debug('particles.js:animate:start', 'Animation loop started', {
                ctxExists: !!ctx,
                particlesCount: particles.length,
                width: width,
                height: height
            });
        }
    }
    animate.frameCount++;
    
    // Log every N frames (only in debug mode)
    if (isDebug && animate.frameCount % frameLogInterval === 0) {
        logger.debug('particles.js:animate:frame', 'Animation frame executed', {
            frameCount: animate.frameCount,
            ctxExists: !!ctx,
            particlesCount: particles.length
        });
    }
    
    const canvasEl = getCanvas();
    if (!ctx || !canvasEl) {
        if (animate.frameCount === 1) {
            logger.error('particles.js:animate:error', null, {
                ctxExists: !!ctx,
                canvasExists: !!canvasEl
            });
        }
        // Try to get canvas again on next frame
        if (animate.frameCount < 10) {
            requestAnimationFrame(animate);
        }
        return;
    }
    
    try {
        // Ensure width and height are valid before clearing
        if (!width || !height || width <= 0 || height <= 0) {
            // Resize if dimensions are invalid
            resize();
            if (!width || !height) {
                requestAnimationFrame(animate);
                return;
            }
        }
        
        ctx.clearRect(0, 0, width, height);

        // Optimized particle rendering - batch operations for better performance
        // Update all particles first
        for (let i = 0; i < particles.length; i++) {
            particles[i].update();
        }
        
        // Draw particles
        for (let i = 0; i < particles.length; i++) {
            particles[i].draw();
        }
        
        // Draw connections - optimized to reduce calculations
        // Only check connections for particles ahead (avoid duplicate checks)
        for (let i = 0; i < particles.length; i++) {
            for (let j = i + 1; j < particles.length; j++) {
                const dx = particles[i].x - particles[j].x;
                const dy = particles[i].y - particles[j].y;
                const distSq = dx * dx + dy * dy; // Use squared distance to avoid sqrt
                
                if (distSq < connectionDistance * connectionDistance) {
                    const distance = Math.sqrt(distSq);
                    ctx.beginPath();
                    ctx.strokeStyle = `rgba(0, 243, 255, ${1 - distance / connectionDistance})`;
                    ctx.lineWidth = 0.5;
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.stroke();
                }
            }
        }

        requestAnimationFrame(animate);
    } catch (e) {
        logger.error('particles.js:animate:exception', e, {
            error: e.toString(),
            message: e.message,
            stack: e.stack
        });
        // Continue animation even after error to prevent complete failure
        requestAnimationFrame(animate);
    }
}

window.addEventListener('resize', resize);

// Initialize on load
getLogger().debug('particles.js:start', 'Starting particles animation', {
    documentReady: document.readyState,
    canvasExists: !!getCanvas()
});

// Ensure canvas is available before initializing
let particlesStarted = false;
function startParticles() {
    // Prevent multiple initializations
    if (particlesStarted) return;
    
    const canvasEl = getCanvas();
    if (!canvasEl) {
        // Canvas not ready yet, try again (with limit)
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', startParticles, { once: true });
        } else {
            // Use setTimeout as fallback (max 5 attempts)
            if (!startParticles.attempts) startParticles.attempts = 0;
            startParticles.attempts++;
            if (startParticles.attempts < 5) {
                setTimeout(startParticles, 100);
            } else {
                getLogger().error('particles.js:start:timeout', null, {
                    message: 'Canvas not found after multiple attempts'
                });
            }
        }
        return;
    }
    
    // Canvas is ready, initialize
    particlesStarted = true;
    init();
    animate();
}

// Start particles animation - optimized for faster loading
function initializeParticles() {
    // Check if canvas exists immediately
    const canvasEl = document.getElementById('particles');
    if (canvasEl) {
        // Canvas is already in DOM, start immediately
        startParticles();
    } else if (document.readyState === 'loading') {
        // Wait for DOM
        document.addEventListener('DOMContentLoaded', startParticles, { once: true });
    } else {
        // DOM loaded but canvas might not be ready yet
        // Use a small timeout but don't retry indefinitely
        let attempts = 0;
        const maxAttempts = 10;
        const checkCanvas = () => {
            attempts++;
            const canvasEl = document.getElementById('particles');
            if (canvasEl) {
                startParticles();
            } else if (attempts < maxAttempts) {
                setTimeout(checkCanvas, 50);
            } else {
                getLogger().error('particles.js:timeout', null, {
                    message: 'Canvas element not found after multiple attempts'
                });
            }
        };
        checkCanvas();
    }
}

// Start initialization
initializeParticles();

// Export for debugging (optional)
if (typeof window !== 'undefined') {
    window.particlesInitialized = false;
    // Check initialization status after a delay
    setTimeout(() => {
        const canvas = document.getElementById('particles');
        if (canvas && canvas.width > 0 && canvas.height > 0) {
            window.particlesInitialized = true;
            getLogger().debug('particles.js:export', 'Particles initialized successfully', {
                canvasWidth: canvas.width,
                canvasHeight: canvas.height,
                particlesCount: particles.length
            });
        }
    }, 2000);
}
