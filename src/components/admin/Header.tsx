"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

interface HeaderProps {
  onMenuClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ onMenuClick }) => {
  const router = useRouter();
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
    router.push("/admin/login");
  };

  return (
    <header className="bg-white shadow-md sticky top-0 z-30">
      <div className="flex items-center justify-between px-4 sm:px-6 lg:px-8 py-3 sm:py-4">
        {/* Mobile Menu Button + Title */}
        <div className="flex items-center gap-3 sm:gap-4 min-w-0 flex-1">
          {/* Hamburger Menu - Only visible on mobile */}
          <button
            onClick={onMenuClick}
            className="lg:hidden flex items-center justify-center w-8 h-8 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
            aria-label="Open navigation menu"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>

          {/* Page Title */}
          <div className="min-w-0 flex-1">
            <h1 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-800 truncate">
              Admin Dashboard
            </h1>
            <p className="text-xs sm:text-sm text-gray-600 hidden sm:block">
              Manage your clinic&apos;s content
            </p>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2 sm:gap-4 shrink-0">
          {/* Logout */}
          <button
            onClick={() => {
              const confirmed = window.confirm(
                "Are you sure you want to logout?",
              );
              if (confirmed) {
                handleLogout(); // call your existing logout function
              }
            }}
            className="px-3 py-1.5 sm:px-4 sm:py-2 cursor-pointer bg-red-600 text-white rounded-lg hover:bg-red-700 transition text-xs sm:text-sm font-medium"
          >
            <span className="hidden sm:inline">Logout</span>
            <span className="sm:hidden">Exit</span>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
