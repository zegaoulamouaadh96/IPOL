'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Hide cursor on touch devices
    if (window.matchMedia('(pointer: coarse)').matches) {
      return;
    }

    setIsVisible(true);

    const dot = dotRef.current;
    const ring = ringRef.current;

    if (!dot || !ring) return;

    // Center the custom cursor elements
    gsap.set(dot, { xPercent: -50, yPercent: -50, x: window.innerWidth / 2, y: window.innerHeight / 2 });
    gsap.set(ring, { xPercent: -50, yPercent: -50, x: window.innerWidth / 2, y: window.innerHeight / 2 });

    // Set up quickTo functions for smooth movement
    const dotX = gsap.quickTo(dot, 'x', { duration: 0.08, ease: 'power3.out' });
    const dotY = gsap.quickTo(dot, 'y', { duration: 0.08, ease: 'power3.out' });

    const ringX = gsap.quickTo(ring, 'x', { duration: 0.3, ease: 'power3.out' });
    const ringY = gsap.quickTo(ring, 'y', { duration: 0.3, ease: 'power3.out' });

    const handleMouseMove = (e: MouseEvent) => {
      dotX(e.clientX);
      dotY(e.clientY);

      ringX(e.clientX);
      ringY(e.clientY);
    };

    const handleMouseLeave = () => {
      gsap.to([dot, ring], { opacity: 0, duration: 0.2 });
    };

    const handleMouseEnter = () => {
      gsap.to([dot, ring], { opacity: 1, duration: 0.2 });
    };

    // Global event listeners
    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    // Hover effect on links/buttons
    const handleLinkHover = () => {
      gsap.to(ring, { scale: 1.5, borderColor: 'var(--cursor-color, #C8A96E)', backgroundColor: 'var(--cursor-color-alpha, rgba(200, 169, 110, 0.1))', duration: 0.3 });
      gsap.to(dot, { scale: 0.5, backgroundColor: 'var(--cursor-color, #C8A96E)', duration: 0.3 });
    };

    const handleLinkLeave = () => {
      gsap.to(ring, { scale: 1, borderColor: '#FFFFFF', backgroundColor: 'transparent', duration: 0.3 });
      gsap.to(dot, { scale: 1, backgroundColor: 'var(--cursor-color, #C8A96E)', duration: 0.3 });
    };

    const addHoverListeners = () => {
      const interactiveElements = document.querySelectorAll('a, button, select, input, textarea, [role="button"], .interactive-hover');
      interactiveElements.forEach((el) => {
        el.addEventListener('mouseenter', handleLinkHover);
        el.addEventListener('mouseleave', handleLinkLeave);
      });
    };

    addHoverListeners();

    // Re-bind hover listeners occasionally for dynamically rendered elements
    const observer = new MutationObserver(addHoverListeners);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
      observer.disconnect();

      const interactiveElements = document.querySelectorAll('a, button, select, input, textarea, [role="button"], .interactive-hover');
      interactiveElements.forEach((el) => {
        el.removeEventListener('mouseenter', handleLinkHover);
        el.removeEventListener('mouseleave', handleLinkLeave);
      });
    };
  }, []);

  if (!isVisible) return null;

  return (
    <>
      {/* Inner Dot */}
      <div
        ref={dotRef}
        className="fixed top-0 left-0 w-3 h-3 rounded-full pointer-events-none z-[99999] mix-blend-difference"
        style={{ backgroundColor: 'var(--cursor-color, #C8A96E)' }}
      />
      {/* Follower Ring */}
      <div
        ref={ringRef}
        className="fixed top-0 left-0 w-10 h-10 border border-white rounded-full pointer-events-none z-[99999] mix-blend-difference"
      />
    </>
  );
}
