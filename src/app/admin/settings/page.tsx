'use client';

import React, { useState } from 'react';

export default function SettingsPage() {
  const [clinicInfo, setClinicInfo] = useState({
    name: 'Trishal Diagnostic and Eye Care Center',
    nameBn: 'ত্রিশাল ডায়াগনস্টিক এন্ড আই কেয়ার সেন্টার',
    address: 'Trishal, Mymensingh, Bangladesh',
    addressBn: 'ত্রিশাল, ময়মনসিংহ, বাংলাদেশ',
    phone: '+880 1797408590',
    email: 'tdeccenter@gmail.com',
    openingHours: 'Saturday - Thursday: 9:00 AM - 8:00 PM',
    openingHoursBn: 'শনিবার - বৃহস্পতিবার: সকাল ৯টা - রাত ৮টা',
    emergencyContact: '+880 1234-567891',
    description:
      'Leading diagnostic and eye care center providing world-class services with advanced technology and expert doctors.',
    descriptionBn:
      'উন্নত প্রযুক্তি এবং বিশেষজ্ঞ ডাক্তারদের সাথে বিশ্বমানের সেবা প্রদানকারী শীর্ষস্থানীয় ডায়াগনস্টিক এবং চোখের যত্ন কেন্দ্র।',
  });

  const [socialMedia, setSocialMedia] = useState({
    facebook: 'https://facebook.com/trishaldecc',
    twitter: 'https://twitter.com/trishaldecc',
    instagram: 'https://instagram.com/trishaldecc',
    youtube: 'https://www.youtube.com/@TrishalDiagnosticandEyeCareCen',
  });

  const [saved, setSaved] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    // Save settings logic here
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-800">Settings</h1>
        <p className="text-sm sm:text-base text-gray-600 mt-1">Manage clinic information and configurations</p>
      </div>

      {/* Success Message */}
      {saved && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-3 sm:px-4 py-3 rounded-lg text-sm sm:text-base">
          ✓ Settings saved successfully!
        </div>
      )}

      <form onSubmit={handleSave} className="space-y-4 sm:space-y-6">
        {/* Clinic Information */}
        <div className="bg-white rounded-xl shadow-md p-4 sm:p-6">
          <h2 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-800 mb-4 sm:mb-6">Clinic Information</h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Clinic Name (English)
              </label>
              <input
                type="text"
                value={clinicInfo.name}
                onChange={(e) => setClinicInfo({ ...clinicInfo, name: e.target.value })}
                className="w-full px-3 sm:px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Clinic Name (Bengali)
              </label>
              <input
                type="text"
                value={clinicInfo.nameBn}
                onChange={(e) => setClinicInfo({ ...clinicInfo, nameBn: e.target.value })}
                className="w-full px-3 sm:px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 font-bengali text-sm sm:text-base"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Address (English)
              </label>
              <input
                type="text"
                value={clinicInfo.address}
                onChange={(e) => setClinicInfo({ ...clinicInfo, address: e.target.value })}
                className="w-full px-3 sm:px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Address (Bengali)
              </label>
              <input
                type="text"
                value={clinicInfo.addressBn}
                onChange={(e) => setClinicInfo({ ...clinicInfo, addressBn: e.target.value })}
                className="w-full px-3 sm:px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 font-bengali text-sm sm:text-base"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
              <input
                type="tel"
                value={clinicInfo.phone}
                onChange={(e) => setClinicInfo({ ...clinicInfo, phone: e.target.value })}
                className="w-full px-3 sm:px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
              <input
                type="email"
                value={clinicInfo.email}
                onChange={(e) => setClinicInfo({ ...clinicInfo, email: e.target.value })}
                className="w-full px-3 sm:px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Opening Hours (English)
              </label>
              <input
                type="text"
                value={clinicInfo.openingHours}
                onChange={(e) => setClinicInfo({ ...clinicInfo, openingHours: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Opening Hours (Bengali)
              </label>
              <input
                type="text"
                value={clinicInfo.openingHoursBn}
                onChange={(e) =>
                  setClinicInfo({ ...clinicInfo, openingHoursBn: e.target.value })
                }
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 font-bengali"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Emergency Contact
              </label>
              <input
                type="tel"
                value={clinicInfo.emergencyContact}
                onChange={(e) =>
                  setClinicInfo({ ...clinicInfo, emergencyContact: e.target.value })
                }
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div className="mt-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Description (English)
            </label>
            <textarea
              value={clinicInfo.description}
              onChange={(e) => setClinicInfo({ ...clinicInfo, description: e.target.value })}
              className="w-full px-3 sm:px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
              rows={3}
            />
          </div>

          <div className="mt-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Description (Bengali)
            </label>
            <textarea
              value={clinicInfo.descriptionBn}
              onChange={(e) => setClinicInfo({ ...clinicInfo, descriptionBn: e.target.value })}
              className="w-full px-3 sm:px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 font-bengali text-sm sm:text-base"
              rows={3}
            />
          </div>
        </div>

        {/* Social Media */}
        <div className="bg-white rounded-xl shadow-md p-4 sm:p-6">
          <h2 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-800 mb-4 sm:mb-6">Social Media Links</h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                📘 Facebook
              </label>
              <input
                type="url"
                value={socialMedia.facebook}
                onChange={(e) => setSocialMedia({ ...socialMedia, facebook: e.target.value })}
                className="w-full px-3 sm:px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                🐦 Twitter
              </label>
              <input
                type="url"
                value={socialMedia.twitter}
                onChange={(e) => setSocialMedia({ ...socialMedia, twitter: e.target.value })}
                className="w-full px-3 sm:px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                📷 Instagram
              </label>
              <input
                type="url"
                value={socialMedia.instagram}
                onChange={(e) => setSocialMedia({ ...socialMedia, instagram: e.target.value })}
                className="w-full px-3 sm:px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                📺 YouTube
              </label>
              <input
                type="url"
                value={socialMedia.youtube}
                onChange={(e) => setSocialMedia({ ...socialMedia, youtube: e.target.value })}
                className="w-full px-3 sm:px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
              />
            </div>
          </div>
        </div>

        {/* Save Button */}
        <div className="flex justify-center sm:justify-end">
          <button
            type="submit"
            className="w-full sm:w-auto bg-blue-600 text-white px-6 sm:px-8 py-2 sm:py-3 rounded-lg hover:bg-blue-700 transition font-medium shadow-lg text-sm sm:text-base"
          >
            Save Settings
          </button>
        </div>
      </form>
    </div>
  );
}
