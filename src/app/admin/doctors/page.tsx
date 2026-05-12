'use client';

import React, { useState } from 'react';
import { useData } from '@/context/DataContext';
import Table from '@/components/admin/Table';
import Modal from '@/components/admin/Modal';
import FileUpload from '@/components/admin/FileUpload';
import { Doctor, ScheduleSlot, CreateDoctorDTO, UpdateDoctorDTO } from '@/types';

const DAYS = [
  { en: 'Saturday', bn: 'শনিবার' },
  { en: 'Sunday', bn: 'রবিবার' },
  { en: 'Monday', bn: 'সোমবার' },
  { en: 'Tuesday', bn: 'মঙ্গলবার' },
  { en: 'Wednesday', bn: 'বুধবার' },
  { en: 'Thursday', bn: 'বৃহস্পতিবার' },
  { en: 'Friday', bn: 'শুক্রবার' },
];

const TIME_OPTIONS = [
  '08:00 AM', '09:00 AM', '10:00 AM', '11:00 AM', '12:00 PM',
  '01:00 PM', '02:00 PM', '03:00 PM', '04:00 PM', '05:00 PM',
  '06:00 PM', '07:00 PM', '08:00 PM', '09:00 PM', '10:00 PM',
];

const FEE_PRESETS = [200, 300, 500, 700, 1000, 1500];

const emptyScheduleSlot: ScheduleSlot = { day: 'Saturday', dayBn: 'শনিবার', startTime: '06:00 PM', endTime: '08:00 PM' };

export default function DoctorsPage() {
  const { doctors, addDoctor, updateDoctor, toggleDoctorFeatured, deleteDoctor } = useData();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingDoctor, setEditingDoctor] = useState<Doctor | null>(null);
  const [formData, setFormData] = useState<CreateDoctorDTO>({
    name: '',
    nameBn: '',
    specialization: '',
    specializationBn: '',
    qualification: '',
    image: '',
    schedules: [{ ...emptyScheduleSlot }],
    description: '',
    descriptionBn: '',
    consultationFee: 0,
    isFeatured: false,
  });

  const handleOpenModal = (doctor?: Doctor) => {
    if (doctor) {
      setEditingDoctor(doctor);
      setFormData({
        name: doctor.name,
        nameBn: doctor.nameBn,
        specialization: doctor.specialization,
        specializationBn: doctor.specializationBn,
        qualification: doctor.qualification,
        image: doctor.image,
        schedules: doctor.schedules?.length ? doctor.schedules : [{ ...emptyScheduleSlot }],
        description: doctor.description || '',
        descriptionBn: doctor.descriptionBn || '',
        consultationFee: doctor.consultationFee || 0,
        isFeatured: doctor.isFeatured || false,
      });
    } else {
      setEditingDoctor(null);
      setFormData({
        name: '',
        nameBn: '',
        specialization: '',
        specializationBn: '',
        qualification: '',
        image: '',
        schedules: [{ ...emptyScheduleSlot }],
        description: '',
        descriptionBn: '',
        consultationFee: 0,
        isFeatured: false,
      });
    }
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingDoctor(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      if (editingDoctor) {
        await updateDoctor(editingDoctor.id, formData as UpdateDoctorDTO);
      } else {
        await addDoctor(formData);
      }
      handleCloseModal();
    } catch (error) {
      alert(error instanceof Error ? error.message : 'Operation failed');
    }
  };

  const handleDelete = (doctor: Doctor) => {
    if (confirm(`Are you sure you want to delete ${doctor.name}?`)) {
      deleteDoctor(doctor.id);
    }
  };

  const handleToggleFeatured = async (doctor: Doctor) => {
    try {
      await toggleDoctorFeatured(doctor.id, !doctor.isFeatured);
    } catch (error) {
      alert(error instanceof Error ? error.message : 'Failed to update');
    }
  };

  const updateScheduleSlot = (index: number, field: keyof ScheduleSlot, value: string) => {
    const newSchedules = [...formData.schedules];
    newSchedules[index] = { ...newSchedules[index], [field]: value };
    // Auto-set Bengali day when English day changes
    if (field === 'day') {
      const dayObj = DAYS.find(d => d.en === value);
      if (dayObj) {
        newSchedules[index].dayBn = dayObj.bn;
      }
    }
    setFormData({ ...formData, schedules: newSchedules });
  };

  const addScheduleSlot = () => {
    // Frontend validation: check for max 7 unique days
    const uniqueDays = new Set(formData.schedules.map(s => s.day));
    if (uniqueDays.size >= 7) {
      alert('Maximum 7 unique days allowed in a week. Please remove an existing day first.');
      return;
    }
    setFormData({ ...formData, schedules: [...formData.schedules, { ...emptyScheduleSlot }] });
  };

  const removeScheduleSlot = (index: number) => {
    if (formData.schedules.length <= 1) return;
    setFormData({ ...formData, schedules: formData.schedules.filter((_, i) => i !== index) });
  };

  const formatScheduleDisplay = (schedules: ScheduleSlot[] | undefined) => {
    if (!schedules || schedules.length === 0) return 'No schedule';
    return schedules.map(s => `${s.day} ${s.startTime}-${s.endTime}`).join(', ');
  };

  const columns = [
    {
      key: 'id',
      label: 'ID',
    },
    {
      key: 'name',
      label: 'Name',
      render: (value: string, row: Doctor) => (
        <div className="flex items-center gap-2 min-w-0">
          <div 
            className="min-w-0 flex-1"
            style={{ maxWidth: '200px' }}
          >
            <p 
              className="font-semibold text-gray-900"
              style={{
                display: '-webkit-box',
                WebkitLineClamp: 1,
                WebkitBoxOrient: 'vertical',
                overflow: 'hidden',
                wordBreak: 'break-word',
                overflowWrap: 'break-word'
              }}
              title={row.name}
            >
              {row.name}
            </p>
            <p 
              className="text-xs text-gray-500 font-bengali"
              style={{
                display: '-webkit-box',
                WebkitLineClamp: 1,
                WebkitBoxOrient: 'vertical',
                overflow: 'hidden',
                wordBreak: 'break-word',
                overflowWrap: 'break-word'
              }}
              title={row.nameBn}
            >
              {row.nameBn}
            </p>
          </div>
          {row.isFeatured && (
            <span className="bg-yellow-100 text-yellow-800 text-xs px-2 py-0.5 rounded-full font-medium shrink-0">Top</span>
          )}
        </div>
      ),
    },
    {
      key: 'specialization',
      label: 'Specialization',
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
          title={value}
        >
          {value}
        </div>
      ),
    },
    {
      key: 'qualification',
      label: 'Qualification',
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
            maxWidth: '180px',
            lineHeight: '1.4'
          }}
          title={value}
        >
          {value}
        </div>
      ),
    },
    {
      key: 'schedules',
      label: 'Schedule',
      render: (value: ScheduleSlot[]) => {
        const scheduleText = formatScheduleDisplay(value);
        return (
          <div 
            className="text-sm text-gray-900"
            style={{
              display: '-webkit-box',
              WebkitLineClamp: 3,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
              wordBreak: 'break-word',
              overflowWrap: 'break-word',
              maxWidth: '200px',
              lineHeight: '1.4'
            }}
            title={scheduleText}
          >
            {scheduleText}
          </div>
        );
      },
    },
    {
      key: 'isFeatured',
      label: 'Featured',
      render: (value: boolean, row: Doctor) => (
        <button
          onClick={(e) => { e.stopPropagation(); handleToggleFeatured(row); }}
          className={`px-3 py-1 rounded-full text-xs font-medium cursor-pointer transition ${
            row.isFeatured
              ? 'bg-yellow-100 text-yellow-800 hover:bg-yellow-200'
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          }`}
        >
          {row.isFeatured ? 'Remove from Top' : 'Set as Top'}
        </button>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Doctors Management</h1>
          <p className="text-gray-600 mt-1">Manage doctor profiles and information</p>
        </div>
        <button
          onClick={() => handleOpenModal()}
          className="bg-blue-600 cursor-pointer text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition font-medium shadow-lg"
        >
          + Add Doctor
        </button>
      </div>

      {/* Stats */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <div className="flex items-center gap-4">
          <span className="text-4xl">👨‍⚕️</span>
          <div>
            <p className="text-2xl font-bold text-gray-800">{doctors.length}</p>
            <p className="text-gray-600">Total Doctors</p>
          </div>
        </div>
      </div>

      {/* Table */}
      <Table columns={columns} data={doctors} onEdit={handleOpenModal} onDelete={handleDelete} />

      {/* Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        title={editingDoctor ? 'Edit Doctor' : 'Add New Doctor'}
        size="lg"
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Name (English)
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Name (Bengali)
              </label>
              <input
                type="text"
                value={formData.nameBn}
                onChange={(e) => setFormData({ ...formData, nameBn: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 font-bengali"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Specialization (English)
              </label>
              <input
                type="text"
                value={formData.specialization}
                onChange={(e) => setFormData({ ...formData, specialization: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Specialization (Bengali)
              </label>
              <input
                type="text"
                value={formData.specializationBn}
                onChange={(e) => setFormData({ ...formData, specializationBn: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 font-bengali"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Qualification
              </label>
              <input
                type="text"
                value={formData.qualification}
                onChange={(e) => setFormData({ ...formData, qualification: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div>
              <FileUpload
                accept="image/*"
                folder="doctors"
                currentUrl={formData.image}
                onUploadSuccess={(url) => setFormData({ ...formData, image: url })}
                label="Doctor Image"
                type="image"
              />
            </div>
          </div>

          {/* Schedule Slots */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="block text-sm font-medium text-gray-700">
                Schedule
              </label>
              <span className="text-xs text-gray-500">
                {formData.schedules.length}/7 days used
              </span>
            </div>
            <div className="space-y-3">
              {formData.schedules.map((slot, index) => {
                // Get days that are already used by OTHER slots
                const usedDaysByOtherSlots = formData.schedules
                  .filter((_, i) => i !== index)
                  .map(s => s.day);
                
                return (
                  <div key={index} className="flex flex-wrap items-center gap-2 bg-gray-50 p-3 rounded-lg">
                    <select
                      value={slot.day}
                      onChange={(e) => updateScheduleSlot(index, 'day', e.target.value)}
                      className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                    >
                      {DAYS.map(d => {
                        const isUsed = usedDaysByOtherSlots.includes(d.en);
                        return (
                          <option key={d.en} value={d.en} disabled={isUsed}>
                            {(d).en} {isUsed ? '(used)' : ''}
                          </option>
                        );
                      })}
                    </select>
                    <select
                      value={slot.startTime}
                      onChange={(e) => updateScheduleSlot(index, 'startTime', e.target.value)}
                      className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                    >
                      {TIME_OPTIONS.map(t => (
                        <option key={t} value={t}>{t}</option>
                      ))}
                    </select>
                    <span className="text-gray-500 text-sm">to</span>
                    <select
                      value={slot.endTime}
                      onChange={(e) => updateScheduleSlot(index, 'endTime', e.target.value)}
                      className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                    >
                      {TIME_OPTIONS.map(t => (
                        <option key={t} value={t}>{t}</option>
                      ))}
                    </select>
                    {formData.schedules.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeScheduleSlot(index)}
                        className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition text-sm cursor-pointer"
                      >
                        Remove
                      </button>
                    )}
                  </div>
                );
              })}
              <button
                type="button"
                onClick={addScheduleSlot}
                disabled={formData.schedules.length >= 7}
                className="w-full px-3 py-2 border-2 border-dashed border-gray-300 rounded-lg text-gray-600 hover:border-blue-500 hover:text-blue-500 transition cursor-pointer text-sm disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:border-gray-300 disabled:hover:text-gray-600"
              >
                + Add Schedule Slot
              </button>
            </div>
          </div>

          {/* Description */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Description (English)
              </label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                rows={4}
                placeholder="Detailed description about the doctor..."
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
                rows={4}
                placeholder="ডাক্তার সম্পর্কে বিস্তারিত বর্ণনা..."
              />
            </div>
          </div>

          {/* Consultation Fee and Featured */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Consultation Fee (BDT)
              </label>
              <div className="flex flex-wrap gap-2 mb-2">
                {FEE_PRESETS.map(fee => (
                  <button
                    key={fee}
                    type="button"
                    onClick={() => setFormData({ ...formData, consultationFee: fee })}
                    className={`px-3 py-1 rounded-full text-sm cursor-pointer transition ${
                      formData.consultationFee === fee
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    ৳{fee}
                  </button>
                ))}
              </div>
              <input
                type="number"
                value={formData.consultationFee}
                onChange={(e) => setFormData({ ...formData, consultationFee: Number(e.target.value) })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                min="0"
                placeholder="Or enter custom amount"
              />
            </div>

            <div className="flex items-center">
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.isFeatured}
                  onChange={(e) => setFormData({ ...formData, isFeatured: e.target.checked })}
                  className="w-5 h-5 cursor-pointer text-blue-600 rounded focus:ring-blue-500"
                />
                <div>
                  <span className="text-sm font-medium text-gray-700">Featured Doctor (Top)</span>
                  <p className="text-xs text-gray-500">This doctor will appear at the top of the list</p>
                </div>
              </label>
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
              {editingDoctor ? 'Update Doctor' : 'Add Doctor'}
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}