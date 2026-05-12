'use client';

import React from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, children, size = 'md' }) => {
  if (!isOpen) return null;

  const sizeClasses = {
    sm: 'max-w-sm sm:max-w-md',
    md: 'max-w-lg sm:max-w-xl lg:max-w-2xl',
    lg: 'max-w-xl sm:max-w-2xl lg:max-w-4xl',
    xl: 'max-w-2xl sm:max-w-4xl lg:max-w-6xl',
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-2 sm:p-4"
      onClick={onClose}
    >
      <div
        className={`bg-white rounded-xl shadow-2xl ${sizeClasses[size]} w-full max-h-[95vh] sm:max-h-[90vh] overflow-hidden`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-4 sm:px-6 py-3 sm:py-4 border-b border-gray-200">
          <h2 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-800 truncate pr-2">{title}</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 text-2xl sm:text-3xl leading-none shrink-0 w-8 h-8 flex items-center justify-center rounded-lg hover:bg-gray-100 transition-colors"
            aria-label="Close modal"
          >
            ×
          </button>
        </div>

        {/* Content */}
        <div className="px-4 sm:px-6 py-3 sm:py-4 overflow-y-auto" style={{ maxHeight: 'calc(95vh - 80px)' }}>
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;
