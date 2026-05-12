"use client";

import { useEffect, useState } from "react";
import { Service } from "@/types";
import Link from "next/link";
import Image from "next/image";

export default function ServicesPage() {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        setLoading(true);
        const response = await fetch("/api/services");
        const data = await response.json();

        if (data.success) {
          setServices(data.data);
        } else {
          setError(data.error || "Failed to fetch services");
        }
      } catch (err) {
        setError("Failed to load services");
        console.error("Error fetching services:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 overflow-x-hidden">
      {/* Hero Section */}
      <div className="bg-linear-to-r from-blue-600 to-blue-800 text-white py-8 sm:py-16 overflow-hidden">
        <div className="container mx-auto px-4 text-center max-w-full">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold mb-4 wrap-break-word overflow-wrap-anywhere">
            Our Services
          </h1>
          <p className="text-xl sm:text-2xl lg:text-3xl font-bengali mb-4 wrap-break-word overflow-wrap-anywhere">
            আমাদের সেবাসমূহ
          </p>
          <p className="text-sm sm:text-base lg:text-lg text-blue-100 max-w-2xl mx-auto wrap-break-word leading-relaxed overflow-wrap-anywhere">
            Comprehensive eye care services with state-of-the-art technology and
            expert medical professionals dedicated to your vision health.
          </p>
          <p className="text-xs sm:text-sm lg:text-base font-bengali text-blue-100 mt-2 wrap-break-word leading-relaxed overflow-wrap-anywhere">
            অত্যাধুনিক প্রযুক্তি এবং বিশেষজ্ঞ চিকিৎসা পেশাদারদের সাথে ব্যাপক
            চক্ষু পরিচর্যা সেবা।
          </p>
        </div>
      </div>

      {/* Services Content */}
      <div className="container mx-auto px-4 py-8 sm:py-16 max-w-full overflow-hidden">
        {/* Loading State */}
        {loading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-8">
            {[1, 2, 3, 4, 5, 6].map((n) => (
              <div
                key={n}
                className="bg-white rounded-xl p-4 sm:p-8 shadow-lg animate-pulse overflow-hidden"
              >
                <div className="w-20 h-20 bg-gray-200 rounded mb-6 mx-auto"></div>
                <div className="space-y-3">
                  <div className="h-6 bg-gray-200 rounded w-3/4 mx-auto"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/2 mx-auto"></div>
                  <div className="h-4 bg-gray-200 rounded"></div>
                  <div className="h-4 bg-gray-200 rounded"></div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Error State */}
        {error && !loading && (
          <div className="text-center py-12 sm:py-20 overflow-hidden">
            <div className="text-4xl sm:text-6xl mb-4 sm:mb-6">⚠️</div>
            <div className="text-red-600 text-lg sm:text-xl mb-4 wrap-break-word overflow-wrap-anywhere">
              {error}
            </div>
            <button
              onClick={() => window.location.reload()}
              className="bg-blue-600 text-white px-4 sm:px-8 py-3 rounded-lg hover:bg-blue-700 transition wrap-break-word overflow-wrap-anywhere"
            >
              Try Again
            </button>
          </div>
        )}

        {/* Empty State */}
        {!loading && !error && services.length === 0 && (
          <div className="text-center py-12 sm:py-20 overflow-hidden">
            <div className="text-6xl sm:text-8xl mb-4 sm:mb-6">🏥</div>
            <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-2 wrap-break-word overflow-wrap-anywhere">
              No Services Available
            </h2>
            <p className="text-gray-600 wrap-break-word overflow-wrap-anywhere">
              Please check back later for our services
            </p>
          </div>
        )}

        {/* Services Grid */}
        {!loading && !error && services.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-8">
            {services.map((service, index) => (
              <div
                key={(service as any)._id || service.id || index}
                className="bg-white rounded-xl p-4 sm:p-8 shadow-lg hover:shadow-2xl transition-all transform hover:-translate-y-2 overflow-hidden"
              >
                <div className="mb-3 md:mb-4 flex">
                  {service.image &&
                  (service.image.startsWith("http") ||
                    service.image.includes(".")) ? (
                    <div className="w-16 h-16 md:w-20 md:h-20 relative rounded-lg overflow-hidden bg-gray-100">
                      <Image
                        src={service.image}
                        alt={service.title}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 64px, 80px"
                      />
                    </div>
                  ) : (
                    <div className="text-3xl md:text-4xl lg:text-5xl">
                      {service.image || "🏥"}
                    </div>
                  )}
                </div>
                <h2 className="text-2xl sm:text-xl lg:text-2xl font-bold text-gray-800 mb-3 text-center wrap-break-word overflow-wrap-anywhere">
                  {service.title}
                </h2>
                <p className="text-xl sm:text-lg font-bengali text-blue-600 font-semibold mb-4 text-center wrap-break-word overflow-wrap-anywhere">
                  {service.titleBn}
                </p>
                <p className="text-gray-600 mb-3 leading-relaxed wrap-break-word overflow-wrap-anywhere">
                  {service.description}
                </p>
                <p className="text-gray-600 font-bengali leading-relaxed wrap-break-word overflow-wrap-anywhere">
                  {service.descriptionBn}
                </p>

                {/* Dynamic Benefits Section */}
                {/* {service.benefits && service.benefits.length > 0 && (
                  <div className="mt-4 sm:mt-6 pt-4 sm:pt-6 border-t border-gray-200 overflow-hidden">
                    <h3 className="text-sm font-semibold text-gray-800 mb-2 wrap-break-word overflow-wrap-anywhere">Key Benefits:</h3>
                    <ul className="space-y-2">
                      {service.benefits.map((benefit, benefitIndex) => (
                        <li key={benefitIndex} className="flex items-start gap-2 text-sm text-gray-600">
                          <span className="text-green-500 mt-1 shrink-0">✓</span>
                          <span className="wrap-break-word overflow-wrap-anywhere">{benefit}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )} */}
              </div>
            ))}
          </div>
        )}

        {/* Why Choose Us Section */}
        {!loading && !error && services.length > 0 && (
          <div className="mt-12 sm:mt-20 bg-white rounded-2xl p-6 sm:p-12 shadow-lg overflow-hidden">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-4 sm:mb-6 text-center wrap-break-word overflow-wrap-anywhere">
              Why Choose Our Services?
            </h2>
            <p className="text-lg sm:text-xl font-bengali text-gray-700 mb-6 sm:mb-8 text-center wrap-break-word overflow-wrap-anywhere">
              কেন আমাদের সেবা বেছে নেবেন?
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mt-6 sm:mt-8">
              <div className="text-center p-4 sm:p-6 bg-blue-50 rounded-xl overflow-hidden">
                <div className="text-3xl sm:text-4xl mb-3">🏆</div>
                <h3 className="text-base sm:text-lg font-bold text-gray-800 mb-2 wrap-break-word overflow-wrap-anywhere">
                  Excellence
                </h3>
                <p className="text-sm text-gray-600 wrap-break-word overflow-wrap-anywhere">
                  Highest quality care standards
                </p>
              </div>
              <div className="text-center p-4 sm:p-6 bg-green-50 rounded-xl overflow-hidden">
                <div className="text-3xl sm:text-4xl mb-3">⚡</div>
                <h3 className="text-base sm:text-lg font-bold text-gray-800 mb-2 wrap-break-word overflow-wrap-anywhere">
                  Fast Service
                </h3>
                <p className="text-sm text-gray-600 wrap-break-word overflow-wrap-anywhere">
                  Quick diagnosis and treatment
                </p>
              </div>
              <div className="text-center p-4 sm:p-6 bg-purple-50 rounded-xl overflow-hidden">
                <div className="text-3xl sm:text-4xl mb-3">💰</div>
                <h3 className="text-base sm:text-lg font-bold text-gray-800 mb-2 wrap-break-word overflow-wrap-anywhere">
                  Affordable
                </h3>
                <p className="text-sm text-gray-600 wrap-break-word overflow-wrap-anywhere">
                  Transparent and fair pricing
                </p>
              </div>
              <div className="text-center p-4 sm:p-6 bg-orange-50 rounded-xl overflow-hidden">
                <div className="text-3xl sm:text-4xl mb-3">🤝</div>
                <h3 className="text-base sm:text-lg font-bold text-gray-800 mb-2 wrap-break-word overflow-wrap-anywhere">
                  Care & Support
                </h3>
                <p className="text-sm text-gray-600 wrap-break-word overflow-wrap-anywhere">
                  Compassionate patient care
                </p>
              </div>
            </div>
          </div>
        )}

        {/* CTA Section */}
        {!loading && !error && services.length > 0 && (
          <div className="text-center mt-8 sm:mt-16 overflow-hidden">
            <h3 className="text-xl sm:text-2xl font-bold text-gray-800 mb-4 wrap-break-word overflow-wrap-anywhere">
              Ready to Get Started?
            </h3>
            <p className="text-base sm:text-lg font-bengali text-gray-700 mb-4 sm:mb-6 wrap-break-word overflow-wrap-anywhere">
              আজই আপনার অ্যাপয়েন্টমেন্ট বুক করুন
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="tel:+8801700000000"
                className="bg-blue-600 text-white px-4 sm:px-8 py-3 sm:py-4 rounded-lg hover:bg-blue-700 transition-all shadow-lg hover:shadow-xl font-medium text-base sm:text-lg wrap-break-word overflow-wrap-anywhere"
              >
                <span className="font-bengali ml-2">
                  📞 অ্যাপয়েন্টমেন্ট বুক করুন
                </span>
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
