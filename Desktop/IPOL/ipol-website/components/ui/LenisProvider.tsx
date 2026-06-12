'use client';

import { ReactLenis } from 'lenis/react';
import 'lenis/dist/lenis.css';
import { useEffect } from 'react';
import { gsap } from '@/lib/gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export default function LenisProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // Sync Lenis scroll updates with GSAP's ScrollTrigger
    const id = gsap.ticker.add((time) => {
      ScrollTrigger.update();
    });
    
    gsap.ticker.lagSmoothing(0);
    
    return () => {
      gsap.ticker.remove(id);
    };
  }, []);

  const lenisOptions = {
    lerp: 0.08,
    syncTouch: true,
    easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  };

  return (
    <ReactLenis root options={lenisOptions}>
      {children}
    </ReactLenis>
  );
}
