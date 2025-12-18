// DiagAI Multi-Agent System 3D Visualization
// Creates an interactive 3D visualization of the 8 diagnostic agents

class DiagAI3D {
    constructor(container) {
        this.container = container;
        this.scene = null;
        this.camera = null;
        this.renderer = null;
        this.agents = [];
        this.centralNode = null;
        this.connections = [];
        this.initialized = false;
        this.animationId = null;
        
        if (typeof THREE !== 'undefined') {
            this.init();
        } else {
            console.warn('THREE.js not loaded for DiagAI visualization');
        }
    }

    init() {
        if (typeof THREE === 'undefined') return;
        
        // Scene setup
        this.scene = new THREE.Scene();
        this.scene.background = new THREE.Color(0x050a14);
        
        // Camera setup
        const width = this.container.clientWidth;
        const height = this.container.clientHeight;
        this.camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 1000);
        this.camera.position.set(0, 0, 15);
        
        // Renderer setup
        this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
        this.renderer.setSize(width, height);
        this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        this.container.appendChild(this.renderer.domElement);
        
        // Lighting
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
        this.scene.add(ambientLight);
        
        const pointLight1 = new THREE.PointLight(0x00f3ff, 1, 100);
        pointLight1.position.set(10, 10, 10);
        this.scene.add(pointLight1);
        
        const pointLight2 = new THREE.PointLight(0xbc13fe, 1, 100);
        pointLight2.position.set(-10, -10, 10);
        this.scene.add(pointLight2);
        
        // Create visualization
        this.createCentralNode();
        this.createAgents();
        this.createConnections();
        
        // Mouse controls
        this.setupControls();
        
        // Start animation
        this.animate();
        this.initialized = true;
    }

    createCentralNode() {
        // Central orchestrator node
        const geometry = new THREE.OctahedronGeometry(1.5, 0);
        const material = new THREE.MeshStandardMaterial({
            color: 0xbc13fe,
            emissive: 0xbc13fe,
            emissiveIntensity: 0.5,
            transparent: true,
            opacity: 0.9
        });
        
        this.centralNode = new THREE.Mesh(geometry, material);
        this.centralNode.position.set(0, 0, 0);
        this.scene.add(this.centralNode);
        
        // Pulsing effect
        this.centralNode.userData = {
            baseScale: 1,
            pulseSpeed: 0.02
        };
    }

    createAgents() {
        const agentNames = [
            'Misfire', 'Fuel', 'Gear', 'Drivability',
            'WLTP', 'StartWarmup', 'DFC', 'IUPR'
        ];
        
        const colors = [
            0xff2a2a, 0x00f3ff, 0x00f3ff, 0xbc13fe,
            0x00f3ff, 0xbc13fe, 0x00f3ff, 0xbc13fe
        ];
        
        const radius = 6;
        const angleStep = (Math.PI * 2) / agentNames.length;
        
        agentNames.forEach((name, index) => {
            const angle = index * angleStep;
            const x = Math.cos(angle) * radius;
            const y = Math.sin(angle) * radius;
            
            // Agent node (smaller octahedron)
            const geometry = new THREE.OctahedronGeometry(0.8, 0);
            const material = new THREE.MeshStandardMaterial({
                color: colors[index],
                emissive: colors[index],
                emissiveIntensity: 0.4,
                transparent: true,
                opacity: 0.8
            });
            
            const agent = new THREE.Mesh(geometry, material);
            agent.position.set(x, y, 0);
            agent.userData = {
                name: name,
                index: index,
                basePosition: { x, y, z: 0 },
                angle: angle,
                rotationSpeed: 0.01 + Math.random() * 0.01
            };
            
            this.agents.push(agent);
            this.scene.add(agent);
            
            // Add text label (using sprite or HTML overlay would be better, but keeping it simple)
            // For now, we'll use a small indicator
            const labelGeometry = new THREE.RingGeometry(0.9, 1.0, 8);
            const labelMaterial = new THREE.MeshBasicMaterial({
                color: colors[index],
                transparent: true,
                opacity: 0.3,
                side: THREE.DoubleSide
            });
            const label = new THREE.Mesh(labelGeometry, labelMaterial);
            agent.add(label);
        });
    }

    createConnections() {
        // Create lines connecting central node to agents
        this.agents.forEach((agent, index) => {
            const geometry = new THREE.BufferGeometry().setFromPoints([
                new THREE.Vector3(0, 0, 0),
                new THREE.Vector3(
                    agent.userData.basePosition.x,
                    agent.userData.basePosition.y,
                    0
                )
            ]);
            
            const material = new THREE.LineBasicMaterial({
                color: index % 2 === 0 ? 0x00f3ff : 0xbc13fe,
                transparent: true,
                opacity: 0.3,
                linewidth: 2
            });
            
            const line = new THREE.Line(geometry, material);
            line.userData = {
                agentIndex: index,
                pulsePhase: Math.random() * Math.PI * 2
            };
            
            this.connections.push(line);
            this.scene.add(line);
        });
    }

    setupControls() {
        let mouseX = 0;
        let mouseY = 0;
        let targetRotationX = 0;
        let targetRotationY = 0;
        
        this.container.addEventListener('mousemove', (e) => {
            const rect = this.container.getBoundingClientRect();
            mouseX = ((e.clientX - rect.left) / rect.width) * 2 - 1;
            mouseY = -((e.clientY - rect.top) / rect.height) * 2 + 1;
            
            targetRotationY = mouseX * 0.5;
            targetRotationX = mouseY * 0.5;
        });
        
        // Smooth camera rotation
        this.camera.userData = {
            targetRotationX: 0,
            targetRotationY: 0,
            currentRotationX: 0,
            currentRotationY: 0
        };
        
        const updateCamera = () => {
            this.camera.userData.targetRotationX += (targetRotationX - this.camera.userData.targetRotationX) * 0.05;
            this.camera.userData.targetRotationY += (targetRotationY - this.camera.userData.targetRotationY) * 0.05;
            
            const radius = 15;
            const x = Math.sin(this.camera.userData.targetRotationY) * Math.cos(this.camera.userData.targetRotationX) * radius;
            const y = Math.sin(this.camera.userData.targetRotationX) * radius;
            const z = Math.cos(this.camera.userData.targetRotationY) * Math.cos(this.camera.userData.targetRotationX) * radius;
            
            this.camera.position.set(x, y, z);
            this.camera.lookAt(0, 0, 0);
        };
        
        this.updateCamera = updateCamera;
    }

    animate() {
        this.animationId = requestAnimationFrame(() => this.animate());
        
        if (!this.initialized || !this.scene || !this.camera) return;
        
        const time = Date.now() * 0.001;
        
        // Animate central node
        if (this.centralNode) {
            const pulse = Math.sin(time * 2) * 0.1 + 1;
            this.centralNode.scale.set(pulse, pulse, pulse);
            this.centralNode.rotation.y += 0.01;
        }
        
        // Animate agents
        this.agents.forEach((agent, index) => {
            // Orbital motion
            const angle = agent.userData.angle + time * 0.1;
            const radius = 6 + Math.sin(time * 0.5 + index) * 0.3;
            agent.position.x = Math.cos(angle) * radius;
            agent.position.y = Math.sin(angle) * radius;
            
            // Rotation
            agent.rotation.x += agent.userData.rotationSpeed;
            agent.rotation.y += agent.userData.rotationSpeed * 0.5;
            
            // Pulsing
            const pulse = Math.sin(time * 3 + index) * 0.15 + 1;
            agent.scale.set(pulse, pulse, pulse);
        });
        
        // Animate connections
        this.connections.forEach((line, index) => {
            const points = line.geometry.attributes.position.array;
            points[3] = this.agents[index].position.x;
            points[4] = this.agents[index].position.y;
            points[5] = this.agents[index].position.z;
            line.geometry.attributes.position.needsUpdate = true;
            
            // Pulsing opacity
            line.material.opacity = 0.2 + Math.sin(time * 2 + index) * 0.2;
        });
        
        // Update camera
        if (this.updateCamera) {
            this.updateCamera();
        }
        
        this.renderer.render(this.scene, this.camera);
    }

    onResize() {
        if (!this.camera || !this.renderer) return;
        
        const width = this.container.clientWidth;
        const height = this.container.clientHeight;
        
        this.camera.aspect = width / height;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(width, height);
    }

    dispose() {
        if (this.animationId) {
            cancelAnimationFrame(this.animationId);
        }
        
        // Clean up geometries and materials
        if (this.centralNode) {
            this.centralNode.geometry.dispose();
            this.centralNode.material.dispose();
        }
        
        this.agents.forEach(agent => {
            agent.geometry.dispose();
            agent.material.dispose();
        });
        
        this.connections.forEach(line => {
            line.geometry.dispose();
            line.material.dispose();
        });
        
        if (this.renderer) {
            this.renderer.dispose();
        }
    }
}

// Export
if (typeof module !== 'undefined' && module.exports) {
    module.exports = DiagAI3D;
}
window.DiagAI3D = DiagAI3D;

