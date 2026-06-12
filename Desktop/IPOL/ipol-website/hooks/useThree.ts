'use client';

import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

export function useThree(containerRef: React.RefObject<HTMLDivElement | null>) {
  const [scene, setScene] = useState<THREE.Scene | null>(null);
  const [camera, setCamera] = useState<THREE.PerspectiveCamera | null>(null);
  const [renderer, setRenderer] = useState<THREE.WebGLRenderer | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const newScene = new THREE.Scene();
    const newCamera = new THREE.PerspectiveCamera(
      75,
      containerRef.current.clientWidth / containerRef.current.clientHeight,
      0.1,
      1000
    );
    const newRenderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });

    newRenderer.setSize(
      containerRef.current.clientWidth,
      containerRef.current.clientHeight
    );
    newRenderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    containerRef.current.appendChild(newRenderer.domElement);

    newCamera.position.z = 5;

    setScene(newScene);
    setCamera(newCamera);
    setRenderer(newRenderer);

    const handleResize = () => {
      if (!containerRef.current) return;
      newCamera.aspect =
        containerRef.current.clientWidth / containerRef.current.clientHeight;
      newCamera.updateProjectionMatrix();
      newRenderer.setSize(
        containerRef.current.clientWidth,
        containerRef.current.clientHeight
      );
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      newRenderer.dispose();
      if (containerRef.current && newRenderer.domElement) {
        containerRef.current.removeChild(newRenderer.domElement);
      }
    };
  }, [containerRef]);

  return { scene, camera, renderer };
}
