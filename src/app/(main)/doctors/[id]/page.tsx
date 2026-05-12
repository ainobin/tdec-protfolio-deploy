"use client";

import React, { useEffect, useState } from "react";
import { Doctor } from "@/types";
import Image from "next/image";
import { notFound } from "next/navigation";

interface Props {
  params: Promise<{ id: string }>;
}

export default function DoctorProfile({ params }: Props) {
  const [resolvedParams, setResolvedParams] = useState<{ id: string } | null>(
    null,
  );
  const [doctor, setDoctor] = useState<Doctor | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    params.then(setResolvedParams);
  }, [params]);

  useEffect(() => {
    if (!resolvedParams?.id) return;

    const fetchDoctor = async () => {
      try {
        setLoading(true);
        const response = await fetch(`/api/doctors/${resolvedParams.id}`);
        const data = await response.json();

        if (response.ok && data.success) {
          setDoctor(data.data);
        } else if (response.status === 404) {
          notFound();
        } else {
          setError(data.error || "Failed to fetch doctor details");
        }
      } catch (err) {
        setError("Failed to load doctor details");
        console.error("Error fetching doctor:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchDoctor();
  }, [resolvedParams]);

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full mx-4">
          <div className="animate-pulse">
            <div className="w-48 h-48 bg-gray-200 rounded-lg mx-auto mb-4"></div>
            <div className="h-8 bg-gray-200 rounded mb-4"></div>
            <div className="h-4 bg-gray-200 rounded mb-2"></div>
            <div className="h-4 bg-gray-200 rounded mb-2"></div>
            <div className="h-4 bg-gray-200 rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  // Error state
  if (error || !doctor) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full mx-4">
          <div className="text-center">
            <div className="text-6xl mb-4">⚠️</div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2 wrap-break-word">
              Unable to Load Doctor Profile
            </h2>
            <p className="text-gray-600 mb-4 wrap-break-word line-clamp-2">
              {error}
            </p>
            <button
              onClick={() => window.history.back()}
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
            >
              Go Back
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* ================= HERO ================= */}
      <div className="bg-linear-to-r from-blue-600 to-blue-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex flex-col lg:flex-row items-center gap-10">
            {/* Doctor Image */}
            <div className="relative w-56 h-56 sm:w-64 sm:h-64 rounded-2xl overflow-hidden shadow-2xl bg-white">
              {doctor.image ? (
                <Image
                  src={doctor.image}
                  alt={doctor.name}
                  fill
                  className="object-cover object-top"
                  sizes="(max-width: 768px) 224px, 256px"
                />
              ) : (
                <div className="flex items-center justify-center w-full h-full text-7xl">
                  👨‍⚕️
                </div>
              )}
            </div>

            {/* Info */}
            <div className="flex-1 text-center lg:text-left">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight">
                {doctor.name}
              </h1>

              <p className="text-lg sm:text-xl font-bengali text-blue-100 mt-2">
                {doctor.nameBn}
              </p>

              <div className="mt-6 space-y-2">
                <p className="text-lg font-semibold">{doctor.specialization}</p>
                <p className="font-bengali text-blue-100">
                  {doctor.specializationBn}
                </p>
              </div>

              <p className="mt-4 text-blue-100 text-base sm:text-lg">
                {doctor.qualification}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* ================= CONTENT ================= */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* LEFT CONTENT */}
          <div className="lg:col-span-2 space-y-8">
            {/* About */}
            {doctor.description && (
              <div className="bg-white rounded-2xl shadow-md p-6">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">
                  About Doctor
                </h2>

                <div className="space-y-4 text-gray-700 leading-relaxed">
                  <p>{doctor.description}</p>
                  {doctor.descriptionBn && (
                    <p className="font-bengali text-gray-600">
                      {doctor.descriptionBn}
                    </p>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* RIGHT SIDEBAR */}
          <div className="space-y-8">
            {/* Schedule */}
            <div className="bg-white rounded-2xl shadow-md p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-4">Schedule</h3>

              <div className="overflow-x-auto">
                <table className="w-full text-sm border border-gray-200 rounded-lg overflow-hidden">
                  <thead className="bg-blue-50 text-gray-700">
                    <tr>
                      <th className="px-4 py-2 border text-left">Day</th>
                      <th className="px-4 py-2 border text-left">Time</th>
                    </tr>
                  </thead>

                  <tbody>
                    {doctor.schedules?.length > 0 ? (
                      doctor.schedules.map((schedule, index) => (
                        <tr key={index} className="hover:bg-gray-50">
                          <td className="px-4 py-2 border">{schedule.day}</td>
                          <td className="px-4 py-2 border">
                            {schedule.startTime} - {schedule.endTime}
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td
                          colSpan={2}
                          className="px-4 py-3 text-center text-gray-500"
                        >
                          No schedules available
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Consultation Fee */}
            {doctor.consultationFee > 0 && (
              <div className="bg-white rounded-2xl shadow-md p-6 text-center">
                <h3 className="text-xl font-bold text-gray-800 mb-4">
                  Consultation Fee
                </h3>

                <p className="text-3xl font-bold text-green-600">
                  ৳{doctor.consultationFee.toLocaleString()}
                </p>
                <p className="text-gray-500 mt-1 text-sm">Per Consultation</p>
              </div>
            )}

            {/* Appointment CTA */}
            <div className="bg-linear-to-br from-blue-600 to-blue-700 rounded-2xl shadow-lg p-6 text-white text-center">
              <h3 className="text-xl font-bold mb-4">Book Appointment</h3>

              <p className="text-blue-100 mb-6">
                Contact us to schedule an appointment with{" "}
                <span className="font-semibold text-yellow-300">
                  {doctor.name.split(" ")[0]}
                </span>
              </p>

              <a
                href="tel:+8801XXXXXXXXX"
                className="block w-full bg-white/20 hover:bg-white/30 transition py-3 rounded-lg font-medium"
              >
                📞 Call Now
              </a>
            </div>
          </div>
        </div>

        {/* BACK BUTTON */}
        <div className="text-center mt-12">
          <button
            onClick={() => window.history.back()}
            className="inline-flex items-center gap-2 bg-gray-700 text-white px-8 py-3 rounded-lg hover:bg-gray-800 transition"
          >
            ← Back to Doctors
          </button>
        </div>
      </div>
    </div>
  );
}
