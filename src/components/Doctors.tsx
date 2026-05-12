"use client";

import React, { useEffect, useState } from "react";
import { Doctor } from "@/types";
import Image from "next/image";
import Link from "next/link";

interface DoctorsProps {
  limit?: number;
  initialData?: Doctor[];
}

// Helper to safely format schedules
const getScheduleText = (doctor: any) => {
  const schedules = doctor.schedules || doctor.schedule || [];

  if (!Array.isArray(schedules) || schedules.length === 0) {
    return "No schedule available";
  }

  const first = schedules[0];

  // If backend sends string schedule
  if (typeof first === "string") {
    return schedules.length > 1 ? `${first} ...` : first;
  }

  // Object schedule
  const text = `${first.day}: ${first.startTime} - ${first.endTime}`;
  return schedules.length > 1 ? `${text} ...` : text;
};

const DoctorCard: React.FC<{ doctor: Doctor }> = ({ doctor }) => (
  <div className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition transform hover:-translate-y-2">
    {/* Doctor Image */}
    <div className="relative h-48 md:h-64 bg-linear-to-br from-blue-100 to-blue-200 flex items-center justify-center">
      {doctor.image ? (
        <Image
          src={doctor.image}
          alt={doctor.name}
          fill
          className="object-cover object-top"
        />
      ) : (
        <div className="text-6xl md:text-8xl">👨‍⚕️</div>
      )}
    </div>

    {/* Doctor Info */}
    <div className="p-4 md:p-6">
      <h3 className="text-lg md:text-xl font-bold text-gray-800 mb-1 leading-tight break-words line-clamp-2">
        {doctor.name}
      </h3>
      <p className="text-sm md:text-base font-bengali text-gray-700 mb-2 md:mb-3 leading-tight break-words line-clamp-2">
        {doctor.nameBn}
      </p>

      <div className="border-t border-gray-200 pt-2 md:pt-3 mb-2 md:mb-3">
        <p className="text-xs md:text-sm text-blue-600 font-semibold mb-1 leading-tight break-words line-clamp-2">
          {doctor.specialization}
        </p>
        <p className="text-xs md:text-sm text-gray-600 mb-1 md:mb-2 leading-tight break-words line-clamp-2">
          {doctor.qualification}
        </p>
      </div>

      {/* Schedule Section */}
      <div className="bg-blue-50 rounded-lg p-4">
        <h3 className="text-sm font-semibold mb-2 truncate">Schedule</h3>

        <div className="flex items-center gap-2 text-sm text-gray-700">
          <span>🕐</span>

          <span
            className="truncate flex-1"
            title={doctor.schedules
              ?.map((s: any) => `${s.day}: ${s.startTime} - ${s.endTime}`)
              .join(", ")}
          >
            {getScheduleText(doctor)}
          </span>
        </div>
      </div>

      {/* View Profile */}
      <Link
        href={`/doctors/${doctor.id}`}
        className="mt-3 md:mt-5 inline-flex w-full items-center justify-center gap-2
              bg-blue-600 text-white px-4 md:px-6 py-2.5 md:py-3 rounded-xl
              hover:bg-blue-700 hover:-translate-y-0.5
              transition-all duration-200
              shadow-md hover:shadow-lg
              font-semibold text-sm md:text-base
              focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2
              min-h-[44px]"
      >
        View Profile
        <span className="text-base md:text-lg">→</span>
      </Link>
    </div>
  </div>
);

const Doctors: React.FC<DoctorsProps> = ({ limit, initialData }) => {
  const [doctors, setDoctors] = useState<Doctor[]>(initialData ?? []);
  const [loading, setLoading] = useState(initialData === undefined);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (initialData !== undefined) {
      return;
    }

    const fetchDoctors = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await fetch("/api/doctors", { cache: "no-store" });
        const data = await response.json();

        if (data.success) {
          setDoctors(data.data);
        } else {
          setError(data.error || "Failed to fetch doctors");
        }
      } catch (err) {
        setError("Failed to load doctors");
        console.error("Error fetching doctors:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchDoctors();
  }, [initialData]);

  const featuredDoctor = doctors.find((d) => d.isFeatured);
  const regularDoctors = doctors.filter((d) => !d.isFeatured);
  const displayDoctors = limit
    ? regularDoctors.slice(0, limit - (featuredDoctor ? 1 : 0))
    : regularDoctors;

  return (
    <section
      id="doctors"
      className="py-12 md:py-20 bg-linear-to-br from-blue-50 to-white"
    >
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-8 md:mb-12">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800 mb-3 md:mb-4">
            Our Expert Doctors
          </h2>
          <p className="text-lg sm:text-xl md:text-2xl font-bengali text-gray-700 mb-3 md:mb-4">
            আমাদের বিশেষজ্ঞ ডাক্তারগণ
          </p>
          <p className="text-sm md:text-base lg:text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed break-words">
            Meet our team of highly qualified and experienced ophthalmologists
            dedicated to your eye health.
          </p>
          <p className="text-sm md:text-base lg:text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed break-words">
            আপনার চোখের সুস্বাস্থ্যের জন্য নিবেদিতপ্রাণ, আমাদের উচ্চ শিক্ষিত এবং
            অভিজ্ঞ চক্ষু বিশেষজ্ঞ দলের সাথে পরিচিত হন।
          </p>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 lg:gap-8">
            {[1, 2, 3, 4].map((n) => (
              <div
                key={n}
                className="bg-white rounded-xl overflow-hidden shadow-lg animate-pulse"
              >
                <div className="h-48 md:h-64 bg-gray-200"></div>
                <div className="p-4 md:p-6 space-y-2 md:space-y-3">
                  <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                  <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                  <div className="h-3 bg-gray-200 rounded w-full"></div>
                  <div className="h-3 bg-gray-200 rounded w-2/3"></div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Error State */}
        {error && !loading && (
          <div className="text-center py-8 md:py-12">
            <div className="text-red-600 text-base md:text-lg mb-4">
              {error}
            </div>
            <button
              onClick={() => window.location.reload()}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition min-h-[44px]"
            >
              Try Again
            </button>
          </div>
        )}

        {/* Empty State */}
        {!loading && !error && doctors.length === 0 && (
          <div className="text-center py-8 md:py-12">
            <div className="text-4xl md:text-6xl mb-4">👨‍⚕️</div>
            <p className="text-lg md:text-xl text-gray-600">No doctors found</p>
            <p className="text-gray-500">Please check back later</p>
          </div>
        )}

        {/* Doctors Content */}
        {!loading && !error && doctors.length > 0 && (
          <>
            {/* Featured Doctor */}
            {featuredDoctor && (
              <div className="mb-8 md:mb-12">
                <div className="bg-white rounded-2xl overflow-hidden shadow-xl border-2 border-blue-200 md:flex md:items-stretch">
                  {/* Featured Image */}
                  <div className="relative h-64 md:h-auto md:w-80 lg:w-96 bg-linear-to-br from-blue-100 to-blue-200 flex items-center justify-center shrink-0">
                    {featuredDoctor.image ? (
                      <Image
                        src={featuredDoctor.image}
                        alt={featuredDoctor.name}
                        fill
                        className="object-cover object-top"
                      />
                    ) : (
                      <div className="text-8xl">👨‍⚕️</div>
                    )}
                    <div className="absolute top-3 left-3 bg-yellow-400 text-yellow-900 px-3 py-1 rounded-full text-xs font-bold shadow">
                      ⭐ Featured
                    </div>
                  </div>

                  {/* Featured Info */}
                  <div className="p-6 md:p-8 flex flex-col justify-center flex-1">
                    <h3 className="text-2xl md:text-3xl font-bold text-gray-800 mb-1 break-words line-clamp-2">
                      {featuredDoctor.name}
                    </h3>
                    <p className="text-lg font-bengali text-gray-700 mb-3 break-words line-clamp-2">
                      {featuredDoctor.nameBn}
                    </p>

                    <div className="border-t border-gray-200 pt-3 mb-4">
                      <p className="text-base text-blue-600 font-semibold mb-1 break-words line-clamp-2">
                        {featuredDoctor.specialization}
                      </p>
                      <p className="text-sm font-bengali text-gray-600 mb-2 break-words line-clamp-1">
                        {featuredDoctor.specializationBn}
                      </p>
                      <p className="text-sm text-gray-700 font-medium break-words line-clamp-2">
                        {featuredDoctor.qualification}
                      </p>
                    </div>

                    {featuredDoctor.description && (
                      <p className="text-gray-600 text-sm leading-relaxed mb-4 break-words line-clamp-3">
                        {featuredDoctor.description}
                      </p>
                    )}

                    {/* Schedule Section */}
                    <div className="bg-blue-50 rounded-lg p-4">
                      <h3 className="text-sm font-semibold mb-2 truncate">
                        Schedule
                      </h3>

                      <div className="flex items-center gap-2 text-sm text-gray-700">
                        <span>🕐</span>

                        <span
                          className="truncate flex-1"
                          title={featuredDoctor.schedules
                            ?.map(
                              (s: any) =>
                                `${s.day}: ${s.startTime} - ${s.endTime}`,
                            )
                            .join(", ")}
                        >
                          {getScheduleText(featuredDoctor)}
                        </span>
                      </div>
                    </div>
                    
                    <br />

                    <Link
                      href={`/doctors/${featuredDoctor.id}`}
                      className="inline-flex w-fit items-center gap-2
                            bg-blue-600 text-white px-6 py-3 rounded-xl
                            hover:bg-blue-700 hover:-translate-y-0.5
                            transition-all duration-200
                            shadow-md hover:shadow-lg
                            font-semibold text-base
                            focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2
                            min-h-11"
                    >
                      View Profile
                      <span className="text-lg">→</span>
                    </Link>
                  </div>
                </div>
              </div>
            )}

            {/* Regular Doctors Grid */}
            {displayDoctors.length > 0 && (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6 lg:gap-8">
                {displayDoctors.map((doctor) => (
                  <DoctorCard key={doctor.id} doctor={doctor} />
                ))}
              </div>
            )}
          </>
        )}

        {/* CTA */}
        {!loading && !error && doctors.length > 0 && limit && (
          <div className="text-center mt-8 md:mt-12">
            <Link
              href="/doctors"
              className="inline-flex items-center gap-2 bg-blue-600 text-white px-6 md:px-8 py-3 md:py-4 rounded-lg hover:bg-blue-700 transition-all shadow-lg hover:shadow-xl font-medium text-base md:text-lg min-h-[48px]"
            >
              <span className="font-bengali">আরও দেখুন</span>
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

export default Doctors;
