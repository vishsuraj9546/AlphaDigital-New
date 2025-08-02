'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Orbitron } from 'next/font/google';
import { Menu, X } from 'lucide-react'; // ✅ Icons for hamburger

// ✅ Load Orbitron font for logo
const orbitron = Orbitron({
  subsets: ['latin'],
  weight: ['600', '700', '800'],
});

export default function Header() {
  const [activeSection, setActiveSection] = useState('hero');
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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
      setIsMenuOpen(false); // ✅ Close menu on click (for mobile)
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-black/80 backdrop-blur-md' : 'bg-transparent'
      }`}
    >
      <div className="px-6 py-4 flex items-center justify-between">
        
        {/* ✅ Logo */}
        <div className={`flex items-center space-x-2 ${orbitron.className}`}>
          <Image src="/icon.png" alt="AlphaDigital Logo" width={40} height={40} className="rounded-full" />
          <Link href="/" className="text-2xl font-bold text-white hover:text-purple-400 transition-colors">
            AlphaDigital
          </Link>
        </div>

        {/* ✅ Desktop Menu */}
        <nav className="hidden md:flex items-center space-x-8">
          {[
            { id: 'about', label: 'ABOUT' },
            { id: 'services', label: 'SERVICES' },
            { id: 'portfolio', label: 'PORTFOLIO' },
            { id: 'contact', label: 'CONTACT' },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              className={`text-sm font-bold tracking-widest transition-all duration-300 hover:text-purple-400 ${
                activeSection === item.id ? 'text-purple-400' : 'text-white/70'
              }`}
            >
              {item.label}
            </button>
          ))}
          <Link
            href="/careers"
            className="text-sm font-bold tracking-widest hover:text-purple-400 text-white/70"
          >
            CAREERS
          </Link>
        </nav>

        {/* ✅ Mobile Hamburger Button */}
        <button
          className="md:hidden text-white focus:outline-none"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* ✅ Mobile Dropdown Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-black/90 backdrop-blur-md px-6 py-4 space-y-4">
          {[
            { id: 'about', label: 'ABOUT' },
            { id: 'services', label: 'SERVICES' },
            { id: 'portfolio', label: 'PORTFOLIO' },
            { id: 'contact', label: 'CONTACT' },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              className={`block w-full text-left text-lg font-bold py-2 px-2 rounded-lg hover:bg-purple-500/20 transition ${
                activeSection === item.id ? 'text-purple-400' : 'text-white/80'
              }`}
            >
              {item.label}
            </button>
          ))}
          <Link
            href="/careers"
            onClick={() => setIsMenuOpen(false)}
            className="block text-lg font-bold py-2 px-2 rounded-lg hover:bg-purple-500/20 transition text-white/80"
          >
            CAREERS
          </Link>
        </div>
      )}
    </header>
  );
}
