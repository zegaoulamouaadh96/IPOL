'use client';

import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function EarthGlobe() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    // 1. SCENE SETUP
    const scene = new THREE.Scene();
    
    // 2. CAMERA SETUP
    const width = container.clientWidth;
    const height = container.clientHeight;
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.z = 6;

    // 3. RENDERER SETUP
    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // 4. GROUPS
    const globeGroup = new THREE.Group();
    scene.add(globeGroup);

    // 5. LIGHTING
    // Ambient light with emerald/green tint
    const ambientLight = new THREE.AmbientLight('#064e3b', 1.2);
    scene.add(ambientLight);

    // Main sun light (directional)
    const sunLight = new THREE.DirectionalLight('#ffffff', 2.0);
    sunLight.position.set(5, 3, 5);
    scene.add(sunLight);

    // Subtle blue/green rim light from back-left
    const rimLight = new THREE.DirectionalLight('#047857', 1.5);
    rimLight.position.set(-5, -3, -5);
    scene.add(rimLight);

    // 6. PROCEDURAL TEXTURE GENERATION (FALLBACK)
    // Generates a high-tech dotted grid texture if image loading fails
    const createFallbackTexture = () => {
      const canvasTex = document.createElement('canvas');
      canvasTex.width = 1024;
      canvasTex.height = 512;
      const ctx = canvasTex.getContext('2d');
      if (ctx) {
        // Deep space green ocean background
        ctx.fillStyle = '#022c22';
        ctx.fillRect(0, 0, canvasTex.width, canvasTex.height);
        
        // Draw grid lines
        ctx.strokeStyle = 'rgba(16, 185, 129, 0.15)';
        ctx.lineWidth = 1;
        const gridCols = 36;
        const gridRows = 18;
        
        for (let i = 0; i <= gridCols; i++) {
          const x = (i / gridCols) * canvasTex.width;
          ctx.beginPath();
          ctx.moveTo(x, 0);
          ctx.lineTo(x, canvasTex.height);
          ctx.stroke();
        }
        for (let i = 0; i <= gridRows; i++) {
          const y = (i / gridRows) * canvasTex.height;
          ctx.beginPath();
          ctx.moveTo(0, y);
          ctx.lineTo(canvasTex.width, y);
          ctx.stroke();
        }

        // Draw dotted continents
        ctx.fillStyle = '#10b981';
        // Add random clusters of dots to simulate islands/continents
        for (let i = 0; i < 2500; i++) {
          const x = Math.random() * canvasTex.width;
          const y = Math.random() * canvasTex.height;
          // Shape clusters in specific bands to look land-like
          const noiseValue = Math.sin(x * 0.01) * Math.cos(y * 0.01) + Math.sin(x * 0.005) * Math.sin(y * 0.02);
          if (noiseValue > -0.2) {
            ctx.beginPath();
            ctx.arc(x, y, 1.5 + Math.random() * 2, 0, Math.PI * 2);
            ctx.fill();
          }
        }
      }
      return new THREE.CanvasTexture(canvasTex);
    };

    // 7. TEXTURES LOADING
    const textureLoader = new THREE.TextureLoader();
    let earthTexture: THREE.Texture;
    let cloudsTexture: THREE.Texture;

    // Load Earth Texture
    earthTexture = textureLoader.load(
      'https://raw.githubusercontent.com/mrdoob/three.js/dev/examples/textures/planets/earth_atmos_2048.jpg',
      (texture) => {
        texture.colorSpace = THREE.SRGBColorSpace;
      },
      undefined,
      () => {
        // Fallback on error
        earthTexture = createFallbackTexture();
        if (earthMaterial) earthMaterial.map = earthTexture;
      }
    );

    // Load Cloud Texture
    cloudsTexture = textureLoader.load(
      'https://raw.githubusercontent.com/mrdoob/three.js/dev/examples/textures/planets/earth_clouds_1024.png',
      undefined,
      undefined,
      () => {
        // Fallback clouds (empty transparent texture)
        const emptyCanvas = document.createElement('canvas');
        emptyCanvas.width = 128;
        emptyCanvas.height = 128;
        cloudsTexture = new THREE.CanvasTexture(emptyCanvas);
        if (cloudsMaterial) cloudsMaterial.map = cloudsTexture;
      }
    );

    // 8. EARTH SPHERE
    const earthGeo = new THREE.SphereGeometry(2.0, 64, 64);
    const earthMaterial = new THREE.MeshStandardMaterial({
      map: earthTexture,
      roughness: 0.8,
      metalness: 0.1,
      bumpScale: 0.05,
    });
    const earthMesh = new THREE.Mesh(earthGeo, earthMaterial);
    globeGroup.add(earthMesh);

    // 9. CLOUDS SPHERE
    const cloudsGeo = new THREE.SphereGeometry(2.03, 64, 64);
    const cloudsMaterial = new THREE.MeshStandardMaterial({
      map: cloudsTexture,
      transparent: true,
      opacity: 0.35,
      blending: THREE.AdditiveBlending,
    });
    const cloudsMesh = new THREE.Mesh(cloudsGeo, cloudsMaterial);
    globeGroup.add(cloudsMesh);

    // 10. ATMOSPHERE GLOW
    // Custom Fresnel Shader for glowing halo
    const atmosphereGeo = new THREE.SphereGeometry(2.18, 64, 64);
    const atmosphereMaterial = new THREE.ShaderMaterial({
      vertexShader: `
        varying vec3 vNormal;
        varying vec3 vEyeVector;
        void main() {
          vNormal = normalize(normalMatrix * normal);
          vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
          vEyeVector = normalize(-mvPosition.xyz);
          gl_Position = projectionMatrix * mvPosition;
        }
      `,
      fragmentShader: `
        varying vec3 vNormal;
        varying vec3 vEyeVector;
        uniform vec3 color;
        void main() {
          // Fresnel calculation: glow is brighter at the edges
          float intensity = pow(0.68 - dot(vNormal, vEyeVector), 2.5);
          gl_FragColor = vec4(color, 1.0) * intensity;
        }
      `,
      uniforms: {
        color: { value: new THREE.Color('#10b981') }, // Vibrant Emerald Green Glow
      },
      blending: THREE.AdditiveBlending,
      side: THREE.BackSide,
      transparent: true,
    });
    const atmosphereMesh = new THREE.Mesh(atmosphereGeo, atmosphereMaterial);
    globeGroup.add(atmosphereMesh);

    // 11. SPACE STARFIELD (BACKGROUND PARTICLES)
    const starsCount = 400;
    const starsGeo = new THREE.BufferGeometry();
    const starsPos = new Float32Array(starsCount * 3);
    for (let i = 0; i < starsCount * 3; i += 3) {
      // Position particles randomly in a sphere around the scene
      const u = Math.random();
      const v = Math.random();
      const theta = u * 2.0 * Math.PI;
      const phi = Math.acos(2.0 * v - 1.0);
      const r = 8 + Math.random() * 8; // distance between 8 and 16 units
      starsPos[i] = r * Math.sin(phi) * Math.cos(theta);
      starsPos[i + 1] = r * Math.sin(phi) * Math.sin(theta);
      starsPos[i + 2] = r * Math.cos(phi);
    }
    starsGeo.setAttribute('position', new THREE.BufferAttribute(starsPos, 3));
    const starsMaterial = new THREE.PointsMaterial({
      color: '#10b981',
      size: 0.025,
      transparent: true,
      opacity: 0.6,
      blending: THREE.AdditiveBlending,
    });
    const starField = new THREE.Points(starsGeo, starsMaterial);
    scene.add(starField);

    // 12. ROTATION & INTERACTION STATE
    let isDragging = false;
    let previousPointerX = 0;
    let previousPointerY = 0;
    
    // Target rotations for smooth damping/inertia
    let targetRotationX = 0.4; // Slightly tilted Earth
    let targetRotationY = 0;
    
    // Current rotations
    let rotationX = 0.4;
    let rotationY = 0;

    // Handle Pointer Down
    const handlePointerDown = (e: PointerEvent) => {
      isDragging = true;
      previousPointerX = e.clientX;
      previousPointerY = e.clientY;
    };

    // Handle Pointer Move
    const handlePointerMove = (e: PointerEvent) => {
      if (!isDragging) return;
      const deltaX = e.clientX - previousPointerX;
      const deltaY = e.clientY - previousPointerY;
      
      previousPointerX = e.clientX;
      previousPointerY = e.clientY;

      // Update target rotations based on drag delta
      targetRotationY += deltaX * 0.005;
      targetRotationX += deltaY * 0.005;

      // Clamp vertical rotation to avoid flipping upside down
      targetRotationX = Math.max(-Math.PI / 2.5, Math.min(Math.PI / 2.5, targetRotationX));
    };

    // Handle Pointer Up/Leave
    const handlePointerUp = () => {
      isDragging = false;
    };

    // Add pointer events
    canvas.addEventListener('pointerdown', handlePointerDown);
    window.addEventListener('pointermove', handlePointerMove);
    window.addEventListener('pointerup', handlePointerUp);

    // 13. ANIMATION LOOP
    let animationFrameId: number;

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      // Auto rotation when not dragging
      if (!isDragging) {
        targetRotationY += 0.0012; // slow drift
      }

      // Smooth interpolation (damping) for inertia
      rotationX += (targetRotationX - rotationX) * 0.07;
      rotationY += (targetRotationY - rotationY) * 0.07;

      // Apply rotations
      earthMesh.rotation.y = rotationY;
      earthMesh.rotation.x = rotationX;

      // Clouds rotate slightly faster for dynamic effect
      cloudsMesh.rotation.y = rotationY * 1.15;
      cloudsMesh.rotation.x = rotationX;

      // Rotate starfield slowly in reverse for depth
      starField.rotation.y = -rotationY * 0.08;

      renderer.render(scene, camera);
    };

    animate();

    // 14. RESIZE HANDLER
    const handleResize = () => {
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    const resizeObserver = new ResizeObserver(() => {
      handleResize();
    });
    resizeObserver.observe(container);

    // 15. CLEANUP
    return () => {
      canvas.removeEventListener('pointerdown', handlePointerDown);
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerup', handlePointerUp);
      resizeObserver.disconnect();
      cancelAnimationFrame(animationFrameId);
      
      // Dispose geometries & materials to avoid memory leaks
      earthGeo.dispose();
      earthMaterial.dispose();
      cloudsGeo.dispose();
      cloudsMaterial.dispose();
      atmosphereGeo.dispose();
      atmosphereMaterial.dispose();
      starsGeo.dispose();
      starsMaterial.dispose();
      
      if (earthTexture instanceof THREE.Texture) earthTexture.dispose();
      if (cloudsTexture instanceof THREE.Texture) cloudsTexture.dispose();
      
      renderer.dispose();
    };
  }, []);

  return (
    <div ref={containerRef} className="w-full h-full relative overflow-hidden">
      <canvas ref={canvasRef} className="w-full h-full block cursor-grab active:cursor-grabbing" />
    </div>
  );
}
