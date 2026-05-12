'use client';

import React, { useState } from 'react';
import { useData } from '@/context/DataContext';
import Table from '@/components/admin/Table';
import Modal from '@/components/admin/Modal';
import FileUpload from '@/components/admin/FileUpload';
import { Service, CreateServiceDTO, UpdateServiceDTO } from '@/types';
import Image from 'next/image';

export default function ServicesPage() {
  const { services, addService, updateService, deleteService } = useData();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingService, setEditingService] = useState<Service | null>(null);
  const [formData, setFormData] = useState<CreateServiceDTO>({
    title: '',
    titleBn: '',
    description: '',
    descriptionBn: '',
    image: '',
    price: 0,
  });

  const handleOpenModal = (service?: Service) => {
    if (service) {
      setEditingService(service);
      setFormData({
        title: service.title,
        titleBn: service.titleBn,
        description: service.description,
        descriptionBn: service.descriptionBn,
        image: service.image || '',
        price: service.price || 0,
      });
    } else {
      setEditingService(null);
      setFormData({
        title: '',
        titleBn: '',
        description: '',
        descriptionBn: '',
        image: '',
        price: 0,
      });
    }
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingService(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      if (editingService) {
        await updateService(editingService.id, formData as UpdateServiceDTO);
      } else {
        await addService(formData);
      }
      handleCloseModal();
    } catch (error) {
      alert(error instanceof Error ? error.message : 'Operation failed');
    }
  };

  const handleDelete = (service: Service) => {
    if (confirm(`Are you sure you want to delete "${service.title}"?`)) {
      deleteService(service.id);
    }
  };

  const columns = [
    {
      key: 'image',
      label: 'Image',
      render: (value: string) => value ? (
        <div className="w-12 h-12 relative rounded overflow-hidden">
          <Image src={value} alt="Service" fill className="object-cover" />
        </div>
      ) : (
        <div className="w-12 h-12 bg-gray-200 rounded flex items-center justify-center text-gray-400 text-xs">
          No img
        </div>
      ),
    },
    {
      key: 'title',
      label: 'Title',
      render: (value: string, row: Service) => (
        <div className="min-w-0">
          <p className="font-semibold text-wrap wrap-wrap-break-word">{row.title}</p>
          <p className="text-xs text-gray-500 font-bengali text-wrap wrap-break-word">{row.titleBn}</p>
        </div>
      ),
    },
    {
      key: 'description',
      label: 'Description',
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
            maxWidth: '200px',
            lineHeight: '1.4'
          }}
          title={value} // Show full text on hover
        >
          {value}
        </div>
      ),
    },
    {
      key: 'price',
      label: 'Price',
      render: (value: number) => (
        <span className="text-sm font-medium">
          {value > 0 ? `৳${value.toLocaleString()}` : '-'}
        </span>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Services Management</h1>
          <p className="text-gray-600 mt-1">Manage clinic services and offerings</p>
        </div>
        <button
          onClick={() => handleOpenModal()}
          className="bg-blue-600 cursor-pointer text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition font-medium shadow-lg"
        >
          + Add Service
        </button>
      </div>

      {/* Stats */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <div className="flex items-center gap-4">
          <span className="text-4xl">🏥</span>
          <div>
            <p className="text-2xl font-bold text-gray-800">{services.length}</p>
            <p className="text-gray-600">Total Services</p>
          </div>
        </div>
      </div>

      {/* Table */}
      <Table columns={columns} data={services} onEdit={handleOpenModal} onDelete={handleDelete} />

      {/* Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        title={editingService ? 'Edit Service' : 'Add New Service'}
        size="lg"
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 gap-4">
            {/* Service Image */}
            <div>
              <FileUpload
                accept="image/*"
                folder="services"
                currentUrl={formData.image}
                onUploadSuccess={(url) => setFormData({ ...formData, image: url })}
                label="Service Image"
                type="image"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Title (English)
                </label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Title (Bengali)
                </label>
                <input
                  type="text"
                  value={formData.titleBn}
                  onChange={(e) => setFormData({ ...formData, titleBn: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 font-bengali"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Description (English)
              </label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                rows={3}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Description (Bengali)
              </label>
              <textarea
                value={formData.descriptionBn}
                onChange={(e) => setFormData({ ...formData, descriptionBn: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 font-bengali"
                rows={3}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Price (BDT)
              </label>
              <input
                type="number"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                min="0"
                placeholder="Enter price (0 for free)"
              />
            </div>
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
              className="px-6 py-2 cursor-pointer bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            >
              {editingService ? 'Update Service' : 'Add Service'}
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}