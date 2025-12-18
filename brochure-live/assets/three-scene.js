// Three.js Scene Manager for VEHICLE-LAB
// Main 3D scene controller with particles, geometric shapes, and parallax effects

// THREE will be loaded from CDN in HTML

class ThreeScene {
    constructor(container) {
        this.container = container;
        this.scene = null;
        this.camera = null;
        this.renderer = null;
        this.particles = null;
        this.geometricShapes = [];
        this.mouse = { x: 0, y: 0 };
        this.scrollProgress = 0;
        this.isMobile = window.innerWidth < 768;
        this.initialized = false;
        
        // Wait for THREE to be available (check both THREE and window.THREE)
        const threeAvailable = typeof THREE !== 'undefined' || typeof window.THREE !== 'undefined';
        if (!threeAvailable) {
            this.loadThree().then(() => {
                this.init();
                this.setupEventListeners();
            });
        } else {
            this.init();
            this.setupEventListeners();
        }
    }

    loadThree() {
        return new Promise((resolve) => {
            // Check for THREE in multiple places (ES modules vs legacy)
            if (typeof THREE !== 'undefined' || typeof window.THREE !== 'undefined') {
                resolve();
                return;
            }
            
            // Fallback: Load legacy build if ES modules didn't work
            const script = document.createElement('script');
            script.src = 'https://cdn.jsdelivr.net/npm/three@0.160.0/build/three.min.js';
            script.crossOrigin = 'anonymous';
            script.onload = () => {
                // Make THREE globally available
                if (typeof THREE !== 'undefined') {
                    window.THREE = THREE;
                }
                // Wait a bit for THREE to be fully available
                setTimeout(resolve, 100);
            };
            script.onerror = () => {
                console.warn('Failed to load THREE.js, continuing without 3D scene');
                resolve(); // Resolve anyway to not block the page
            };
            document.head.appendChild(script);
        });
    }

    init() {
        // Check for THREE in multiple places (ES modules vs legacy)
        const ThreeLib = typeof THREE !== 'undefined' ? THREE : (typeof window.THREE !== 'undefined' ? window.THREE : null);
        if (!ThreeLib) {
            console.warn('THREE.js not loaded yet');
            return;
        }
        
        // Use ThreeLib throughout this function
        const THREE = ThreeLib;
        
        // Scene setup
        this.scene = new THREE.Scene();
        this.scene.fog = new THREE.Fog(0x050a14, 10, 50);
        this.initialized = true;

        // Camera setup
        this.camera = new THREE.PerspectiveCamera(
            75,
            window.innerWidth / window.innerHeight,
            0.1,
            1000
        );
        this.camera.position.z = 5;

        // Renderer setup
        this.renderer = new THREE.WebGLRenderer({
            antialias: true,
            alpha: true,
            powerPreference: "high-performance"
        });
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        this.renderer.setClearColor(0x050a14, 0);
        this.container.appendChild(this.renderer.domElement);

        // Lighting
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
        this.scene.add(ambientLight);

        const directionalLight = new THREE.DirectionalLight(0x00f3ff, 0.8);
        directionalLight.position.set(5, 5, 5);
        this.scene.add(directionalLight);

        const pointLight = new THREE.PointLight(0xbc13fe, 0.6, 100);
        pointLight.position.set(-5, -5, 5);
        this.scene.add(pointLight);

        // Create 3D elements
        this.createParticleSystem();
        this.createGeometricShapes();
    }

    createParticleSystem() {
        const particleCount = this.isMobile ? 500 : 2000;
        const geometry = new THREE.BufferGeometry();
        const positions = new Float32Array(particleCount * 3);
        const colors = new Float32Array(particleCount * 3);
        const sizes = new Float32Array(particleCount);

        const color1 = new THREE.Color(0x00f3ff); // Cyan
        const color2 = new THREE.Color(0xbc13fe); // Purple

        for (let i = 0; i < particleCount; i++) {
            const i3 = i * 3;
            
            // Positions
            positions[i3] = (Math.random() - 0.5) * 20;
            positions[i3 + 1] = (Math.random() - 0.5) * 20;
            positions[i3 + 2] = (Math.random() - 0.5) * 20;

            // Colors (interpolate between cyan and purple)
            const colorMix = Math.random();
            const color = new THREE.Color().lerpColors(color1, color2, colorMix);
            colors[i3] = color.r;
            colors[i3 + 1] = color.g;
            colors[i3 + 2] = color.b;

            // Sizes
            sizes[i] = Math.random() * 2 + 0.5;
        }

        geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
        geometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1));

        const material = new THREE.PointsMaterial({
            size: 0.05,
            vertexColors: true,
            transparent: true,
            opacity: 0.8,
            blending: THREE.AdditiveBlending
        });

        this.particles = new THREE.Points(geometry, material);
        this.scene.add(this.particles);
    }

    createGeometricShapes() {
        // Use stored THREE reference
        const ThreeLib = this.ThreeLib || (typeof THREE !== 'undefined' ? THREE : (typeof window.THREE !== 'undefined' ? window.THREE : null));
        if (!ThreeLib) return;
        
        // Floating cubes
        for (let i = 0; i < (this.isMobile ? 3 : 8); i++) {
            const geometry = new ThreeLib.BoxGeometry(0.3, 0.3, 0.3);
            const material = new ThreeLib.MeshStandardMaterial({
                color: i % 2 === 0 ? 0x00f3ff : 0xbc13fe,
                emissive: i % 2 === 0 ? 0x00f3ff : 0xbc13fe,
                emissiveIntensity: 0.3,
                transparent: true,
                opacity: 0.6
            });
            const cube = new ThreeLib.Mesh(geometry, material);
            
            cube.position.set(
                (Math.random() - 0.5) * 10,
                (Math.random() - 0.5) * 10,
                (Math.random() - 0.5) * 10
            );
            cube.rotation.set(
                Math.random() * Math.PI,
                Math.random() * Math.PI,
                Math.random() * Math.PI
            );
            
            cube.userData = {
                speed: {
                    rotation: {
                        x: (Math.random() - 0.5) * 0.02,
                        y: (Math.random() - 0.5) * 0.02,
                        z: (Math.random() - 0.5) * 0.02
                    },
                    float: {
                        y: (Math.random() - 0.5) * 0.01
                    }
                },
                initialY: cube.position.y
            };
            
            this.geometricShapes.push(cube);
            this.scene.add(cube);
        }

        // Torus knots
        for (let i = 0; i < (this.isMobile ? 1 : 3); i++) {
            const geometry = new ThreeLib.TorusKnotGeometry(0.5, 0.2, 64, 16);
            const material = new ThreeLib.MeshStandardMaterial({
                color: 0x00f3ff,
                wireframe: true,
                transparent: true,
                opacity: 0.3
            });
            const torus = new ThreeLib.Mesh(geometry, material);
            
            torus.position.set(
                (Math.random() - 0.5) * 8,
                (Math.random() - 0.5) * 8,
                (Math.random() - 0.5) * 8
            );
            
            torus.userData = {
                speed: {
                    rotation: {
                        x: (Math.random() - 0.5) * 0.01,
                        y: (Math.random() - 0.5) * 0.01,
                        z: (Math.random() - 0.5) * 0.01
                    }
                }
            };
            
            this.geometricShapes.push(torus);
            this.scene.add(torus);
        }
    }

    updateParticles() {
        if (!this.particles) return;
        
        const positions = this.particles.geometry.attributes.position.array;
        const time = Date.now() * 0.0005;
        
        for (let i = 0; i < positions.length; i += 3) {
            positions[i] += Math.sin(time + positions[i]) * 0.001;
            positions[i + 1] += Math.cos(time + positions[i + 1]) * 0.001;
            positions[i + 2] += Math.sin(time + positions[i + 2]) * 0.001;
        }
        
        this.particles.geometry.attributes.position.needsUpdate = true;
        this.particles.rotation.y += 0.0005;
    }

    updateGeometricShapes() {
        this.geometricShapes.forEach((shape, index) => {
            // Rotation
            if (shape.userData.speed.rotation) {
                shape.rotation.x += shape.userData.speed.rotation.x;
                shape.rotation.y += shape.userData.speed.rotation.y;
                shape.rotation.z += shape.userData.speed.rotation.z;
            }
            
            // Floating animation
            if (shape.userData.speed.float) {
                const time = Date.now() * 0.001;
                shape.position.y = shape.userData.initialY + Math.sin(time + index) * 0.5;
            }
            
            // Mouse interaction
            const mouseInfluence = 0.1;
            shape.position.x += (this.mouse.x * mouseInfluence - shape.position.x) * 0.05;
            shape.position.y += (this.mouse.y * mouseInfluence - shape.position.y) * 0.05;
        });
    }

    updateCamera(scrollProgress) {
        // Parallax camera movement based on scroll
        this.camera.position.z = 5 + scrollProgress * 2;
        this.camera.rotation.z = scrollProgress * 0.1;
    }

    onMouseMove(event) {
        this.mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
        this.mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
    }

    onScroll(progress) {
        this.scrollProgress = progress;
        this.updateCamera(progress);
        
        // Update particle colors based on scroll
        if (this.particles && this.scene) {
            // Use stored THREE reference
            const ThreeLib = this.ThreeLib || (typeof THREE !== 'undefined' ? THREE : (typeof window.THREE !== 'undefined' ? window.THREE : null));
            if (!ThreeLib) return;
            
            const colors = this.particles.geometry.attributes.color.array;
            const color1 = new ThreeLib.Color(0x00f3ff);
            const color2 = new ThreeLib.Color(0xbc13fe);
            
            for (let i = 0; i < colors.length; i += 3) {
                const mix = (Math.sin(progress * Math.PI * 2 + i) + 1) / 2;
                const color = new ThreeLib.Color().lerpColors(color1, color2, mix);
                colors[i] = color.r;
                colors[i + 1] = color.g;
                colors[i + 2] = color.b;
            }
            
            this.particles.geometry.attributes.color.needsUpdate = true;
        }
    }

    animate() {
        if (!this.initialized || !this.scene || !this.camera || !this.renderer) {
            requestAnimationFrame(() => this.animate());
            return;
        }
        
        requestAnimationFrame(() => this.animate());
        
        this.updateParticles();
        this.updateGeometricShapes();
        
        this.renderer.render(this.scene, this.camera);
    }

    onResize() {
        this.camera.aspect = window.innerWidth / window.innerHeight;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(window.innerWidth, window.innerHeight);
    }

    setupEventListeners() {
        window.addEventListener('mousemove', (e) => this.onMouseMove(e));
        window.addEventListener('resize', () => this.onResize());
    }

    dispose() {
        // Clean up resources
        if (this.particles) {
            this.particles.geometry.dispose();
            this.particles.material.dispose();
        }
        
        this.geometricShapes.forEach(shape => {
            shape.geometry.dispose();
            shape.material.dispose();
        });
        
        this.renderer.dispose();
    }
}

// Export for module or global
if (typeof module !== 'undefined' && module.exports) {
    module.exports = ThreeScene;
}
window.ThreeScene = ThreeScene;

