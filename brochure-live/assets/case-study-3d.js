// Interactive 3D Components for Case Study Visualizations
// Fault Simulation, DFC Validation, NEDC Testing, Misfire Detection

class CaseStudy3D {
    constructor(containerId, type) {
        this.container = document.getElementById(containerId);
        if (!this.container) return;
        
        this.type = type; // 'fault-sim', 'dfc-validation', 'nedc', 'misfire'
        this.scene = null;
        this.camera = null;
        this.renderer = null;
        this.animationId = null;
        this.isInitialized = false;
        
        this.init();
    }

    init() {
        if (typeof THREE === 'undefined') {
            console.warn('THREE.js not loaded');
            return;
        }

        // Clear any text content or loading messages from container
        // Remove text nodes but keep the container structure
        const textNodes = [];
        const walker = document.createTreeWalker(
            this.container,
            NodeFilter.SHOW_TEXT,
            null,
            false
        );
        let node;
        while (node = walker.nextNode()) {
            if (node.textContent.trim()) {
                textNodes.push(node);
            }
        }
        textNodes.forEach(textNode => textNode.remove());

        // Scene setup
        this.scene = new THREE.Scene();
        this.scene.background = new THREE.Color(0x050a14);
        this.scene.fog = new THREE.Fog(0x050a14, 5, 15);

        // Camera setup - ensure container has dimensions
        let width = this.container.clientWidth;
        let height = this.container.clientHeight;
        
        // If container has no dimensions, set defaults
        if (width === 0) width = 600;
        if (height === 0) height = 400;
        
        // Ensure container has explicit dimensions
        if (!this.container.style.height) {
            this.container.style.height = '400px';
        }
        if (!this.container.style.width) {
            this.container.style.width = '100%';
        }
        
        this.camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
        this.camera.position.set(0, 0, 5);

        // Renderer setup
        this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
        this.renderer.setSize(width, height);
        this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        this.container.appendChild(this.renderer.domElement);

        // Lighting
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
        this.scene.add(ambientLight);

        const pointLight1 = new THREE.PointLight(0x00f3ff, 1, 100);
        pointLight1.position.set(5, 5, 5);
        this.scene.add(pointLight1);

        const pointLight2 = new THREE.PointLight(0xbc13fe, 0.8, 100);
        pointLight2.position.set(-5, -5, 5);
        this.scene.add(pointLight2);

        // Create visualization based on type
        this.createVisualization();

        // Handle resize
        window.addEventListener('resize', () => this.onResize());

        this.isInitialized = true;
        this.animate();
    }

    createVisualization() {
        switch (this.type) {
            case 'fault-sim':
                this.createFaultSimulation();
                break;
            case 'dfc-validation':
                this.createDFCValidation();
                break;
            case 'nedc':
                this.createNEDCVisualization();
                break;
            case 'misfire':
                this.createMisfireVisualization();
                break;
            default:
                this.createDefaultVisualization();
        }
    }

    createFaultSimulation() {
        // Create a 3D engine block representation with fault indicators
        const engineGroup = new THREE.Group();

        // Engine block (simplified)
        const engineGeometry = new THREE.BoxGeometry(2, 1.5, 1);
        const engineMaterial = new THREE.MeshStandardMaterial({
            color: 0x333333,
            metalness: 0.7,
            roughness: 0.3
        });
        const engine = new THREE.Mesh(engineGeometry, engineMaterial);
        engineGroup.add(engine);

        // Cylinders (4 cylinders)
        const cylinders = [];
        for (let i = 0; i < 4; i++) {
            const cylinderGeometry = new THREE.CylinderGeometry(0.15, 0.15, 0.8, 16);
            const cylinderMaterial = new THREE.MeshStandardMaterial({
                color: i === 2 ? 0xff2a2a : 0x00f3ff, // Cylinder 3 has fault
                emissive: i === 2 ? 0xff2a2a : 0x00f3ff,
                emissiveIntensity: i === 2 ? 0.8 : 0.3
            });
            const cylinder = new THREE.Mesh(cylinderGeometry, cylinderMaterial);
            cylinder.position.set((i - 1.5) * 0.5, 0.5, 0);
            cylinder.rotation.x = Math.PI / 2;
            cylinders.push(cylinder);
            engineGroup.add(cylinder);

            // Fault indicator (pulsing sphere for faulty cylinder)
            if (i === 2) {
                const faultIndicator = new THREE.Mesh(
                    new THREE.SphereGeometry(0.2, 16, 16),
                    new THREE.MeshBasicMaterial({
                        color: 0xff2a2a,
                        transparent: true,
                        opacity: 0.6
                    })
                );
                faultIndicator.position.copy(cylinder.position);
                faultIndicator.position.y += 0.6;
                engineGroup.add(faultIndicator);
                this.faultIndicator = faultIndicator;
            }
        }

        // Signal waveforms (3D representation)
        const waveformGroup = new THREE.Group();
        const points = 100;
        const positions = new Float32Array(points * 3);
        
        for (let i = 0; i < points; i++) {
            const x = (i / points) * 4 - 2;
            const y = Math.sin(i * 0.2) * 0.5;
            const z = Math.cos(i * 0.15) * 0.3;
            positions[i * 3] = x;
            positions[i * 3 + 1] = y;
            positions[i * 3 + 2] = z;
        }

        const waveformGeometry = new THREE.BufferGeometry();
        waveformGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        const waveformMaterial = new THREE.LineBasicMaterial({
            color: 0x00f3ff,
            linewidth: 2
        });
        const waveform = new THREE.Line(waveformGeometry, waveformMaterial);
        waveformGroup.add(waveform);
        waveformGroup.position.set(0, -1.5, 0);
        engineGroup.add(waveformGroup);

        this.scene.add(engineGroup);
        this.engineGroup = engineGroup;
    }

    createDFCValidation() {
        // Create a 3D diagnostic code validation visualization
        const dfcGroup = new THREE.Group();

        // DTC codes as 3D cards
        const dtcCodes = [
            { code: 'P0304', status: 'critical', pos: [-1.5, 1, 0] },
            { code: 'P0171', status: 'warning', pos: [0, 1, 0] },
            { code: 'P0420', status: 'warning', pos: [1.5, 1, 0] },
            { code: 'P0128', status: 'info', pos: [-0.75, -0.5, 0] },
            { code: 'P0135', status: 'info', pos: [0.75, -0.5, 0] }
        ];

        dtcCodes.forEach((dtc, index) => {
            // Card
            const cardGeometry = new THREE.BoxGeometry(0.8, 0.6, 0.1);
            const colors = {
                critical: 0xff2a2a,
                warning: 0xffbd2e,
                info: 0x00f3ff
            };
            const cardMaterial = new THREE.MeshStandardMaterial({
                color: colors[dtc.status],
                emissive: colors[dtc.status],
                emissiveIntensity: 0.3,
                transparent: true,
                opacity: 0.8
            });
            const card = new THREE.Mesh(cardGeometry, cardMaterial);
            card.position.set(dtc.pos[0], dtc.pos[1], dtc.pos[2]);
            card.userData = { dtc, index };
            dfcGroup.add(card);

            // Validation checkmark or X
            const symbolGeometry = new THREE.RingGeometry(0.1, 0.2, 16);
            const symbolMaterial = new THREE.MeshBasicMaterial({
                color: dtc.status === 'critical' ? 0xff2a2a : 0x0f0,
                side: THREE.DoubleSide
            });
            const symbol = new THREE.Mesh(symbolGeometry, symbolMaterial);
            symbol.position.set(dtc.pos[0], dtc.pos[1], dtc.pos[2] + 0.1);
            dfcGroup.add(symbol);
        });

        // Connection lines showing validation flow
        const lineMaterial = new THREE.LineBasicMaterial({
            color: 0x00f3ff,
            transparent: true,
            opacity: 0.5
        });

        for (let i = 0; i < dtcCodes.length - 1; i++) {
            const points = [
                new THREE.Vector3(dtcCodes[i].pos[0], dtcCodes[i].pos[1], dtcCodes[i].pos[2]),
                new THREE.Vector3(dtcCodes[i + 1].pos[0], dtcCodes[i + 1].pos[1], dtcCodes[i + 1].pos[2])
            ];
            const lineGeometry = new THREE.BufferGeometry().setFromPoints(points);
            const line = new THREE.Line(lineGeometry, lineMaterial);
            dfcGroup.add(line);
        }

        this.scene.add(dfcGroup);
        this.dfcGroup = dfcGroup;
    }

    createNEDCVisualization() {
        // Create a 3D NEDC cycle visualization
        const nedcGroup = new THREE.Group();

        // Create velocity profile as 3D curve
        const nedcPhases = [
            { name: 'Urban', duration: 195, maxSpeed: 50 },
            { name: 'Extra Urban', duration: 400, maxSpeed: 120 }
        ];

        const curvePoints = [];
        let time = 0;
        
        // Urban phase
        for (let i = 0; i < 100; i++) {
            const t = i / 100;
            const speed = Math.sin(t * Math.PI * 4) * 25 + 25; // Simulated urban cycle
            curvePoints.push(new THREE.Vector3(time * 0.01, speed * 0.02, 0));
            time += 1.95;
        }

        // Extra urban phase
        for (let i = 0; i < 100; i++) {
            const t = i / 100;
            const speed = Math.sin(t * Math.PI * 2) * 40 + 80; // Simulated extra urban
            curvePoints.push(new THREE.Vector3(time * 0.01, speed * 0.02, 0));
            time += 4;
        }

        const curveGeometry = new THREE.BufferGeometry().setFromPoints(curvePoints);
        const curveMaterial = new THREE.LineBasicMaterial({
            color: 0x00f3ff,
            linewidth: 3
        });
        const curve = new THREE.Line(curveGeometry, curveMaterial);
        nedcGroup.add(curve);

        // Add phase markers
        nedcPhases.forEach((phase, index) => {
            const markerGeometry = new THREE.SphereGeometry(0.1, 16, 16);
            const markerMaterial = new THREE.MeshBasicMaterial({
                color: index === 0 ? 0x00f3ff : 0xbc13fe
            });
            const marker = new THREE.Mesh(markerGeometry, markerMaterial);
            marker.position.set(index * 2, 0.5, 0);
            nedcGroup.add(marker);
        });

        // Add tolerance band visualization
        const toleranceGeometry = new THREE.PlaneGeometry(6, 3);
        const toleranceMaterial = new THREE.MeshBasicMaterial({
            color: 0x0f0,
            transparent: true,
            opacity: 0.1,
            side: THREE.DoubleSide
        });
        const tolerancePlane = new THREE.Mesh(toleranceGeometry, toleranceMaterial);
        tolerancePlane.rotation.x = -Math.PI / 2;
        tolerancePlane.position.set(3, 0, -0.1);
        nedcGroup.add(tolerancePlane);

        this.scene.add(nedcGroup);
        this.nedcGroup = nedcGroup;
    }

    createMisfireVisualization() {
        // Create a 3D misfire detection visualization
        const misfireGroup = new THREE.Group();

        // Engine cylinders in a row
        const cylinders = [];
        for (let i = 0; i < 4; i++) {
            const cylinderGroup = new THREE.Group();

            // Cylinder body
            const bodyGeometry = new THREE.CylinderGeometry(0.2, 0.2, 0.6, 16);
            const bodyMaterial = new THREE.MeshStandardMaterial({
                color: 0x333333,
                metalness: 0.8,
                roughness: 0.2
            });
            const body = new THREE.Mesh(bodyGeometry, bodyMaterial);
            body.rotation.x = Math.PI / 2;
            cylinderGroup.add(body);

            // Combustion indicator (top)
            const isMisfiring = i === 2; // Cylinder 3 misfiring
            const indicatorGeometry = new THREE.SphereGeometry(0.15, 16, 16);
            const indicatorMaterial = new THREE.MeshBasicMaterial({
                color: isMisfiring ? 0xff2a2a : 0x0f0,
                emissive: isMisfiring ? 0xff2a2a : 0x0f0,
                emissiveIntensity: isMisfiring ? 1 : 0.5,
                transparent: true,
                opacity: 0.8
            });
            const indicator = new THREE.Mesh(indicatorGeometry, indicatorMaterial);
            indicator.position.set(0, 0.35, 0);
            cylinderGroup.add(indicator);

            // Misfire detection waveform
            const waveformPoints = [];
            for (let j = 0; j < 50; j++) {
                const x = j * 0.02;
                const y = isMisfiring 
                    ? Math.sin(j * 0.3) * 0.3 + (Math.random() - 0.5) * 0.2 // Irregular pattern
                    : Math.sin(j * 0.3) * 0.2; // Regular pattern
                waveformPoints.push(new THREE.Vector3(x, y - 0.5, 0));
            }
            const waveformGeometry = new THREE.BufferGeometry().setFromPoints(waveformPoints);
            const waveformMaterial = new THREE.LineBasicMaterial({
                color: isMisfiring ? 0xff2a2a : 0x00f3ff,
                linewidth: 2
            });
            const waveform = new THREE.Line(waveformGeometry, waveformMaterial);
            waveform.position.set(-0.5, -0.8, 0);
            cylinderGroup.add(waveform);

            cylinderGroup.position.set((i - 1.5) * 0.8, 0, 0);
            cylinders.push(cylinderGroup);
            misfireGroup.add(cylinderGroup);
        }

        // CSVA analysis visualization (3D surface)
        const csvaPoints = [];
        for (let i = 0; i < 20; i++) {
            for (let j = 0; j < 20; j++) {
                const x = (i / 20) * 2 - 1;
                const z = (j / 20) * 2 - 1;
                const y = Math.sin(i * 0.5) * Math.cos(j * 0.5) * 0.3;
                csvaPoints.push(new THREE.Vector3(x, y, z));
            }
        }
        const csvaGeometry = new THREE.BufferGeometry().setFromPoints(csvaPoints);
        const csvaMaterial = new THREE.PointsMaterial({
            color: 0xff2a2a,
            size: 0.05,
            transparent: true,
            opacity: 0.6
        });
        const csvaPointsMesh = new THREE.Points(csvaGeometry, csvaMaterial);
        csvaPointsMesh.position.set(0, -1.5, 0);
        misfireGroup.add(csvaPointsMesh);

        this.scene.add(misfireGroup);
        this.misfireGroup = misfireGroup;
    }

    createDefaultVisualization() {
        // Default 3D visualization
        const geometry = new THREE.BoxGeometry(1, 1, 1);
        const material = new THREE.MeshStandardMaterial({
            color: 0x00f3ff,
            emissive: 0x00f3ff,
            emissiveIntensity: 0.3
        });
        const cube = new THREE.Mesh(geometry, material);
        this.scene.add(cube);
        this.defaultMesh = cube;
    }

    animate() {
        if (!this.isInitialized) return;

        this.animationId = requestAnimationFrame(() => this.animate());

        // Rotate camera around scene
        const time = Date.now() * 0.0005;
        this.camera.position.x = Math.cos(time) * 5;
        this.camera.position.z = Math.sin(time) * 5;
        this.camera.lookAt(0, 0, 0);

        // Animate specific elements
        if (this.faultIndicator) {
            this.faultIndicator.scale.setScalar(1 + Math.sin(time * 5) * 0.3);
            this.faultIndicator.rotation.y += 0.02;
        }

        if (this.engineGroup) {
            this.engineGroup.rotation.y += 0.005;
        }

        if (this.dfcGroup) {
            this.dfcGroup.rotation.y += 0.01;
        }

        if (this.nedcGroup) {
            this.nedcGroup.rotation.y += 0.005;
        }

        if (this.misfireGroup) {
            this.misfireGroup.rotation.y += 0.005;
        }

        if (this.defaultMesh) {
            this.defaultMesh.rotation.x += 0.01;
            this.defaultMesh.rotation.y += 0.01;
        }

        this.renderer.render(this.scene, this.camera);
    }

    onResize() {
        if (!this.isInitialized) return;

        let width = this.container.clientWidth;
        let height = this.container.clientHeight;
        
        if (width === 0) width = 600;
        if (height === 0) height = 400;

        this.camera.aspect = width / height;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(width, height);
    }

    dispose() {
        if (this.animationId) {
            cancelAnimationFrame(this.animationId);
        }

        if (this.renderer) {
            this.renderer.dispose();
        }

        // Clean up geometries and materials
        this.scene.traverse((object) => {
            if (object.geometry) object.geometry.dispose();
            if (object.material) {
                if (Array.isArray(object.material)) {
                    object.material.forEach(mat => mat.dispose());
                } else {
                    object.material.dispose();
                }
            }
        });
    }
}

// Export
if (typeof module !== 'undefined' && module.exports) {
    module.exports = CaseStudy3D;
}
window.CaseStudy3D = CaseStudy3D;

