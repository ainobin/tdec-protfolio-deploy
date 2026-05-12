"use client";

import React, { useEffect, useState } from "react";
import { Doctor } from "@/types";
import Image from "next/image";
import Link from "next/link";

export default function DoctorsPage() {
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        setLoading(true);
        const response = await fetch("/api/doctors");
        const data = await response.json();

        if (data.success) {
          setDoctors(data.data);
        } else {
          setError(data.error || "Failed to fetch doctors");
        }
      } catch (err) {
        setError("Failed to load doctors");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchDoctors();
  }, []);

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

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Doctors Grid */}
      <div className="container mx-auto px-4 py-16">
        {!loading && !error && doctors.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {doctors.map((doctor) => (
              <div
                key={doctor.id}
                className="bg-white rounded-xl overflow-hidden shadow-lg"
              >
                {/* Doctor Image */}
                <div className="relative h-80 bg-blue-100 flex items-center justify-center">
                  {doctor.image ? (
                    <Image
                      src={doctor.image}
                      alt={doctor.name}
                      fill
                      className="object-cover object-top"
                    />
                  ) : (
                    <div className="text-9xl">👨‍⚕️</div>
                  )}
                </div>

                {/* Doctor Info */}
                <div className="p-6">
                  {/* Doctor Name */}
                  <h2 className="text-2xl font-bold mb-2 line-clamp-2 truncate">
                    {doctor.name}
                  </h2>

                  {/* Specialization */}
                  {doctor.specialization && (
                    <p className="text-sm text-blue-600 font-semibold mb-1 line-clamp-2 truncate">
                      {doctor.specialization}
                    </p>
                  )}

                  {/* Qualification */}
                  {doctor.qualification && (
                    <p className="text-sm text-gray-600 mb-2 line-clamp-2 truncate">
                      {doctor.qualification}
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
                        title={doctor.schedules?.map(
                          (s: any) =>
                            `${s.day}: ${s.startTime} - ${s.endTime}`
                        ).join(", ")}
                      >
                        {getScheduleText(doctor)}
                      </span>
                    </div>
                  </div>

                  {/* View Profile */}
                  <Link
                    href={`/doctors/${doctor.id}`}
                    className="mt-5 inline-flex w-full justify-center bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700 transition font-semibold"
                  >
                    View Profile →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}