// #region agent log
(function() {
    const logData = {
        location: 'particles.js:1',
        message: 'particles.js script loaded',
        data: {
            canvasExists: !!document.getElementById('particles'),
            timestamp: Date.now()
        },
        timestamp: Date.now(),
        sessionId: 'debug-session',
        runId: 'run1',
        hypothesisId: 'C'
    };
    // Only log to local debug server if available
    const isLocal = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
    if (isLocal) {
        fetch('http://127.0.0.1:7244/ingest/ef78c447-0c3f-4b0e-8b1c-7bb88ff78e42', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(logData)
        }).catch(() => {});
    }
})();
// #endregion

// Get canvas element - will be retrieved when DOM is ready
let canvas = null;
let ctx = null;

// Function to initialize canvas
function getCanvas() {
    if (!canvas) {
        canvas = document.getElementById('particles');
        if (canvas) {
            ctx = canvas.getContext('2d');
            // #region agent log
            const canvasCheck = {
                location: 'particles.js:canvas',
                message: 'Canvas element check',
                data: {
                    canvasFound: !!canvas,
                    canvasContext: !!ctx
                },
                timestamp: Date.now(),
                sessionId: 'debug-session',
                runId: 'run1',
                hypothesisId: 'C'
            };
            // Only log to local debug server if available
            const isLocalCanvas = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
            if (isLocalCanvas) {
                fetch('http://127.0.0.1:7244/ingest/ef78c447-0c3f-4b0e-8b1c-7bb88ff78e42', {
                    method: 'POST',
                    headers: {'Content-Type': 'application/json'},
                    body: JSON.stringify(canvasCheck)
                }).catch(() => {});
            }
            // #endregion
        }
    }
    return canvas;
}

let width, height;
let particles = [];

// Configuration
const particleCount = 60;
const connectionDistance = 150;
const particleSpeed = 0.5;

function resize() {
    const canvasEl = getCanvas();
    if (!canvasEl) return;
    
    // #region agent log
    const resizeLog = {
        location: 'particles.js:resize',
        message: 'Resize function called',
        data: {
            canvasExists: !!canvasEl,
            ctxExists: !!ctx,
            windowWidth: window.innerWidth,
            windowHeight: window.innerHeight
        },
        timestamp: Date.now(),
        sessionId: 'debug-session',
        runId: 'run1',
        hypothesisId: 'C'
    };
    // Only log to local debug server if available
    const isLocalDebug = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
    if (isLocalDebug) {
        fetch('http://127.0.0.1:7244/ingest/ef78c447-0c3f-4b0e-8b1c-7bb88ff78e42', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(resizeLog)
        }).catch(() => {});
    }
    // #endregion
    
    width = window.innerWidth || 1920;
    height = window.innerHeight || 1080;
    
    // Ensure minimum dimensions
    if (width <= 0) width = 1920;
    if (height <= 0) height = 1080;
    
    canvasEl.width = width;
    canvasEl.height = height;
}

class Particle {
    constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.vx = (Math.random() - 0.5) * particleSpeed;
        this.vy = (Math.random() - 0.5) * particleSpeed;
        this.size = Math.random() * 2 + 1;
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
    
    // #region agent log
    const logData = {
        location: 'particles.js:init',
        message: 'Particles init started',
        data: {
            canvasExists: !!canvasEl,
            ctxExists: !!ctx,
            windowWidth: window.innerWidth,
            windowHeight: window.innerHeight
        },
        timestamp: Date.now(),
        sessionId: 'debug-session',
        runId: 'run1',
        hypothesisId: 'C'
    };
    // Only log to local debug server if available
    const isLocal = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
    if (isLocal) {
        fetch('http://127.0.0.1:7244/ingest/ef78c447-0c3f-4b0e-8b1c-7bb88ff78e42', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(logData)
        }).catch(() => {});
    }
    // #endregion
    
    if (!canvasEl || !ctx) {
        // #region agent log
        const errorLog = {
            location: 'particles.js:init:error',
            message: 'Canvas or context missing - init failed',
            data: {
                canvasExists: !!canvasEl,
                ctxExists: !!ctx
            },
            timestamp: Date.now(),
            sessionId: 'debug-session',
            runId: 'run1',
            hypothesisId: 'C'
        };
        // Only log to local debug server if available
    const isLocalDebug = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
    if (isLocalDebug) {
        fetch('http://127.0.0.1:7244/ingest/ef78c447-0c3f-4b0e-8b1c-7bb88ff78e42', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(errorLog)
        }).catch(() => {});
    }
    // #endregion
        return;
    }
    
    resize();
    
    // #region agent log
    if (!width || !height || width === 0 || height === 0) {
        const sizeErrorLog = {
            location: 'particles.js:init:sizeError',
            message: 'Canvas dimensions invalid',
            data: {
                width: width,
                height: height,
                windowWidth: window.innerWidth,
                windowHeight: window.innerHeight
            },
            timestamp: Date.now(),
            sessionId: 'debug-session',
            runId: 'run1',
            hypothesisId: 'C'
        };
        // Only log to local debug server if available
    const isLocalDebug = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
    if (isLocalDebug) {
        fetch('http://127.0.0.1:7244/ingest/ef78c447-0c3f-4b0e-8b1c-7bb88ff78e42', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(sizeErrorLog)
        }).catch(() => {});
    }
    // #endregion
    
    for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
    }
    
    // #region agent log
    const successLog = {
        location: 'particles.js:init:success',
        message: 'Particles init completed',
        data: {
            particleCount: particles.length,
            width: width,
            height: height
        },
        timestamp: Date.now(),
        sessionId: 'debug-session',
        runId: 'run1',
        hypothesisId: 'C'
    };
    // Only log to local debug server if available
    const isLocalDebug = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
    if (isLocalDebug) {
        fetch('http://127.0.0.1:7244/ingest/ef78c447-0c3f-4b0e-8b1c-7bb88ff78e42', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(successLog)
        }).catch(() => {});
    }
    // #endregion
}

function animate() {
    // #region agent log
    if (typeof animate.frameCount === 'undefined') {
        animate.frameCount = 0;
        const animateStartLog = {
            location: 'particles.js:animate:start',
            message: 'Animation loop started',
            data: {
                ctxExists: !!ctx,
                particlesCount: particles.length,
                width: width,
                height: height
            },
            timestamp: Date.now(),
            sessionId: 'debug-session',
            runId: 'run1',
            hypothesisId: 'C'
        };
        // Only log to local debug server if available
        const isLocal = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
        if (isLocal) {
            fetch('http://127.0.0.1:7244/ingest/ef78c447-0c3f-4b0e-8b1c-7bb88ff78e42', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(animateStartLog)
            }).catch(() => {});
        }
    }
    animate.frameCount++;
    
    // Log every 60 frames (roughly once per second at 60fps)
    if (animate.frameCount % 60 === 0) {
        const frameLog = {
            location: 'particles.js:animate:frame',
            message: 'Animation frame executed',
            data: {
                frameCount: animate.frameCount,
                ctxExists: !!ctx,
                canvasExists: !!canvasEl,
                particlesCount: particles.length
            },
            timestamp: Date.now(),
            sessionId: 'debug-session',
            runId: 'run1',
            hypothesisId: 'C'
        };
        // Only log to local debug server if available
        const isLocalFrame = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
        if (isLocalFrame) {
            fetch('http://127.0.0.1:7244/ingest/ef78c447-0c3f-4b0e-8b1c-7bb88ff78e42', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(frameLog)
            }).catch(() => {});
        }
    }
    // #endregion
    
    const canvasEl = getCanvas();
    if (!ctx || !canvasEl) {
        // #region agent log
        if (animate.frameCount === 1) {
            const errorLog = {
                location: 'particles.js:animate:error',
                message: 'Animation failed - ctx or canvas missing',
                data: {
                    ctxExists: !!ctx,
                    canvasExists: !!canvasEl
                },
                timestamp: Date.now(),
                sessionId: 'debug-session',
                runId: 'run1',
                hypothesisId: 'C'
            };
            // Only log to local debug server if available
            const isLocalDebug = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
            if (isLocalDebug) {
                fetch('http://127.0.0.1:7244/ingest/ef78c447-0c3f-4b0e-8b1c-7bb88ff78e42', {
                    method: 'POST',
                    headers: {'Content-Type': 'application/json'},
                    body: JSON.stringify(errorLog)
                }).catch(() => {});
            }
        }
        // #endregion
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

        for (let i = 0; i < particles.length; i++) {
            particles[i].update();
            particles[i].draw();

            for (let j = i; j < particles.length; j++) {
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
        // #region agent log
        const errorLog = {
            location: 'particles.js:animate:exception',
            message: 'Exception in animate loop',
            data: {
                error: e.toString(),
                message: e.message,
                stack: e.stack
            },
            timestamp: Date.now(),
            sessionId: 'debug-session',
            runId: 'run1',
            hypothesisId: 'B'
        };
        // Only log to local debug server if available
    const isLocalDebug = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
    if (isLocalDebug) {
        fetch('http://127.0.0.1:7244/ingest/ef78c447-0c3f-4b0e-8b1c-7bb88ff78e42', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(errorLog)
        }).catch(() => {});
    }
    // #endregion
        // Continue animation even after error to prevent complete failure
        requestAnimationFrame(animate);
    }
}

window.addEventListener('resize', resize);
// #region agent log
const startLog = {
    location: 'particles.js:start',
    message: 'Starting particles animation',
    data: {
        documentReady: document.readyState,
        canvasExists: !!getCanvas()
    },
    timestamp: Date.now(),
    sessionId: 'debug-session',
    runId: 'run1',
    hypothesisId: 'C'
};
// Only log to local debug server if available
const isLocalStart = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
if (isLocalStart) {
    fetch('http://127.0.0.1:7244/ingest/ef78c447-0c3f-4b0e-8b1c-7bb88ff78e42', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(startLog)
    }).catch(() => {});
}
// #endregion

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
