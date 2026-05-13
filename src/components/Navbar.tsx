'use client';

import React, { useState, useCallback } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  const navLinks = [
    { href: '/#home', label: 'Home' },
    { href: '/#about', label: 'About' },
    { href: '/#services', label: 'Services' },
    { href: '/#doctors', label: 'Doctors' },
    { href: '/#gallery', label: 'Gallery' },
    { href: '/#contact', label: 'Contact' },
  ];

  const handleNavClick = useCallback((e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    // Only intercept if already on the home page
    if (pathname === '/') {
      const hash = href.replace('/', '');
      const element = document.querySelector(hash);
      if (element) {
        e.preventDefault();
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
    // Otherwise let default navigation to /#section work
  }, [pathname]);

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-3 md:py-4">

          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 md:gap-3">
            <div className="w-8 h-8 md:w-12 md:h-12 relative shrink-0">
              <Image
                src="/images/logo/tdecc_logo_withoutBG.png"
                alt="Logo"
                fill
                className="object-contain"
                priority
              />
            </div>

            <div>
              <h1 className="text-sm md:text-xl font-bold text-black leading-tight break-words line-clamp-2">
                Trishal{' '}
                <span className="text-blue-600">
                  Diagnostic and Eye Care Center
                </span>
              </h1>
              <p className="text-xs md:text-base text-gray-600 font-bengali font-bold break-words line-clamp-1">
                ত্রিশাল ডায়াগনস্টিক এন্ড আই কেয়ার সেন্টার
              </p>
            </div>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="text-gray-700 hover:text-blue-600 transition font-medium"
              >
                {link.label}
              </a>
            ))}

            <a
              href="tel:+8801797408590"
              className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 transition font-medium"
            >
              📞 অ্যাপয়েন্টমেন্ট
            </a>
          </div>

          {/* Mobile Button */}
          <button
            className="md:hidden text-gray-700 text-2xl"
            onClick={() => setIsMenuOpen(true)}
            aria-label="Toggle menu"
          >
            ☰
          </button>
        </div>
      </div>

      {/* Overlay */}
      <div
        className={`fixed inset-0 bg-black/30 transition-opacity duration-300 md:hidden ${
          isMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
        }`}
        onClick={() => setIsMenuOpen(false)}
      />

      {/* Right Drawer */}
      <div
        className={`fixed top-0 right-0 h-full w-72 bg-white shadow-lg transform transition-transform duration-300 md:hidden z-50
        ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}
      >
        <div className="p-5 flex justify-between items-center border-b">
          <h2 className="font-semibold text-lg">Menu</h2>
          <button onClick={() => setIsMenuOpen(false)} className="text-xl">
            ✕
          </button>
        </div>

        <div className="flex flex-col p-5 gap-4 text-center">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-gray-700 hover:text-blue-600 font-medium"
              onClick={(e) => {
                handleNavClick(e, link.href);
                setIsMenuOpen(false);
              }}
            >
              {link.label}
            </a>
          ))}

          <a
            href="tel:+8801797408590"
            className="mt-4 bg-blue-600 text-white py-3 rounded-lg text-center font-medium hover:bg-blue-700"
            onClick={() => setIsMenuOpen(false)}
          >
            📞 অ্যাপয়েন্টমেন্ট
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;