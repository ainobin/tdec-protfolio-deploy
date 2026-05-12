import React from 'react';

const TopBar = () => {
  return (
    <div className="bg-blue-600 text-white py-2 text-xs md:text-sm">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center gap-2">
          <div className="flex flex-wrap items-center gap-3 md:gap-4 justify-center md:justify-start">
            <a href="tel:+8801700000000" className="flex items-center gap-1 md:gap-2 hover:text-blue-200 transition wrap-break-word">
              <span>📞</span>
              <span className="whitespace-nowrap">Emergency: +880 1700-000000</span>
            </a>
            <div className="flex items-center gap-1 md:gap-2">
              <span>⏰</span>
              <span className="whitespace-nowrap">Sat-Thu: 9AM-9PM</span>
            </div>
          </div>
          <div className="flex items-center gap-1 md:gap-2 wrap-break-word">
            <span>📍</span>
            <span className="whitespace-nowrap">Trishal, Mymensingh</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopBar;
