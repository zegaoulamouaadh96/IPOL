# Walkthrough - Bloom AI Landing Page & IPOL Backup

We have successfully built and integrated the new full-screen hero landing page for **Bloom** (an AI-powered plant/floral design platform) at the home route `/`, and preserved the **IPOL Logistics** redesign at `/ipol`.

## Core Features & Styling Highlights

1. **Autoplay Video Background**:
   - Integrated the high-definition looping muted video background using the HTML `<video>` element styled with `absolute inset-0 object-cover z-0` to fill the viewport.
   - All content is layered above it at `z-10`.

2. **Scoped Typography & Grayscale Palette**:
   - Added links for **Poppins** (Display/Body) and **Source Serif 4** (Serif accent for italics) inside [layout.tsx](file:///c:/Users/ADMIN/Desktop/IPOL/ipol-website/app/layout.tsx).
   - Scoped the font selectors and grayscale variables under a `.bloom-theme` block inside [globals.css](file:///c:/Users/ADMIN/Desktop/IPOL/ipol-website/app/globals.css) to prevent style conflicts with the IPOL page.

3. **Liquid Glass Components**:
   - Implemented Tailwind v4 component utilities inside `globals.css`:
     - `.liquid-glass` (light blur): `backdrop-filter: blur(4px)`, luminosity blend mode, and a pseudo-element border using `linear-gradient` masked via `-webkit-mask-composite: xor`.
     - `.liquid-glass-strong` (heavy blur): `backdrop-filter: blur(50px)` for CTA buttons and left-panel overlays.

4. **Split Panel Layout**:
   - **Left Panel (52% width)**:
     - Includes a `liquid-glass-strong` rounded-3xl backdrop overlay.
     - Brand nav featuring the custom generated plant [logo.png](file:///c:/Users/ADMIN/Desktop/IPOL/ipol-website/public/logo.png) (32x32) on the left, and a "Menu" pill button on the right.
     - Hero header: Large logo (80x80), H1 header using serif-italic accents, magnetic "Explore Now" CTA button, and three category pills.
     - Footer quote: Visionary design label, italic quote spans, and author "Marcus Aurelio" centered between dividers.
   - **Right Panel (48% width - Desktop Only)**:
     - Top navigation containing social icon links (Twitter, LinkedIn, Instagram) in a liquid-glass container.
     - Dynamic cards: "Enter our ecosystem" info panel, Wand2 icon-decorated "Processing" card, BookOpen icon-decorated "Growth Archive" card, and a bottom banner featuring the custom generated glassmorphic [hero-flowers.png](file:///c:/Users/ADMIN/Desktop/IPOL/ipol-website/public/hero-flowers.png) thumbnail.

5. **IPOL Logistics Routing Preservation**:
   - Moved the previous homepage implementation to `/ipol` (housed at [app/ipol/page.tsx](file:///c:/Users/ADMIN/Desktop/IPOL/ipol-website/app/ipol/page.tsx)), ensuring the logistics design is preserved and fully functional.

## Verification Details

- **Compilation Status**: Verified using a clean `npm run build` after removing cache, which compiled successfully:
  ```bash
  ✓ Compiled successfully in 5.2s
  ✓ Generating static pages (6/6)
  Finalizing page optimization ...
  Collecting build traces ...
  Route (app)                                 Size  First Load JS
  ┌ ○ /                                    9.31 kB         112 kB
  ├ ○ /_not-found                            993 B         104 kB
  ├ ƒ /api/contact                           123 B         103 kB
  └ ○ /ipol                                34.3 kB         181 kB
  ```
- **Local Dev Server**: Restarted cleanly and listening on port 3000. Verified fast compile time (2.9s) on the main `/` route.
