// Advanced Dropping Particle Animation for Work Together Section
// Inspired by Lusion.co projects page

class WorkTogetherParticles {
    constructor(container) {
        this.container = container;
        this.canvas = null;
        this.ctx = null;
        this.particles = [];
        this.animationId = null;
        this.mouseAnimationId = null; // Add reference for cleanup
        this.isActive = false;
        this.mouseX = 0;
        this.mouseY = 0;
        this.targetMouseX = 0;
        this.targetMouseY = 0;
        this.boundResize = null; // Store bound functions for cleanup
        this.boundMouseMove = null;
        
        // Configuration
        this.config = {
            particleCount: 150,
            shapes: ['circle', 'square', 'triangle', 'cross'],
            colors: ['rgba(255, 255, 255, 0.8)', 'rgba(255, 255, 255, 0.6)', 'rgba(255, 255, 255, 0.4)'],
            minSize: 3,
            maxSize: 12,
            minSpeed: 0.5,
            maxSpeed: 2.5,
            rotationSpeed: 0.02,
            spawnRate: 0.3, // particles per frame
            mouseInfluence: 0.15, // How much mouse affects particles
            mouseRadius: 150, // Radius of mouse influence
        };
        
        this.init();
    }
    
    init() {
        // Create canvas
        this.canvas = document.createElement('canvas');
        this.canvas.className = 'work-together-particles-canvas';
        this.container.appendChild(this.canvas);
        
        this.ctx = this.canvas.getContext('2d');
        this.resize();
        
        // Create initial particles
        this.createParticles();
        
        // Start animation
        this.start();
        
        // Handle resize - store bound function for cleanup
        this.boundResize = () => this.resize();
        window.addEventListener('resize', this.boundResize);
        
        // Mouse tracking
        this.setupMouseTracking();
        
        // Intersection Observer for performance
        this.setupIntersectionObserver();
    }
    
    setupMouseTracking() {
        // Initialize mouse position to center
        this.targetMouseX = this.width / 2;
        this.targetMouseY = this.height / 2;
        this.mouseX = this.targetMouseX;
        this.mouseY = this.targetMouseY;
        
        // Track mouse position - store bound function for cleanup
        this.boundMouseMove = (e) => {
            const rect = this.container.getBoundingClientRect();
            this.targetMouseX = e.clientX - rect.left;
            this.targetMouseY = e.clientY - rect.top;
        };
        this.container.addEventListener('mousemove', this.boundMouseMove);
        
        // Smooth mouse position interpolation
        this.mouseUpdateLoop();
    }
    
    mouseUpdateLoop() {
        // Stop if destroyed or inactive
        if (!this.isActive && !this.container) return;
        
        // Smooth interpolation for mouse position
        this.mouseX += (this.targetMouseX - this.mouseX) * 0.1;
        this.mouseY += (this.targetMouseY - this.mouseY) * 0.1;
        
        // Continue the loop only if active
        if (this.isActive) {
            this.mouseAnimationId = requestAnimationFrame(() => this.mouseUpdateLoop());
        }
    }
    
    resize() {
        const rect = this.container.getBoundingClientRect();
        this.canvas.width = rect.width;
        this.canvas.height = rect.height;
        this.width = rect.width;
        this.height = rect.height;
    }
    
    setupIntersectionObserver() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.isActive = true;
                    if (!this.animationId) {
                        this.animate();
                    }
                } else {
                    this.isActive = false;
                }
            });
        }, { threshold: 0.1 });
        
        observer.observe(this.container);
    }
    
    createParticles() {
        this.particles = [];
        for (let i = 0; i < this.config.particleCount; i++) {
            this.particles.push(this.createParticle(true));
        }
    }
    
    createParticle(randomY = false) {
        const shape = this.config.shapes[Math.floor(Math.random() * this.config.shapes.length)];
        const size = Math.random() * (this.config.maxSize - this.config.minSize) + this.config.minSize;
        const speed = Math.random() * (this.config.maxSpeed - this.config.minSpeed) + this.config.minSpeed;
        const color = this.config.colors[Math.floor(Math.random() * this.config.colors.length)];
        
        return {
            x: Math.random() * this.width,
            y: randomY ? Math.random() * this.height : -size,
            size: size,
            speed: speed,
            rotation: Math.random() * Math.PI * 2,
            rotationSpeed: (Math.random() - 0.5) * this.config.rotationSpeed,
            shape: shape,
            color: color,
            opacity: Math.random() * 0.5 + 0.3,
            phase: Math.random() * Math.PI * 2, // For floating animation
        };
    }
    
    drawShape(particle) {
        const { x, y, size, rotation, shape, color, opacity } = particle;
        
        this.ctx.save();
        this.ctx.translate(x, y);
        this.ctx.rotate(rotation);
        this.ctx.globalAlpha = opacity;
        this.ctx.fillStyle = color;
        this.ctx.strokeStyle = color;
        this.ctx.lineWidth = 1;
        
        switch (shape) {
            case 'circle':
                this.ctx.beginPath();
                this.ctx.arc(0, 0, size / 2, 0, Math.PI * 2);
                this.ctx.fill();
                break;
                
            case 'square':
                this.ctx.fillRect(-size / 2, -size / 2, size, size);
                break;
                
            case 'triangle':
                this.ctx.beginPath();
                this.ctx.moveTo(0, -size / 2);
                this.ctx.lineTo(-size / 2, size / 2);
                this.ctx.lineTo(size / 2, size / 2);
                this.ctx.closePath();
                this.ctx.fill();
                break;
                
            case 'cross':
                const crossSize = size / 3;
                this.ctx.fillRect(-crossSize / 2, -size / 2, crossSize, size);
                this.ctx.fillRect(-size / 2, -crossSize / 2, size, crossSize);
                break;
        }
        
        this.ctx.restore();
    }
    
    updateParticles() {
        // Spawn new particles at top
        if (Math.random() < this.config.spawnRate && this.particles.length < this.config.particleCount * 1.5) {
            this.particles.push(this.createParticle(false));
        }
        
        // Update existing particles
        for (let i = this.particles.length - 1; i >= 0; i--) {
            const particle = this.particles[i];
            
            // Calculate distance from mouse
            const dx = particle.x - this.mouseX;
            const dy = particle.y - this.mouseY;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            // Mouse influence on particles
            if (distance < this.config.mouseRadius) {
                const force = (1 - distance / this.config.mouseRadius) * this.config.mouseInfluence;
                const angle = Math.atan2(dy, dx);
                particle.x += Math.cos(angle) * force * 10;
                particle.y += Math.sin(angle) * force * 10;
            }
            
            // Update position (gravity/dropping)
            particle.y += particle.speed;
            
            // Add floating motion
            particle.x += Math.sin(particle.phase) * 0.3;
            particle.phase += 0.02;
            
            // Update rotation
            particle.rotation += particle.rotationSpeed;
            
            // Fade in when entering
            if (particle.y < this.height * 0.2) {
                particle.opacity = Math.min(1, (particle.y / (this.height * 0.2)) * 0.8);
            }
            
            // Fade out when leaving
            if (particle.y > this.height * 0.8) {
                particle.opacity = Math.max(0, (1 - (particle.y - this.height * 0.8) / (this.height * 0.2)) * 0.8);
            }
            
            // Remove particles that are off screen
            if (particle.y > this.height + particle.size) {
                this.particles.splice(i, 1);
            }
        }
    }
    
    animate() {
        if (!this.isActive) {
            this.animationId = null;
            return;
        }
        
        // Clear canvas
        this.ctx.clearRect(0, 0, this.width, this.height);
        
        // Update particles
        this.updateParticles();
        
        // Draw particles
        this.particles.forEach(particle => {
            this.drawShape(particle);
        });
        
        // Continue animation
        this.animationId = requestAnimationFrame(() => this.animate());
    }
    
    start() {
        if (!this.animationId) {
            this.isActive = true;
            this.animate();
        }
    }
    
    stop() {
        this.isActive = false;
        if (this.animationId) {
            cancelAnimationFrame(this.animationId);
            this.animationId = null;
        }
    }
    
    destroy() {
        this.stop();
        
        // Cancel mouse animation loop
        if (this.mouseAnimationId) {
            cancelAnimationFrame(this.mouseAnimationId);
            this.mouseAnimationId = null;
        }
        
        // Remove event listeners
        if (this.boundResize) {
            window.removeEventListener('resize', this.boundResize);
            this.boundResize = null;
        }
        
        if (this.boundMouseMove && this.container) {
            this.container.removeEventListener('mousemove', this.boundMouseMove);
            this.boundMouseMove = null;
        }
        
        // Remove canvas
        if (this.canvas && this.canvas.parentNode) {
            this.canvas.parentNode.removeChild(this.canvas);
        }
        
        // Clear references
        this.container = null;
        this.canvas = null;
        this.ctx = null;
        this.particles = [];
    }
}

// Export
if (typeof module !== 'undefined' && module.exports) {
    module.exports = WorkTogetherParticles;
}
window.WorkTogetherParticles = WorkTogetherParticles;

