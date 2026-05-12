'use client';

import React from 'react';
import { useData } from '@/context/DataContext';
import StatCard from '@/components/admin/StatCard';
import Link from 'next/link';

export default function AdminDashboard() {
  const { doctors, services, gallery, ads } = useData();

  return (
    <div className="space-y-6 sm:space-y-8">
      {/* Welcome Section */}
      <div className="bg-white rounded-xl shadow-md p-4 sm:p-6">
        <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-800 mb-2">Welcome to Admin Dashboard</h1>
        <p className="text-sm sm:text-base text-gray-600">
          Manage your clinic&apos;s content, doctors, services, ads, and gallery items.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6">
        <StatCard
          icon="👨‍⚕️"
          label="Total Doctors"
          value={doctors.length}
          trend=""
          trendColor="green"
        />
        <StatCard
          icon="🏥"
          label="Total Services"
          value={services.length}
          trend=""
          trendColor="blue"
        />
        <StatCard
          icon="🖼️"
          label="Gallery Items"
          value={gallery.length}
          trend=""
          trendColor="green"
        />
        <StatCard
          icon="📢"
          label="Active Ads"
          value={ads.length}
          trend=""
          trendColor="green"
        />
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-xl shadow-md p-4 sm:p-6">
        <h2 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-800 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
          <Link
            href="/admin/doctors"
            className="flex items-center gap-3 sm:gap-4 p-3 sm:p-4 bg-blue-50 hover:bg-blue-100 rounded-lg transition"
          >
            <span className="text-2xl sm:text-3xl shrink-0">👨‍⚕️</span>
            <div className="min-w-0">
              <h3 className="font-semibold text-gray-800 text-sm sm:text-base">Manage Doctors</h3>
              <p className="text-xs sm:text-sm text-gray-600">Add or edit doctor profiles</p>
            </div>
          </Link>

          <Link
            href="/admin/services"
            className="flex items-center gap-3 sm:gap-4 p-3 sm:p-4 bg-green-50 hover:bg-green-100 rounded-lg transition"
          >
            <span className="text-2xl sm:text-3xl shrink-0">🏥</span>
            <div className="min-w-0">
              <h3 className="font-semibold text-gray-800 text-sm sm:text-base">Manage Services</h3>
              <p className="text-xs sm:text-sm text-gray-600">Update service offerings</p>
            </div>
          </Link>

          <Link
            href="/admin/gallery"
            className="flex items-center gap-3 sm:gap-4 p-3 sm:p-4 bg-purple-50 hover:bg-purple-100 rounded-lg transition"
          >
            <span className="text-2xl sm:text-3xl shrink-0">🖼️</span>
            <div className="min-w-0">
              <h3 className="font-semibold text-gray-800 text-sm sm:text-base">Manage Gallery</h3>
              <p className="text-xs sm:text-sm text-gray-600">Upload images and videos</p>
            </div>
          </Link>

          <Link
            href="/admin/ads"
            className="flex items-center gap-3 sm:gap-4 p-3 sm:p-4 bg-yellow-50 hover:bg-yellow-100 rounded-lg transition"
          >
            <span className="text-2xl sm:text-3xl shrink-0">📢</span>
            <div className="min-w-0">
              <h3 className="font-semibold text-gray-800 text-sm sm:text-base">Manage PopUp Ads</h3>
              <p className="text-xs sm:text-sm text-gray-600">Manage PopUp advertisements</p>
            </div>
          </Link>

          <Link
            href="/admin/carousel"
            className="flex items-center gap-3 sm:gap-4 p-3 sm:p-4 bg-gray-50 hover:bg-gray-100 rounded-lg transition"
          >
            <span className="text-2xl sm:text-3xl shrink-0">🎠</span>
            <div className="min-w-0">
              <h3 className="font-semibold text-gray-800 text-sm sm:text-base">Manage Carousel</h3>
              <p className="text-xs sm:text-sm text-gray-600">Manage carousel images</p>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
