'use client';

import React, { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { useAuth } from '@/context/AuthContext';
import Modal from '@/components/admin/Modal';
import FileUpload from '@/components/admin/FileUpload';
import { CarouselImage, CreateCarouselImageDTO, UpdateCarouselImageDTO } from '@/types';

export default function CarouselPage() {
  const { token, getAuthHeaders } = useAuth();
  const [images, setImages] = useState<CarouselImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingImage, setEditingImage] = useState<CarouselImage | null>(null);
  const [formData, setFormData] = useState<CreateCarouselImageDTO>({
    imageUrl: '',
    altText: '',
    isActive: true,
  });
  const [draggedItem, setDraggedItem] = useState<number | null>(null);

  const fetchImages = useCallback(async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/carousel?includeInactive=true', {
        headers: getAuthHeaders(),
      });
      const data = await response.json();
      if (data.success) {
        setImages(data.data);
      } else {
        setError(data.error || 'Failed to fetch carousel images');
      }
    } catch (err) {
      setError('Failed to fetch carousel images');
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [getAuthHeaders]);

  useEffect(() => {
    fetchImages();
  }, [fetchImages]);

  const handleOpenModal = (image?: CarouselImage) => {
    if (image) {
      setEditingImage(image);
      setFormData({
        imageUrl: image.imageUrl,
        altText: image.altText || '',
        isActive: image.isActive,
      });
    } else {
      setEditingImage(null);
      setFormData({
        imageUrl: '',
        altText: '',
        isActive: true,
      });
    }
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingImage(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      if (editingImage) {
        const response = await fetch('/api/carousel', {
          method: 'PUT',
          headers: getAuthHeaders(),
          body: JSON.stringify({ id: editingImage.id, ...formData }),
        });
        const data = await response.json();
        if (!data.success) {
          throw new Error(data.error || 'Failed to update image');
        }
      } else {
        const response = await fetch('/api/carousel', {
          method: 'POST',
          headers: getAuthHeaders(),
          body: JSON.stringify(formData),
        });
        const data = await response.json();
        if (!data.success) {
          throw new Error(data.error || 'Failed to create image');
        }
      }
      handleCloseModal();
      fetchImages();
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Operation failed');
    }
  };

  const handleDelete = (image: CarouselImage) => {
    if (confirm('Are you sure you want to delete this carousel image?')) {
      deleteImage(image.id);
    }
  };

  const deleteImage = async (id: string) => {
    try {
      const response = await fetch(`/api/carousel?id=${id}`, {
        method: 'DELETE',
        headers: getAuthHeaders(),
      });
      const data = await response.json();
      if (!data.success) {
        throw new Error(data.error || 'Failed to delete image');
      }
      fetchImages();
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Failed to delete');
    }
  };

  const handleToggleActive = async (image: CarouselImage) => {
    try {
      const response = await fetch('/api/carousel', {
        method: 'PUT',
        headers: getAuthHeaders(),
        body: JSON.stringify({ id: image.id, isActive: !image.isActive }),
      });
      const data = await response.json();
      if (!data.success) {
        throw new Error(data.error || 'Failed to update image');
      }
      fetchImages();
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Failed to update');
    }
  };

  // Drag and drop handlers
  const handleDragStart = (index: number) => {
    setDraggedItem(index);
  };

  const handleDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault();
  };

  const handleDrop = async (index: number) => {
    if (draggedItem === null || draggedItem === index) {
      setDraggedItem(null);
      return;
    }

    const newImages = [...images];
    const [draggedImage] = newImages.splice(draggedItem, 1);
    newImages.splice(index, 0, draggedImage);
    setImages(newImages);
    setDraggedItem(null);

    // Save new order
    try {
      const imageIds = newImages.map(img => img.id);
      await fetch('/api/carousel/reorder', {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify({ imageIds }),
      });
    } catch (err) {
      console.error('Failed to save order:', err);
      fetchImages(); // Refresh to get correct order
    }
  };

  const activeCount = images.filter(img => img.isActive).length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Carousel Management</h1>
          <p className="text-gray-600 mt-1">Manage homepage carousel images</p>
        </div>
        <button
          onClick={() => handleOpenModal()}
          className="bg-blue-600 cursor-pointer text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition font-medium shadow-lg"
        >
          + Add Image
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white rounded-xl shadow-md p-6">
          <div className="flex items-center gap-4">
            <span className="text-4xl">🎠</span>
            <div>
              <p className="text-2xl font-bold text-gray-800">{images.length}</p>
              <p className="text-gray-600">Total Images</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-md p-6">
          <div className="flex items-center gap-4">
            <span className="text-4xl">✅</span>
            <div>
              <p className="text-2xl font-bold text-green-600">{activeCount}</p>
              <p className="text-gray-600">Active Images</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-md p-6">
          <div className="flex items-center gap-4">
            <span className="text-4xl">📝</span>
            <div>
              <p className="text-2xl font-bold text-gray-800">{images.length - activeCount}</p>
              <p className="text-gray-600">Inactive Images</p>
            </div>
          </div>
        </div>
      </div>

      {/* Info */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <div className="flex items-start gap-3">
          <span className="text-xl">💡</span>
          <div>
            <h3 className="font-semibold text-blue-900 mb-1">Drag & Drop to Reorder</h3>
            <p className="text-sm text-blue-800">
              You can drag images to change their display order. The order is automatically saved.
            </p>
          </div>
        </div>
      </div>

      {/* Images Grid */}
      {loading ? (
        <div className="text-center py-12">
          <p className="text-gray-500">Loading...</p>
        </div>
      ) : error ? (
        <div className="text-center py-12">
          <p className="text-red-500">{error}</p>
          <button
            onClick={fetchImages}
            className="mt-2 text-blue-600 hover:underline"
          >
            Try again
          </button>
        </div>
      ) : images.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-xl shadow-md">
          <span className="text-6xl">🎠</span>
          <p className="text-gray-600 mt-4">No carousel images yet</p>
          <button
            onClick={() => handleOpenModal()}
            className="mt-4 text-blue-600 hover:underline"
          >
            Add your first image
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {images.map((image, index) => (
            <div
              key={image.id}
              draggable
              onDragStart={() => handleDragStart(index)}
              onDragOver={(e) => handleDragOver(e, index)}
              onDrop={() => handleDrop(index)}
              className={`bg-white rounded-xl shadow-md overflow-hidden transition-all ${
                draggedItem === index ? 'opacity-50 scale-95' : ''
              }`}
            >
              {/* Image Preview */}
              <div className="relative h-48 bg-gray-100">
                <Image
                  src={image.imageUrl}
                  alt={image.altText || `Carousel ${index + 1}`}
                  fill
                  className="object-cover"
                />
                {/* Order Badge */}
                <div className="absolute top-2 left-2 bg-blue-600 text-white px-2 py-1 rounded-full text-xs font-medium">
                  #{index + 1}
                </div>
                {/* Active Badge */}
                <div className="absolute top-2 right-2">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    image.isActive 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-gray-100 text-gray-600'
                  }`}>
                    {image.isActive ? 'Active' : 'Inactive'}
                  </span>
                </div>
                {/* Drag Handle */}
                <div className="absolute bottom-2 right-2 bg-white/80 p-1 rounded cursor-grab">
                  <span className="text-gray-600">☰</span>
                </div>
              </div>

              {/* Actions */}
              <div className="p-4">
                <p className="text-sm text-gray-600 truncate mb-3" title={image.altText || 'No alt text'}>
                  {image.altText || 'No alt text'}
                </p>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleToggleActive(image)}
                    className={`flex-1 px-3 py-2 rounded-lg text-sm font-medium cursor-pointer transition ${
                      image.isActive
                        ? 'bg-yellow-100 text-yellow-700 hover:bg-yellow-200'
                        : 'bg-green-100 text-green-700 hover:bg-green-200'
                    }`}
                  >
                    {image.isActive ? 'Deactivate' : 'Activate'}
                  </button>
                  <button
                    onClick={() => handleOpenModal(image)}
                    className="px-3 py-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition text-sm font-medium cursor-pointer"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(image)}
                    className="px-3 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition text-sm font-medium cursor-pointer"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        title={editingImage ? 'Edit Carousel Image' : 'Add Carousel Image'}
        size="lg"
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <FileUpload
            accept="image/*"
            folder="carousel"
            currentUrl={formData.imageUrl}
            onUploadSuccess={(url) => setFormData({ ...formData, imageUrl: url })}
            label="Carousel Image"
            type="image"
          />

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Alt Text (Optional)
            </label>
            <input
              type="text"
              value={formData.altText}
              onChange={(e) => setFormData({ ...formData, altText: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Describe the image for accessibility..."
            />
          </div>

          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              id="isActive"
              checked={formData.isActive}
              onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
              className="w-5 h-5 text-blue-600 rounded focus:ring-blue-500"
            />
            <label htmlFor="isActive" className="text-sm font-medium text-gray-700">
              Active (will show in carousel)
            </label>
          </div>

          <div className="flex justify-end gap-4 mt-6 pt-4 border-t">
            <button
              type="button"
              onClick={handleCloseModal}
              className="px-6 py-2 cursor-pointer border border-gray-300 rounded-lg hover:bg-gray-50 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={!formData.imageUrl}
              className="px-6 py-2 cursor-pointer bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
              {editingImage ? 'Update Image' : 'Add Image'}
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
