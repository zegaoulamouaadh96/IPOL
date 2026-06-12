'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import {
  Sparkles,
  Phone,
  Wand2,
  BookOpen,
  ArrowRight,
  Twitter,
  Linkedin,
  Instagram,
  Menu,
} from 'lucide-react';
import heroFlowers from '@/assets/hero-flowers.png';
import EarthGlobe from '@/components/three/EarthGlobe';

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="bloom-theme relative w-full min-h-screen overflow-x-hidden bg-black text-white selection:bg-white/25 selection:text-white">
      {/* Background Ambient Glows (from logo colors) */}
      <div className="bg-glow-blue" />
      <div className="bg-glow-red" />
      
      {/* 1. 3D EARTH BACKGROUND */}
      <div className="fixed inset-0 w-full h-full z-0 opacity-90 lg:left-[52%] lg:w-[48%] pointer-events-none lg:pointer-events-auto">
        <EarthGlobe />
      </div>

      {/* 2. TWO-PANEL SPLIT CONTENT */}
      <div className="relative z-10 flex flex-col lg:flex-row min-h-screen w-full pointer-events-none">
        
        {/* ================= LEFT PANEL (52%) ================= */}
        <div className="relative w-full lg:w-[52%] min-h-[100svh] lg:min-h-screen p-4 lg:p-6 flex flex-col pointer-events-auto">
          
          {/* White Content Backdrop */}
          <div className="absolute inset-4 lg:inset-6 bg-white/95 backdrop-blur-md z-0 rounded-3xl shadow-xl border border-neutral-100" />

          {/* Left Panel Content Wrapper */}
          <div className="relative z-10 flex flex-col justify-between flex-1 p-6 lg:p-8 h-full pointer-events-auto">
            
            {/* Top Navigation */}
            <header className="flex justify-between items-center w-full">
              {/* Logo & Brand */}
              <div className="flex items-center select-none hover:scale-105 transition-transform duration-300">
                <div className="h-12 w-36 relative">
                  <Image
                    src="/logo.png"
                    alt="IPOL Logo"
                    fill
                    className="object-contain object-left"
                  />
                </div>
              </div>

              {/* Menu Button */}
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className="border border-neutral-300 bg-neutral-50 flex items-center gap-2 px-4 py-2 text-sm text-neutral-800 rounded-lg hover:scale-105 transition-transform duration-300 cursor-none hover-glow-red"
              >
                <span>Menu</span>
                <Menu className="w-4 h-4 text-neutral-800" />
              </button>
            </header>

            {/* Mobile Dropdown (Visible on click) */}
            {menuOpen && (
              <div className="absolute top-20 right-6 left-6 bg-white/95 border border-neutral-200 shadow-xl p-6 rounded-2xl z-50 flex flex-col gap-4 select-none animate-in fade-in slide-in-from-top-4 duration-300">
                <a href="#gallery" className="text-neutral-800 hover:text-black hover:font-semibold transition-all cursor-none text-sm font-medium">accueil</a>
                <a href="#generation" className="text-neutral-800 hover:text-black hover:font-semibold transition-all cursor-none text-sm font-medium">About</a>
                <a href="#structures" className="text-neutral-800 hover:text-black hover:font-semibold transition-all cursor-none text-sm font-medium">Services</a>
                <a href="#ecosystem" className="text-neutral-800 hover:text-black hover:font-semibold transition-all cursor-none text-sm font-medium">contact</a>
              </div>
            )}

            {/* Hero Center */}
            <main className="flex-1 flex flex-col justify-center items-center text-center my-12 lg:my-0 select-none">
              {/* H1 Heading */}
              <h1 className="text-4xl lg:text-5xl font-medium tracking-[-0.03em] text-neutral-900 leading-[1.15] max-w-xl mb-8">
                Company Overview <br />
                <em className="font-serif italic text-neutral-600"> a dynamic and forward-thinking international freight forwarding company committed to delivering excellence in global transport and logistics solutions.</em> <span className="text-[#ef4444] font-semibold">IPOL</span> <span className="text-[#3b82f6] font-semibold">Logistics</span>
              </h1>

              {/* CTA Explore Button */}
              <button className="bg-black text-white hover:bg-neutral-800 hover:scale-105 active:scale-95 transition-transform duration-300 rounded-full px-6 py-3 flex items-center gap-3.5 mb-8 cursor-none hover-glow-gradient">
                <span className="text-sm font-medium tracking-wide">
                  Connect
                </span>
                <div className="w-7 h-7 rounded-full bg-white/20 flex items-center justify-center">
                  <Phone className="w-3.5 h-3.5 text-white" />
                </div>
              </button>

              {/* Three Pills */}
              <div className="flex flex-wrap justify-center gap-3">
                <span className="border border-neutral-200 bg-neutral-50/50 rounded-lg px-4 py-1.5 text-xs text-neutral-700 tracking-wide select-none hover:scale-105 transition-transform duration-300 hover-glow-blue">
                 Freight
                </span>
                <span className="border border-neutral-200 bg-neutral-50/50 rounded-lg px-4 py-1.5 text-xs text-neutral-700 tracking-wide select-none hover:scale-105 transition-transform duration-300 hover-glow-red">
                  Logistics
                </span>
                <span className="border border-neutral-200 bg-neutral-50/50 rounded-lg px-4 py-1.5 text-xs text-neutral-700 tracking-wide select-none hover:scale-105 transition-transform duration-300 hover-glow-gradient">
                  Customs clearance
                </span>
              </div>
            </main>

            {/* Bottom Quote Panel */}
            <footer className="w-full flex flex-col items-center">
              {/* Quote Text */}
              <p className="text-base lg:text-lg text-neutral-700 max-w-md text-center leading-relaxed mb-4 font-light select-none">
               <span className="text-[#ef4444] font-medium">IPOL</span> <span className="text-[#3b82f6] font-medium">Logistics</span> <span className="font-serif italic text-neutral-500"> is everywhere, at your service</span>.
              </p>

              {/* Author Row with Lines */}
              <div className="flex items-center gap-4 w-full max-w-xs select-none">
                <div className="flex-1 h-[1.2px] bg-neutral-200" />
                <span className="text-[10px] tracking-[0.25em] text-neutral-400 font-semibold uppercase">
                  Company Overview
                </span>
                <div className="flex-1 h-[1.2px] bg-neutral-200" />
              </div>
            </footer>

          </div>
        </div>

        {/* ================= RIGHT PANEL (48% - Desktop Only) ================= */}
        <div className="hidden lg:flex w-[48%] min-h-screen p-4 lg:p-6 flex-col justify-between select-none pointer-events-none">
          
          {/* Top Bar (Socials & Account) */}
          <div className="flex justify-between items-center w-full z-20 pointer-events-auto">
            {/* Social Icons Pill */}
            <div className="liquid-glass flex items-center gap-3.5 pl-4 pr-2.5 py-1.5">
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noreferrer"
                className="text-white hover:text-white/80 hover:scale-105 transition-all cursor-none"
              >
                <Twitter className="w-4 h-4" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                className="text-white hover:text-white/80 hover:scale-105 transition-all cursor-none"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="text-white hover:text-white/80 hover:scale-105 transition-all cursor-none"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <div className="w-[1.2px] h-3.5 bg-white/15 mx-1" />
              <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:scale-105 active:scale-95 transition-transform cursor-none">
                <ArrowRight className="w-4 h-4 text-white" />
              </div>
            </div>

            {/* Account CTA Button */}
            <button className="liquid-glass flex items-center gap-2.5 px-4 py-2 text-sm text-white/90 hover:scale-105 transition-transform duration-300 cursor-none hover-glow-blue">
              <Sparkles className="w-4 h-4 text-white" />
              <span>Connect</span>
            </button>
          </div>

          {/* Middle Community Ecosystem Card */}
          <div className="liquid-glass p-5 rounded-2xl w-56 ml-auto mt-24 mr-2 hover:scale-105 transition-transform duration-300 shadow-sm z-20 pointer-events-auto hover-glow-blue">
            <h4 className="text-xs font-semibold text-white mb-2 uppercase tracking-wider">
              Services
            </h4>
            <p className="text-[11px] text-white/60 leading-relaxed font-light">
              Tailor-made logistics solutions.
            </p>
          </div>

          {/* Bottom Features Overlay Container */}
          <div className="mt-auto w-full z-20 pointer-events-auto">
            <div className="liquid-glass p-6 rounded-[2.5rem] flex flex-col gap-5">
              
              {/* Row 1: Processing & Growth Archive side-by-side */}
              <div className="grid grid-cols-2 gap-4">
                {/* Processing Card */}
                <div className="liquid-glass p-5 rounded-3xl hover:scale-105 transition-transform duration-300 hover-glow-red">
                  <div className="w-8 h-8 rounded-full bg-[#ef4444]/20 flex items-center justify-center mb-4">
                    <Wand2 className="w-4 h-4 text-[#ef4444]" />
                  </div>
                  <h5 className="text-sm font-medium text-white mb-1.5">
                   Freight
                  </h5>
                  <p className="text-[11px] text-white/50 leading-relaxed font-light">
                   Ocean freight , air freight & road tansport. Read more...
                  </p>
                </div>

                {/* Growth Archive Card */}
                <div className="liquid-glass p-5 rounded-3xl hover:scale-105 transition-transform duration-300 hover-glow-blue">
                  <div className="w-8 h-8 rounded-full bg-[#3b82f6]/20 flex items-center justify-center mb-4">
                    <BookOpen className="w-4 h-4 text-[#3b82f6]" />
                  </div>
                  <h5 className="text-sm font-medium text-white mb-1.5">
                    Logistique
                  </h5>
                  <p className="text-[11px] text-white/50 leading-relaxed font-light">
                   Supply chain management.
                  </p>
                </div>
              </div>

              {/* Row 2: Advanced Plant Sculpting Banner */}
              <div className="liquid-glass p-4 rounded-3xl flex items-center justify-between gap-4 hover:scale-105 transition-transform duration-300 hover-glow-gradient">
                <div className="flex items-center gap-4">
                  {/* Thumbnail Image */}
                  <div className="liquid-glass w-24 h-16 relative overflow-hidden hover:scale-105 transition-transform duration-300">
                    <Image
                      src={heroFlowers}
                      alt="Advanced Plant Sculpting Preview"
                      fill
                      className="object-cover"
                    />
                  </div>
                  {/* Copy */}
                  <div>
                    <h5 className="text-xs font-semibold text-[#ef4444] uppercase tracking-widest mb-1.5">
                     Customs clearance
                    </h5>
                    <h4 className="text-sm font-medium text-white">
                     Customer-tailored solutions, read more...
                    </h4>
                    
                  </div>
                </div>

                {/* Action Circle Button */}
                <button className="liquid-glass w-8 h-8 rounded-full flex items-center justify-center hover:scale-105 active:scale-95 transition-transform cursor-none hover-glow-red">
                  <span className="text-white text-lg leading-none font-light">
                    +
                  </span>
                </button>
              </div>

            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
