'use client';

import React, { useEffect, useState } from 'react';
import { Service } from '@/types';
import Link from 'next/link';
import Image from 'next/image';

interface ServicesProps {
  limit?: number;
  initialData?: Service[];
}

const Services: React.FC<ServicesProps> = ({ limit, initialData }) => {
  const [services, setServices] = useState<Service[]>(
    initialData ? (limit ? initialData.slice(0, limit) : initialData) : [],
  );
  const [loading, setLoading] = useState(initialData === undefined);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (initialData !== undefined) {
      setServices(limit ? initialData.slice(0, limit) : initialData);
      return;
    }

    const fetchServices = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await fetch('/api/services', { cache: 'no-store' });
        const data = await response.json();
        
        if (data.success) {
          const servicesList = limit ? data.data.slice(0, limit) : data.data;
          setServices(servicesList);
        } else {
          setError(data.error || 'Failed to fetch services');
        }
      } catch (err) {
        setError('Failed to load services');
        console.error('Error fetching services:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, [initialData, limit]);

  return (
    <section id="services" className="p-1 md:p-42 bg-gray-50 overflow-hidden">
      <div className="container mx-auto px-4 max-w-full">
        {/* Section Header */}
        <div className="text-center mb-8 md:mb-12 overflow-hidden">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800 mb-3 md:mb-4 wrap-break-word overflow-wrap-anywhere">Our Services</h2>
          <p className="text-lg sm:text-xl md:text-2xl font-bengali text-gray-700 mb-3 md:mb-4 wrap-break-word overflow-wrap-anywhere">আমাদের সেবাসমূহ</p>
          <p className="text-sm md:text-base lg:text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed wrap-break-word overflow-wrap-anywhere">
            We offer complete diagnostic services with modern equipment and experienced professionals.
          </p>
          <p className="text-sm md:text-base lg:text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed wrap-break-word overflow-wrap-anywhere">
            আমরা আধুনিক যন্ত্রপাতি ও অভিজ্ঞ টেকনেশিয়ানের মাধ্যমে ডায়াগনস্টিক সেবা প্রদান করি।
          </p>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {[1, 2, 3, 4].map((n) => (
              <div key={n} className="bg-white rounded-xl p-4 md:p-6 shadow-md animate-pulse overflow-hidden">
                <div className="w-12 h-12 md:w-16 md:h-16 bg-gray-200 rounded mb-3 md:mb-4"></div>
                <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                <div className="h-3 bg-gray-200 rounded w-1/2 mb-2 md:mb-3"></div>
                <div className="h-3 bg-gray-200 rounded w-full mb-2"></div>
                <div className="h-3 bg-gray-200 rounded w-full"></div>
              </div>
            ))}
          </div>
        )}

        {/* Error State */}
        {error && !loading && (
          <div className="text-center py-8 md:py-12 overflow-hidden">
            <div className="text-red-600 text-base md:text-lg mb-4 wrap-break-word overflow-wrap-anywhere">{error}</div>
            <button 
              onClick={() => window.location.reload()} 
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition min-h-11 wrap-break-word overflow-wrap-anywhere"
            >
              Try Again
            </button>
          </div>
        )}

        {/* Empty State */}
        {!loading && !error && services.length === 0 && (
          <div className="text-center py-8 md:py-12 overflow-hidden">
            <div className="text-4xl md:text-6xl mb-4">🏥</div>
            <p className="text-lg md:text-xl text-gray-600 wrap-break-word overflow-wrap-anywhere">No services available</p>
            <p className="text-gray-500 wrap-break-word overflow-wrap-anywhere">Please check back later</p>
          </div>
        )}

        {/* Services Grid */}
        {!loading && !error && services.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {services.map((service, index) => (
              <div
              key={(service as any)._id || service.id || index}
              className="bg-white rounded-xl p-4 md:p-6 shadow-md hover:shadow-xl transition transform hover:-translate-y-2 overflow-hidden"
              >
                <div className="mb-3 md:mb-4 flex">
                  {service.image && (service.image.startsWith('http') || service.image.includes('.')) ? (
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
                    <div className="text-3xl md:text-4xl lg:text-5xl">{service.image || '🏥'}</div>
                  )}
                </div>
                <h3 className="text-lg md:text-xl font-bold text-gray-800 mb-2 leading-tight wrap-break-word overflow-wrap-anywhere">{service.title}</h3>
                <p className="text-sm md:text-base font-bengali text-blue-600 font-semibold mb-2 md:mb-3 leading-tight wrap-break-word overflow-wrap-anywhere">
                  {service.titleBn}
                </p>
                <p 
                  className="text-gray-600 text-xs md:text-sm mb-2 leading-relaxed"
                  style={{
                    display: '-webkit-box',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    lineHeight: '1.4'
                  }}
                >
                  {service.description}
                </p>
                <p 
                  className="text-gray-600 text-xs md:text-sm font-bengali leading-relaxed"
                  style={{
                    display: '-webkit-box',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    lineHeight: '1.4'
                  }}
                >
                  {service.descriptionBn}
                </p>
              </div>
            ))}
          </div>
        )}

        {/* CTA */}
        {!loading && !error && services.length > 0 && limit && (
          <div className="text-center mt-8 md:mt-12 overflow-hidden">
            <Link
              href="/services"
              className="inline-flex items-center gap-2 bg-blue-600 text-white px-6 md:px-8 py-3 md:py-4 rounded-lg hover:bg-blue-700 transition-all shadow-lg hover:shadow-xl font-medium text-base md:text-lg min-h-12 wrap-break-word overflow-wrap-anywhere"
            >
              <span className="font-bengali">আরও দেখুন</span>
              <svg
                className="w-5 h-5 shrink-0"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </Link>
          </div>
        )}
      </div>
    </section>
  );
};

export default Services;