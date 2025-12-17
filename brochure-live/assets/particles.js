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
    fetch('http://127.0.0.1:7244/ingest/ef78c447-0c3f-4b0e-8b1c-7bb88ff78e42', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(logData)
    }).catch(() => {});
})();
// #endregion

const canvas = document.getElementById('particles');
// #region agent log
const canvasCheck = {
    location: 'particles.js:canvas',
    message: 'Canvas element check',
    data: {
        canvasFound: !!canvas,
        canvasContext: canvas ? !!canvas.getContext('2d') : false
    },
    timestamp: Date.now(),
    sessionId: 'debug-session',
    runId: 'run1',
    hypothesisId: 'C'
};
fetch('http://127.0.0.1:7244/ingest/ef78c447-0c3f-4b0e-8b1c-7bb88ff78e42', {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(canvasCheck)
}).catch(() => {});
// #endregion
const ctx = canvas ? canvas.getContext('2d') : null;

let width, height;
let particles = [];

// Configuration
const particleCount = 60;
const connectionDistance = 150;
const particleSpeed = 0.5;

function resize() {
    // #region agent log
    const resizeLog = {
        location: 'particles.js:resize',
        message: 'Resize function called',
        data: {
            canvasExists: !!canvas,
            ctxExists: !!ctx,
            windowWidth: window.innerWidth,
            windowHeight: window.innerHeight
        },
        timestamp: Date.now(),
        sessionId: 'debug-session',
        runId: 'run1',
        hypothesisId: 'C'
    };
    fetch('http://127.0.0.1:7244/ingest/ef78c447-0c3f-4b0e-8b1c-7bb88ff78e42', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(resizeLog)
    }).catch(() => {});
    // #endregion
    
    if (!canvas) return;
    
    width = window.innerWidth;
    height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;
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
    // #region agent log
    const logData = {
        location: 'particles.js:init',
        message: 'Particles init started',
        data: {
            canvasExists: !!canvas,
            ctxExists: !!ctx,
            windowWidth: window.innerWidth,
            windowHeight: window.innerHeight
        },
        timestamp: Date.now(),
        sessionId: 'debug-session',
        runId: 'run1',
        hypothesisId: 'C'
    };
    fetch('http://127.0.0.1:7244/ingest/ef78c447-0c3f-4b0e-8b1c-7bb88ff78e42', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(logData)
    }).catch(() => {});
    // #endregion
    
    if (!canvas || !ctx) {
        // #region agent log
        const errorLog = {
            location: 'particles.js:init:error',
            message: 'Canvas or context missing - init failed',
            data: {
                canvasExists: !!canvas,
                ctxExists: !!ctx
            },
            timestamp: Date.now(),
            sessionId: 'debug-session',
            runId: 'run1',
            hypothesisId: 'C'
        };
        fetch('http://127.0.0.1:7244/ingest/ef78c447-0c3f-4b0e-8b1c-7bb88ff78e42', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(errorLog)
        }).catch(() => {});
        // #endregion
        return;
    }
    
    resize();
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
    fetch('http://127.0.0.1:7244/ingest/ef78c447-0c3f-4b0e-8b1c-7bb88ff78e42', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(successLog)
    }).catch(() => {});
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
        fetch('http://127.0.0.1:7244/ingest/ef78c447-0c3f-4b0e-8b1c-7bb88ff78e42', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(animateStartLog)
        }).catch(() => {});
    }
    animate.frameCount++;
    // #endregion
    
    if (!ctx || !canvas) {
        // #region agent log
        if (animate.frameCount === 1) {
            const errorLog = {
                location: 'particles.js:animate:error',
                message: 'Animation failed - ctx or canvas missing',
                data: {
                    ctxExists: !!ctx,
                    canvasExists: !!canvas
                },
                timestamp: Date.now(),
                sessionId: 'debug-session',
                runId: 'run1',
                hypothesisId: 'C'
            };
            fetch('http://127.0.0.1:7244/ingest/ef78c447-0c3f-4b0e-8b1c-7bb88ff78e42', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(errorLog)
            }).catch(() => {});
        }
        // #endregion
        return;
    }
    
    try {
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
        fetch('http://127.0.0.1:7244/ingest/ef78c447-0c3f-4b0e-8b1c-7bb88ff78e42', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(errorLog)
        }).catch(() => {});
        // #endregion
    }
}

window.addEventListener('resize', resize);
// #region agent log
const startLog = {
    location: 'particles.js:start',
    message: 'Starting particles animation',
    data: {
        documentReady: document.readyState,
        canvasExists: !!canvas
    },
    timestamp: Date.now(),
    sessionId: 'debug-session',
    runId: 'run1',
    hypothesisId: 'C'
};
fetch('http://127.0.0.1:7244/ingest/ef78c447-0c3f-4b0e-8b1c-7bb88ff78e42', {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(startLog)
}).catch(() => {});
// #endregion

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function() {
        init();
        animate();
    });
} else {
    init();
    animate();
}
