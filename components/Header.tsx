'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Orbitron } from 'next/font/google';  // ✅ Unique font import

// ✅ Orbitron font load
const orbitron = Orbitron({
  subsets: ['latin'],
  weight: ['600', '700', '800'],  
});

export default function Header() {
  const [activeSection, setActiveSection] = useState('hero');
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);

      const sections = ['alphadigital', 'about', 'services', 'portfolio', 'contact'];
      const currentSection = sections.find(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });

      if (currentSection) {
        setActiveSection(currentSection);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      {/* ✅ HEADER */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled ? 'bg-black/80 backdrop-blur-md' : 'bg-transparent'
        }`}
      >
        <div className="px-6 py-4 md:px-8 md:py-6">
          <nav className="flex items-center justify-between">

            {/* ✅ COMPANY LOGO */}
            <Link href="/" className="flex items-center space-x-3">
              {/* ✅ Logo in Circle */}
              <div className="relative w-12 h-12 rounded-full border-2 border-purple-400 p-1 hover:scale-110 hover:shadow-[0_0_15px_rgba(168,85,247,0.6)] transition-all duration-300">
                <Image
                  src="/icon.png"   // ✅ apni logo image yahan dalna
                  alt="AlphaDigital Logo"
                  fill
                  className="object-cover rounded-full"
                />
              </div>

              {/* ✅ Company name (optional hide on mobile) */}
              <span className={`hidden sm:block text-2xl font-bold text-white ${orbitron.className}`}>
                AlphaDigital
              </span>
            </Link>

            {/* ✅ NAVIGATION LINKS */}
            <div className="hidden md:flex items-center space-x-8">
              {[
                { id: 'about', label: 'ABOUT' },
                { id: 'services', label: 'SERVICES' },
                { id: 'portfolio', label: 'PORTFOLIO' },
                { id: 'contact', label: 'CONTACT' },
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`text-sm font-bold tracking-widest transition-all duration-300 hover:text-purple-400 cursor-pointer whitespace-nowrap ${
                    activeSection === item.id ? 'text-purple-400' : 'text-white/70'
                  }`}
                >
                  {item.label}
                </button>
              ))}

              <Link
                href="/careers"
                className="text-sm font-bold tracking-widest transition-all duration-300 hover:text-purple-400 cursor-pointer whitespace-nowrap text-white/70"
              >
                CAREERS
              </Link>
            </div>

            {/* ✅ Start Project Button */}
            <button
              onClick={() => scrollToSection('contact')}
              className="hidden sm:block bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-2 rounded-full text-sm font-bold tracking-wide hover:shadow-lg hover:shadow-purple-500/25 transition-all duration-300 cursor-pointer whitespace-nowrap"
            >
              START PROJECT
            </button>
          </nav>
        </div>
      </header>

      {/* ✅ MOBILE NAV (optional toggle later add karenge) */}
      <div className="md:hidden fixed top-20 right-5 bg-black/90 rounded-xl shadow-lg p-3 space-y-3">
        {['about', 'services', 'portfolio', 'contact'].map((item) => (
          <button
            key={item}
            onClick={() => scrollToSection(item)}
            className="block w-full text-left text-white/80 hover:text-purple-400 transition"
          >
            {item.toUpperCase()}
          </button>
        ))}
        <Link
          href="/careers"
          className="block text-white/80 hover:text-purple-400 transition"
        >
          CAREERS
        </Link>
      </div>
    </>
  );
}
