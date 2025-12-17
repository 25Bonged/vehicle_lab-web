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
    return {
        COUNT: 60,
        CONNECTION_DISTANCE: 150,
        SPEED: 0.5,
        MIN_SIZE: 1,
        MAX_SIZE: 3
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
    
    // Ensure minimum dimensions
    if (width <= 0) width = 1920;
    if (height <= 0) height = 1080;
    
    canvasEl.width = width;
    canvasEl.height = height;
    
    // Update config if available
    config = getConfig();
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
    
    // Initialize frame counter
    if (typeof animate.frameCount === 'undefined') {
        animate.frameCount = 0;
        logger.debug('particles.js:animate:start', 'Animation loop started', {
            ctxExists: !!ctx,
            particlesCount: particles.length,
            width: width,
            height: height
        });
    }
    animate.frameCount++;
    
    // Log every N frames (only in debug mode)
    if (animate.frameCount % frameLogInterval === 0) {
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

        // Optimized particle rendering - only check nearby particles
        for (let i = 0; i < particles.length; i++) {
            particles[i].update();
            particles[i].draw();

            // Only check connections for particles ahead (avoid duplicate checks)
            for (let j = i + 1; j < particles.length; j++) {
                const dx = particles[i].x - particles[j].x;
                const dy = particles[i].y - particles[j].y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < connectionDistance) {
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
function startParticles() {
    const canvasEl = getCanvas();
    if (!canvasEl) {
        // Canvas not ready yet, try again
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', startParticles);
        } else {
            // Use setTimeout as fallback
            setTimeout(startParticles, 100);
        }
        return;
    }
    
    // Canvas is ready, initialize
    init();
    animate();
}

// Start particles animation
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', startParticles);
} else {
    // DOM already loaded, but give a small delay to ensure canvas is in DOM
    setTimeout(startParticles, 0);
}
