// Reusable 3D Components for VEHICLE-LAB
// 3D cards, buttons, and interactive elements

// THREE will be loaded from CDN

class ThreeComponents {
    static create3DCard(width = 2, height = 1.5, depth = 0.1) {
        const group = new THREE.Group();
        
        // Card geometry
        const geometry = new THREE.BoxGeometry(width, height, depth);
        const material = new THREE.MeshStandardMaterial({
            color: 0x050a14,
            transparent: true,
            opacity: 0.8,
            roughness: 0.5,
            metalness: 0.3
        });
        
        const card = new THREE.Mesh(geometry, material);
        group.add(card);
        
        // Border frame
        const edges = new THREE.EdgesGeometry(geometry);
        const lineMaterial = new THREE.LineBasicMaterial({
            color: 0x00f3ff,
            linewidth: 2
        });
        const wireframe = new THREE.LineSegments(edges, lineMaterial);
        group.add(wireframe);
        
        return group;
    }

    static create3DButton(radius = 0.3) {
        const group = new THREE.Group();
        
        // Button sphere
        const geometry = new THREE.SphereGeometry(radius, 32, 32);
        const material = new THREE.MeshStandardMaterial({
            color: 0x00f3ff,
            emissive: 0x00f3ff,
            emissiveIntensity: 0.5,
            transparent: true,
            opacity: 0.9
        });
        
        const button = new THREE.Mesh(geometry, material);
        group.add(button);
        
        // Glow effect
        const glowGeometry = new THREE.SphereGeometry(radius * 1.2, 32, 32);
        const glowMaterial = new THREE.MeshBasicMaterial({
            color: 0x00f3ff,
            transparent: true,
            opacity: 0.3
        });
        const glow = new THREE.Mesh(glowGeometry, glowMaterial);
        group.add(glow);
        
        return group;
    }

    static create3DText(text, size = 0.5) {
        // Note: This is a placeholder. For actual 3D text, you'd need TextGeometry
        // which requires loading fonts. For now, we'll create a simple representation.
        const group = new THREE.Group();
        
        // Create text representation with boxes (simplified)
        const textGeometry = new THREE.BoxGeometry(size * 0.3, size, size * 0.1);
        const textMaterial = new THREE.MeshStandardMaterial({
            color: 0x00f3ff,
            emissive: 0x00f3ff,
            emissiveIntensity: 0.3
        });
        
        // This is a simplified version - in production, use TextGeometry with loaded fonts
        for (let i = 0; i < text.length; i++) {
            const letter = new THREE.Mesh(textGeometry, textMaterial);
            letter.position.x = i * size * 0.4;
            group.add(letter);
        }
        
        return group;
    }

    static create3DGrid(width = 10, height = 10, divisions = 20) {
        const gridHelper = new THREE.GridHelper(width, divisions, 0x00f3ff, 0x00f3ff);
        gridHelper.material.opacity = 0.2;
        gridHelper.material.transparent = true;
        return gridHelper;
    }

    static create3DWireframeBox(size = 1) {
        const geometry = new THREE.BoxGeometry(size, size, size);
        const edges = new THREE.EdgesGeometry(geometry);
        const material = new THREE.LineBasicMaterial({
            color: 0x00f3ff,
            linewidth: 2
        });
        return new THREE.LineSegments(edges, material);
    }

    static createParticleTrail(count = 50) {
        const geometry = new THREE.BufferGeometry();
        const positions = new Float32Array(count * 3);
        
        for (let i = 0; i < count * 3; i += 3) {
            positions[i] = (Math.random() - 0.5) * 2;
            positions[i + 1] = (Math.random() - 0.5) * 2;
            positions[i + 2] = (Math.random() - 0.5) * 2;
        }
        
        geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        
        const material = new THREE.PointsMaterial({
            color: 0x00f3ff,
            size: 0.05,
            transparent: true,
            opacity: 0.6
        });
        
        return new THREE.Points(geometry, material);
    }
}

// Export for module or global
if (typeof module !== 'undefined' && module.exports) {
    module.exports = ThreeComponents;
}
window.ThreeComponents = ThreeComponents;

