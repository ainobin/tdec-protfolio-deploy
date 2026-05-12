'use client';

import React, { useState } from 'react';
import { useData } from '@/context/DataContext';
import Table from '@/components/admin/Table';
import Modal from '@/components/admin/Modal';
import FileUpload from '@/components/admin/FileUpload';
import { GalleryItem } from '@/types';

export default function GalleryPage() {
  const { gallery, addGalleryItem, updateGalleryItem, deleteGalleryItem } = useData();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<GalleryItem | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [formData, setFormData] = useState<Partial<GalleryItem>>({
    type: 'image',
    src: '',
    videoUrl: '',
    title: '',
    createdAt: new Date(),
  });

  const handleOpenModal = (item?: GalleryItem) => {
    setIsUploading(false); // Reset upload state
    if (item) {
      setEditingItem(item);
      setFormData(item);
    } else {
      setEditingItem(null);
      setFormData({
        type: 'image',
        src: '',
        videoUrl: '',
        title: '',
        createdAt: new Date(),
      });
    }
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingItem(null);
    setIsUploading(false);
  };

  // Upload handlers
  const handleUploadStart = () => {
    setIsUploading(true);
  };

  const handleUploadSuccess = (url: string) => {
    setFormData({ ...formData, src: url });
    setIsUploading(false);
  };

  const handleUploadError = (error: string) => {
    setIsUploading(false);
    alert(`Upload failed: ${error}`);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Prevent submission during upload
    if (isUploading) {
      return;
    }
    
    try {
      // Prepare data for submission
      const submissionData = { ...formData };
      
      // For videos, just set src to videoUrl
      if (formData.type === 'video' && formData.videoUrl) {
        submissionData.src = formData.videoUrl;
      }
      
      if (editingItem) {
        await updateGalleryItem(editingItem.id, submissionData);
      } else {
        await addGalleryItem(submissionData as Omit<GalleryItem, 'id'>);
      }
      handleCloseModal();
    } catch (error) {
      alert(error instanceof Error ? error.message : 'Operation failed');
    }
  };

  const handleDelete = (item: GalleryItem) => {
    if (confirm(`Are you sure you want to delete "${item.title}"?`)) {
      deleteGalleryItem(item.id);
    }
  };

  const columns = [
    {
      key: 'type',
      label: 'Type',
      render: (value: string) => (
        <span
          className={`px-2 py-1 rounded text-xs font-semibold ${
            value === 'image'
              ? 'bg-blue-100 text-blue-800'
              : 'bg-purple-100 text-purple-800'
          }`}
        >
          {value === 'image' ? '📷 Image' : '🎥 Video'}
        </span>
      ),
    },
    {
      key: 'title',
      label: 'Title',
      render: (value: string) => (
        <div 
          className="text-sm text-gray-900"
          style={{
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
            wordBreak: 'break-word',
            overflowWrap: 'break-word',
            maxWidth: '150px',
            lineHeight: '1.4'
          }}
          title={value || 'Untitled'}
        >
          {value || 'Untitled'}
        </div>
      ),
    },
    {
      key: 'src',
      label: 'Source',
      hideOnMobile: true,
      render: (value: string, row: GalleryItem) => {
        const sourceUrl = row.type === 'video' && row.videoUrl ? row.videoUrl : value;
        return (
          <div 
            className="text-xs text-gray-600"
            style={{
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
              wordBreak: 'break-all',
              overflowWrap: 'break-word',
              maxWidth: '200px',
              lineHeight: '1.3'
            }}
            title={sourceUrl}
          >
            {sourceUrl}
          </div>
        );
      },
    },
    {
      key: 'createdAt',
      label: 'Date',
      mobileLabel: 'Added',
      render: (value: Date) => new Date(value).toLocaleDateString(),
    },
  ];

  const imageCount = gallery.filter((item) => item.type === 'image').length;
  const videoCount = gallery.filter((item) => item.type === 'video').length;

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="min-w-0">
          <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-800">Gallery Management</h1>
          <p className="text-sm sm:text-base text-gray-600 mt-1">Manage images and videos for the gallery</p>
        </div>
        <button
          onClick={() => handleOpenModal()}
          className="bg-blue-600 cursor-pointer text-white px-4 py-2 sm:px-6 sm:py-3 rounded-lg hover:bg-blue-700 transition font-medium shadow-lg text-sm sm:text-base shrink-0"
        >
          <span className="hidden sm:inline">+ Add Item</span>
          <span className="sm:hidden">+ Add</span>
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 lg:gap-6">
        <div className="bg-white rounded-xl shadow-md p-4 sm:p-6">
          <div className="flex items-center gap-3 sm:gap-4">
            <span className="text-2xl sm:text-3xl lg:text-4xl">🖼️</span>
            <div>
              <p className="text-xl sm:text-2xl font-bold text-gray-800">{gallery.length}</p>
              <p className="text-sm sm:text-base text-gray-600">Total Items</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-md p-4 sm:p-6">
          <div className="flex items-center gap-3 sm:gap-4">
            <span className="text-2xl sm:text-3xl lg:text-4xl">📷</span>
            <div>
              <p className="text-xl sm:text-2xl font-bold text-gray-800">{imageCount}</p>
              <p className="text-sm sm:text-base text-gray-600">Images</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-md p-4 sm:p-6">
          <div className="flex items-center gap-3 sm:gap-4">
            <span className="text-2xl sm:text-3xl lg:text-4xl">🎥</span>
            <div>
              <p className="text-xl sm:text-2xl font-bold text-gray-800">{videoCount}</p>
              <p className="text-sm sm:text-base text-gray-600">Videos</p>
            </div>
          </div>
        </div>
      </div>

      {/* Table */}
      <Table
        columns={columns}
        data={gallery}
        onEdit={handleOpenModal}
        onDelete={handleDelete}
      />

      {/* Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        title={editingItem ? 'Edit Gallery Item' : 'Add New Gallery Item'}
        size="md"
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Type</label>
            <select
              value={formData.type}
              onChange={(e) =>
                setFormData({ ...formData, type: e.target.value as 'image' | 'video' })
              }
              className="w-full px-4 cursor-pointer py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            >
              <option value="image" className='cursor-pointer'>Image</option>
              <option value="video" className='cursor-pointer'>Video</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full px-4 cursor-text py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Optional"
            />
          </div>

          {formData.type === 'image' ? (
            <div>
              <FileUpload
                accept="image/*"
                folder="gallery"
                currentUrl={formData.src}
                onUploadStart={handleUploadStart}
                onUploadSuccess={handleUploadSuccess}
                onUploadError={handleUploadError}
                label="Upload Image"
                type="image"
              />
            </div>
          ) : (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Video URL
                </label>
                <input
                  type="url"
                  value={formData.videoUrl}
                  onChange={(e) => setFormData({ ...formData, videoUrl: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  style={{
                    wordBreak: 'break-all',
                    overflowWrap: 'break-word'
                  }}
                  placeholder="Paste YouTube, Facebook, or Instagram video URL"
                  required={formData.type === 'video'}
                />
                <p className="text-sm text-gray-500 mt-1">
                  The video will be embedded directly from the platform
                </p>
              </div>
            </div>
          )}

          <div className="flex justify-end gap-4 mt-6 pt-4 border-t">
            <button
              type="button"
              onClick={handleCloseModal}
              className="px-6 py-2 border cursor-pointer border-gray-300 rounded-lg hover:bg-gray-50 transition"
              disabled={isUploading}
            >
              Cancel
            </button>
            <button
              type="submit"
              className={`px-6 py-2 rounded-lg transition font-medium ${
                isUploading 
                  ? 'bg-gray-400 text-white cursor-not-allowed' 
                  : 'bg-blue-600 text-white hover:bg-blue-700 cursor-pointer'
              }`}
              disabled={isUploading}
            >
              {isUploading ? (
                <div className="flex items-center gap-2">
                  <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
                    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" className="opacity-25"></circle>
                    <path fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" className="opacity-75"></path>
                  </svg>
                  Uploading...
                </div>
              ) : (
                editingItem ? 'Update Item' : 'Add Item'
              )}
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
