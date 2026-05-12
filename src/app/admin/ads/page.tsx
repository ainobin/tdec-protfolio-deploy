'use client';

import React, { useState, useEffect } from 'react';
import { useData } from '@/context/DataContext';
import Table from '@/components/admin/Table';
import Modal from '@/components/admin/Modal';
import FileUpload from '@/components/admin/FileUpload';
import { Ad, CreateAdDTO, UpdateAdDTO } from '@/types';

// Helper function to convert UTC ISO string to local datetime-local format
const utcToLocal = (utcString: string | Date): string => {
  const date = new Date(utcString);
  // Get local time in YYYY-MM-DDTHH:mm format for datetime-local input
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  return `${year}-${month}-${day}T${hours}:${minutes}`;
};

// Helper function to convert local datetime-local to UTC ISO string
const localToUtc = (localString: string): string => {
  return new Date(localString).toISOString();
};

export default function AdsPage() {
  const { ads, addAd, updateAd, deleteAd, refreshAds } = useData();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingAd, setEditingAd] = useState<Ad | null>(null);
  const [formData, setFormData] = useState<CreateAdDTO>({
    type: 'image',
    imageUrl: '',
    textContent: '',
    startTime: utcToLocal(new Date().toISOString()),
    endTime: '',
  });

  // Refresh ads when component mounts
  useEffect(() => {
    refreshAds();
  }, [refreshAds]);

  const handleOpenModal = (ad?: Ad) => {
    if (ad) {
      setEditingAd(ad);
      setFormData({
        type: ad.type,
        imageUrl: ad.imageUrl || '',
        textContent: ad.textContent || '',
        // Convert UTC times to local time for datetime-local input
        startTime: utcToLocal(ad.startTime),
        endTime: utcToLocal(ad.endTime),
      });
    } else {
      setEditingAd(null);
      setFormData({
        type: 'image',
        imageUrl: '',
        textContent: '',
        startTime: utcToLocal(new Date().toISOString()),
        endTime: '',
      });
    }
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingAd(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      // Convert local times to UTC ISO strings before submitting
      const adData: CreateAdDTO = {
        type: formData.type,
        startTime: localToUtc(formData.startTime),
        endTime: localToUtc(formData.endTime),
      };

      if (formData.type === 'image') {
        adData.imageUrl = formData.imageUrl;
      } else {
        adData.textContent = formData.textContent;
      }

      if (editingAd) {
        await updateAd(editingAd.id, adData as UpdateAdDTO);
      } else {
        await addAd(adData);
      }
      handleCloseModal();
    } catch (error) {
      alert(error instanceof Error ? error.message : 'Operation failed');
    }
  };

  const handleDelete = (ad: Ad) => {
    const adTitle = ad.type === 'image' ? 'Image Ad' : 'Text Ad';
    if (confirm(`Are you sure you want to delete this ${adTitle}?`)) {
      deleteAd(ad.id);
    }
  };

  const columns = [
    {
      key: 'type',
      label: 'Type',
      render: (value: string) => (
        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
          value === 'image' 
            ? 'bg-blue-100 text-blue-800' 
            : 'bg-green-100 text-green-800'
        }`}>
          {value === 'image' ? '🖼️ Image' : '📝 Text'}
        </span>
      ),
    },
    {
      key: 'content',
      label: 'Content',
      render: (_: any, row: Ad) => (
        <div style={{ maxWidth: '250px' }}>
          {row.type === 'image' ? (
            <div 
              className="text-sm text-gray-600"
              style={{
                display: '-webkit-box',
                WebkitLineClamp: 2,
                WebkitBoxOrient: 'vertical',
                overflow: 'hidden',
                wordBreak: 'break-all',
                overflowWrap: 'break-word',
                lineHeight: '1.3'
              }}
              title={row.imageUrl}
            >
              {row.imageUrl}
            </div>
          ) : (
            <div 
              className="text-sm text-gray-800"
              style={{
                display: '-webkit-box',
                WebkitLineClamp: 3,
                WebkitBoxOrient: 'vertical',
                overflow: 'hidden',
                wordBreak: 'break-word',
                overflowWrap: 'break-word',
                lineHeight: '1.4'
              }}
              title={row.textContent}
            >
              {row.textContent}
            </div>
          )}
        </div>
      ),
    },
    {
      key: 'startTime',
      label: 'Start Time (UTC)',
      mobileLabel: 'Start',
      hideOnMobile: false,
      render: (value: string | Date) => (
        <div className="text-sm" style={{ maxWidth: '140px' }}>
          <div 
            className="text-gray-800 hidden sm:block"
            style={{
              fontSize: '12px',
              wordBreak: 'break-word',
              lineHeight: '1.3'
            }}
          >
            {new Date(value).toUTCString().slice(0, -4)}
          </div>
          <div className="text-xs text-gray-500 sm:hidden">
            {new Date(value).toLocaleString('en-US', {
              month: 'short',
              day: 'numeric',
              hour: '2-digit',
              minute: '2-digit',
            })}
          </div>
          <div 
            className="text-xs text-gray-500 hidden sm:block"
            style={{
              wordBreak: 'break-word',
              lineHeight: '1.2'
            }}
          >
            Local: {new Date(value).toLocaleString('en-US', {
              month: 'short',
              day: 'numeric',
              hour: '2-digit',
              minute: '2-digit',
            })}
          </div>
        </div>
      ),
    },
    {
      key: 'endTime',
      label: 'End Time (UTC)',
      mobileLabel: 'End',
      hideOnMobile: true,
      render: (value: string | Date) => (
        <div className="text-sm" style={{ maxWidth: '140px' }}>
          <div 
            className="text-gray-800"
            style={{
              fontSize: '12px',
              wordBreak: 'break-word',
              lineHeight: '1.3'
            }}
          >
            {new Date(value).toUTCString().slice(0, -4)}
          </div>
          <div 
            className="text-xs text-gray-500"
            style={{
              wordBreak: 'break-word',
              lineHeight: '1.2'
            }}
          >
            Local: {new Date(value).toLocaleString('en-US', {
              month: 'short',
              day: 'numeric',
              hour: '2-digit',
              minute: '2-digit',
            })}
          </div>
        </div>
      ),
    },
    {
      key: 'status',
      label: 'Status',
      render: (_: any, row: Ad) => {
        // Use UTC time for status calculation
        const now = new Date();
        const start = new Date(row.startTime);
        const end = new Date(row.endTime);
        
        let status = '';
        let statusClass = '';
        
        if (now < start) {
          status = 'Scheduled';
          statusClass = 'bg-yellow-100 text-yellow-800';
        } else if (now >= start && now <= end) {
          status = 'Active';
          statusClass = 'bg-green-100 text-green-800';
        } else {
          status = 'Expired';
          statusClass = 'bg-gray-100 text-gray-800';
        }
        
        return (
          <span className={`px-2 sm:px-3 py-1 rounded-full text-xs font-semibold ${statusClass}`}>
            {status}
          </span>
        );
      },
    },
  ];

  const activeAdsCount = ads.filter(ad => {
    // Use UTC time for consistent filtering
    const now = new Date();
    const start = new Date(ad.startTime);
    const end = new Date(ad.endTime);
    return now >= start && now <= end;
  }).length;

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="min-w-0">
          <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-800">Pop-Up Ads Management</h1>
          <p className="text-sm sm:text-base text-gray-600 mt-1">Manage homepage pop-up advertisements</p>
        </div>
        <button
          onClick={() => handleOpenModal()}
          className="bg-blue-600 cursor-pointer text-white px-4 py-2 sm:px-6 sm:py-3 rounded-lg hover:bg-blue-700 transition font-medium shadow-lg text-sm sm:text-base shrink-0"
        >
          <span className="hidden sm:inline">+ Create Ad</span>
          <span className="sm:hidden">+ Add</span>
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 lg:gap-6">
        <div className="bg-white rounded-xl shadow-md p-4 sm:p-6">
          <div className="flex items-center gap-3 sm:gap-4">
            <span className="text-2xl sm:text-3xl lg:text-4xl">📢</span>
            <div>
              <p className="text-xl sm:text-2xl font-bold text-gray-800">{ads.length}</p>
              <p className="text-sm sm:text-base text-gray-600">Total Ads</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-md p-4 sm:p-6">
          <div className="flex items-center gap-3 sm:gap-4">
            <span className="text-2xl sm:text-3xl lg:text-4xl">✅</span>
            <div>
              <p className="text-xl sm:text-2xl font-bold text-green-600">{activeAdsCount}</p>
              <p className="text-sm sm:text-base text-gray-600">Active Ads</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-md p-4 sm:p-6">
          <div className="flex items-center gap-3 sm:gap-4">
            <span className="text-2xl sm:text-3xl lg:text-4xl">🖼️</span>
            <div>
              <p className="text-xl sm:text-2xl font-bold text-blue-600">
                {ads.filter(ad => ad.type === 'image').length}
              </p>
              <p className="text-sm sm:text-base text-gray-600">Image Ads</p>
            </div>
          </div>
        </div>
      </div>

      {/* UTC Time Info */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 sm:p-4">
        <div className="flex items-start gap-2 sm:gap-3">
          <span className="text-xl sm:text-2xl shrink-0">🌍</span>
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-blue-900 mb-1 text-sm sm:text-base">International Time (UTC)</h3>
            <p className="text-xs sm:text-sm text-blue-800">
              All ad schedules are stored and managed in UTC (Coordinated Universal Time) for consistency across timezones. 
              Enter times in your local timezone - they will be automatically converted to UTC for storage.
              The table shows both UTC and your local time for reference.
            </p>
          </div>
        </div>
      </div>

      {/* Table */}
      <Table columns={columns} data={ads} onEdit={handleOpenModal} onDelete={handleDelete} />

      {/* Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        title={editingAd ? 'Edit Ad' : 'Create New Ad'}
        size="lg"
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-4">
            {/* Ad Type */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Ad Type
              </label>
              <div className="flex gap-4">
                <label className="flex items-center cursor-pointer">
                  <input
                    type="radio"
                    value="image"
                    checked={formData.type === 'image'}
                    onChange={(e) => setFormData({ ...formData, type: 'image' })}
                    className="mr-2"
                  />
                  <span>Image Ad</span>
                </label>
                <label className="flex items-center cursor-pointer">
                  <input
                    type="radio"
                    value="text"
                    checked={formData.type === 'text'}
                    onChange={(e) => setFormData({ ...formData, type: 'text' })}
                    className="mr-2"
                  />
                  <span>Text/Announcement Ad</span>
                </label>
              </div>
            </div>

            {/* Image Ad Fields */}
            {formData.type === 'image' && (
              <div>
                <FileUpload
                  accept="image/*"
                  folder="ads"
                  currentUrl={formData.imageUrl}
                  onUploadSuccess={(url) => setFormData({ ...formData, imageUrl: url })}
                  label="Ad Image"
                  type="image"
                />
              </div>
            )}

            {/* Text Ad Fields */}
            {formData.type === 'text' && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Announcement Text
                </label>
                <textarea
                  value={formData.textContent}
                  onChange={(e) => setFormData({ ...formData, textContent: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  style={{
                    wordBreak: 'break-word',
                    overflowWrap: 'break-word',
                    resize: 'vertical'
                  }}
                  rows={6}
                  required={formData.type === 'text'}
                  placeholder="Enter your announcement text here..."
                />
              </div>
            )}

            {/* Time Fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Start Time (Your Local Time)
                </label>
                <input
                  type="datetime-local"
                  value={formData.startTime}
                  onChange={(e) => setFormData({ ...formData, startTime: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
                <p className="text-xs text-gray-500 mt-1">
                  Enter in your local time. Will be stored as UTC.
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  End Time (Your Local Time) <span className="text-red-500">*</span>
                </label>
                <input
                  type="datetime-local"
                  value={formData.endTime}
                  onChange={(e) => setFormData({ ...formData, endTime: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                  min={formData.startTime}
                />
                <p className="text-xs text-gray-500 mt-1">
                  Must be after start time. Stored as UTC.
                </p>
              </div>
            </div>
          </div>

          <div className="flex cursor-pointer justify-end gap-4 mt-6 pt-4 border-t">
            <button
              type="button"
              onClick={handleCloseModal}
              className="px-6 py-2 cursor-pointer border border-gray-300 rounded-lg hover:bg-gray-50 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2 cursor-pointer bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            >
              {editingAd ? 'Update Ad' : 'Create Ad'}
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
