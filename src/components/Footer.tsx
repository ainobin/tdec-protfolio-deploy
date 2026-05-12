'use client';

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Service } from "@/types";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const [services, setServices] = useState<Service[]>([]);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await fetch('/api/services');
        const data = await response.json();
        if (data.success && data.data) {
          setServices(data.data.slice(0, 6));
        }
      } catch (error) {
        console.error('Error fetching services for footer:', error);
      }
    };
    fetchServices();
  }, []);

  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-12">

        {/* Main Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">

          {/* About */}
          <div className="sm:col-span-2 lg:col-span-1 text-center md:text-left">
            <div className="flex flex-col md:flex-row items-center md:items-start gap-3 mb-4">
              <div className="w-12 h-12 md:w-14 md:h-14 bg-white rounded-full relative shrink-0">
                <Image
                  src="/images/logo/tdecc_logo_withoutBG.png"
                  alt="Trishal DECC Logo"
                  fill
                  className="object-contain p-1"
                />
              </div>

              <div>
                <h3 className="text-lg md:text-xl font-bold leading-tight break-words line-clamp-2">
                  Trishal Diagnostic and Eye Care Center
                </h3>
                <p className="text-sm font-bengali text-gray-400 break-words line-clamp-2">
                  ত্রিশাল ডায়াগনস্টিক এবং আই কেয়ার সেন্টার
                </p>
              </div>
            </div>

            <p className="text-gray-400 text-sm leading-relaxed mb-5 text-center md:text-left break-words line-clamp-3">
              Your trusted partner for comprehensive eye care and diagnostic
              services in Trishal.
            </p>
          </div>

          {/* Quick Links */}
          <div className="text-center md:text-left">
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              {["home", "about", "services", "doctors", "gallery", "contact"].map(
                (item) => (
                  <li key={item}>
                    <a
                      href={`/#${item}`}
                      className="text-gray-400 hover:text-white transition"
                    >
                      {item.charAt(0).toUpperCase() + item.slice(1)}
                    </a>
                  </li>
                )
              )}
            </ul>
          </div>

          {/* Services - Dynamic */}
          <div className="text-center md:text-left">
            <h4 className="text-lg font-semibold mb-4">Our Services</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              {services.length > 0 ? (
                services.map((service) => (
                  <li key={service.id || (service as any)._id}>
                    <Link
                      href="/services"
                      className="hover:text-white transition"
                    >
                      {service.title}
                    </Link>
                  </li>
                ))
              ) : (
                <>
                  <li className="bg-gray-800 rounded h-4 w-3/4 animate-pulse"></li>
                  <li className="bg-gray-800 rounded h-4 w-2/3 animate-pulse"></li>
                  <li className="bg-gray-800 rounded h-4 w-3/4 animate-pulse"></li>
                  <li className="bg-gray-800 rounded h-4 w-1/2 animate-pulse"></li>
                </>
              )}
            </ul>
          </div>

          {/* Contact */}
          <div className="text-center md:text-left">
            <h4 className="text-lg font-semibold mb-4">Contact Info</h4>

            <ul className="space-y-3 text-sm">

              <li className="flex flex-col md:flex-row md:items-start gap-1 md:gap-2">
                <span>📍</span>
                <span className="text-gray-400 leading-relaxed break-words">
                  Trishal Sadar, Mymensingh
                  <br />
                  <span className="font-bengali break-words">
                    ত্রিশাল সদর, ময়মনসিংহ
                  </span>
                </span>
              </li>

              <li className="flex flex-col md:flex-row md:items-start gap-1 md:gap-2">
                <span>📞</span>
                <div className="text-gray-400">
                  <div>+880 1700-000000</div>
                  <div>+880 1800-000000</div>
                </div>
              </li>

              <li className="flex flex-col md:flex-row md:items-start gap-1 md:gap-2">
                <span>📧</span>
                <span className="text-gray-400 break-all">
                  info@trishaldecc.com
                </span>
              </li>

              <li className="flex flex-col md:flex-row md:items-start gap-1 md:gap-2">
                <span>⏰</span>
                <span className="text-gray-400">
                  Sat–Thu: 9AM – 9PM
                  <br />
                  <span className="font-bengali">
                    শনি–বৃহঃ: ৯AM – ৯PM
                  </span>
                </span>
              </li>

            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-10 pt-6 flex flex-col md:flex-row items-center justify-between gap-3 text-center md:text-left">
          <p className="text-gray-400 text-sm">
            <span className="font-bengali">
              © {currentYear} ত্রিশাল ডায়াগনস্টিক এবং আই কেয়ার সেন্টার। সর্বস্বত্ব সংরক্ষিত।
            </span>
          </p>

          <p className="text-sm flex flex-wrap items-center gap-1 justify-center md:justify-end">
            Developed by
            <span className="text-gray-400">•</span>
            <Link
              href="https://www.siriuslabltd.com/"
              className="text-blue-500 hover:text-blue-400 font-semibold transition"
              target="_blank"
              rel="noopener noreferrer"
            >
              Sirius Lab
            </Link>
          </p>
        </div>
      </div>

      {/* Emergency Banner */}
      <div className="bg-red-600 py-3 text-center">
        <div className="container mx-auto px-4">
          <p className="text-white font-semibold text-xs sm:text-sm md:text-base leading-relaxed">
            🚨 24/7 Emergency Eye Care: +880 1700-000000 |
            <span className="font-bengali ml-1">
              জরুরী সেবা: +৮৮০ ১৭০০-০০০০০০
            </span>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;