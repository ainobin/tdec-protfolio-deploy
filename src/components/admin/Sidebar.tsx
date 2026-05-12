"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  const pathname = usePathname();

  const menuItems = [
    { icon: "📊", label: "Dashboard", href: "/admin" },
    { icon: "👨‍⚕️", label: "Doctors", href: "/admin/doctors" },
    { icon: "🏥", label: "Services", href: "/admin/services" },
    { icon: "🖼️", label: "Gallery", href: "/admin/gallery" },
    { icon: "🎠", label: "Carousel", href: "/admin/carousel" },
    { icon: "📢", label: "Pop-Up Ads", href: "/admin/ads" },
    // { icon: "⚙️", label: "Settings", href: "/admin/settings" },
  ];

  const handleLinkClick = () => {
    // Close sidebar on mobile when a link is clicked
    if (window.innerWidth < 1024) {
      onClose();
    }
  };

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}
      
      {/* Sidebar */}
      <div className={`
        fixed lg:sticky top-0 left-0 z-50 
        w-64 bg-gray-900 text-white min-h-screen flex flex-col
        transform transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        {/* Logo */}
        <div className="p-4 sm:p-6 border-b border-gray-700">
          <Link href="/admin" className="flex items-center gap-2 sm:gap-3" onClick={handleLinkClick}>
            <div className="w-10 h-10 sm:w-14 sm:h-14 bg-white rounded-full flex items-center justify-center text-xl font-bold">
              <div className="w-10 h-10 sm:w-14 sm:h-14 relative">
                <Image
                  src="/images/logo/tdecc_logo_withoutBG.png"
                  alt="Trishal DECC Logo"
                  fill
                  className="object-contain"
                  priority
                />
              </div>
            </div>
            <div className="min-w-0 flex-1">
              <h1 className="text-sm sm:text-lg font-bold truncate">Trishal DECC</h1>
              <p className="text-xs text-gray-400">Admin Panel</p>
            </div>
          </Link>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-3 sm:p-4">
          <ul className="space-y-1 sm:space-y-2">
            {menuItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={handleLinkClick}
                    className={`flex items-center gap-2 sm:gap-3 px-3 sm:px-4 py-2 sm:py-3 rounded-lg transition-all ${
                      isActive
                        ? "bg-blue-600 text-white shadow-lg"
                        : "text-gray-300 hover:bg-gray-800 hover:text-white"
                    }`}
                  >
                    <span className="text-lg sm:text-xl shrink-0">{item.icon}</span>
                    <span className="font-medium text-sm sm:text-base truncate">{item.label}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Footer */}
        <div className="p-3 sm:p-4 border-t border-gray-700">
          <Link
            href="/"
            onClick={handleLinkClick}
            className="flex items-center gap-2 px-3 sm:px-4 py-2 text-gray-400 hover:text-white transition rounded-lg"
          >
            <span className="shrink-0">🏠</span>
            <span className="text-xs sm:text-sm truncate">Back to Website</span>
          </Link>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
