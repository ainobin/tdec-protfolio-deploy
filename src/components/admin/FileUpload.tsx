'use client';

import React, { useState, useRef } from 'react';
import Image from 'next/image';
import { useAuth } from '@/context/AuthContext';

interface FileUploadProps {
  accept?: string;
  folder?: string;
  currentUrl?: string;
  onUploadSuccess: (url: string) => void;
  onUploadError?: (error: string) => void;
  onUploadStart?: () => void;
  label?: string;
  type?: 'image' | 'video';
}

const FileUpload: React.FC<FileUploadProps> = ({
  accept = 'image/*',
  folder = '',
  currentUrl = '',
  onUploadSuccess,
  onUploadError,
  onUploadStart,
  label = 'Upload File',
  type = 'image',
}) => {
  const { token } = useAuth();
  const [uploading, setUploading] = useState(false);
  const [preview, setPreview] = useState(currentUrl);
  const [error, setError] = useState('');
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [infoMessage, setInfoMessage] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Reset previous state
    setUploadSuccess(false);
    setError('');
    setInfoMessage('');

    // Validate file size (50MB max)
    if (file.size > 50 * 1024 * 1024) {
      const errorMsg = 'File size exceeds 50MB limit';
      setError(errorMsg);
      if (onUploadError) onUploadError(errorMsg);
      return;
    }

    setUploading(true);
    
    // Notify parent that upload has started
    if (onUploadStart) onUploadStart();

    try {
      // Create preview for images
      if (type === 'image' && file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setPreview(reader.result as string);
        };
        reader.readAsDataURL(file);
      }

      // Upload via API
      const formData = new FormData();
      formData.append('file', file);
      if (folder) {
        formData.append('folder', folder);
      }

      const headers: HeadersInit = {};
      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
      }

      const response = await fetch('/api/upload', {
        method: 'POST',
        headers,
        body: formData,
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.error || 'Upload failed');
      }

      // Success
      setPreview(result.data.url);
      onUploadSuccess(result.data.url);
      setUploadSuccess(true);
      
      // Show message if file already existed
      if (result.data.alreadyExists) {
        // setInfoMessage('File already exists - using existing file');
        console.log('File already exists! So, using existing file');
      }
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : 'Upload failed';
      setError(errorMsg);
      setUploadSuccess(false);
      setInfoMessage(''); // Clear info message on error
      if (onUploadError) onUploadError(errorMsg);
      console.error('Upload error:', err);
    } finally {
      setUploading(false);
    }
  };

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-700">
        {label}
      </label>

      <div className="flex flex-col sm:flex-row sm:items-start gap-3 sm:gap-4">
        {/* Preview */}
        {preview && type === 'image' && (
          <div className="shrink-0 relative w-20 h-20 sm:w-24 sm:h-24 mx-auto sm:mx-0">
            <Image
              src={preview}
              alt="Preview"
              fill
              className="object-cover rounded-lg border-2 border-gray-300"
              unoptimized={preview.startsWith('data:')}
            />
          </div>
        )}

        {/* Upload Button */}
        <div className="flex-1">
          <input
            ref={fileInputRef}
            type="file"
            accept={accept}
            onChange={handleFileChange}
            className="hidden"
            disabled={uploading}
          />

          <button
            type="button"
            onClick={handleButtonClick}
            disabled={uploading}
            className="w-full sm:w-auto px-4 py-2 cursor-pointer bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition text-sm"
          >
            {uploading ? 'Uploading...' : 'Choose File'}
          </button>

          <p className="mt-2 text-xs text-gray-500 text-center sm:text-left">
            Max size: 50MB. Supported: {accept}
          </p>

          {/* Success message */}
          {!uploading && uploadSuccess && (
            <p className="mt-1 text-xs text-green-600 text-center sm:text-left">
              ✓ File uploaded successfully
            </p>
          )}

          {/* Error message */}
          {error && (
            <p className="mt-1 text-xs text-red-600 text-center sm:text-left">
              ✗ {error}
            </p>
          )}

          {/* Info message */}
          {/* {infoMessage && (
            <p className="mt-1 text-xs text-blue-600">
              {infoMessage}
            </p>
          )} */}
        </div>
      </div>
    </div>
  );
};

export default FileUpload;