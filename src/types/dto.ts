/**
 * Data Transfer Objects (DTOs) for API requests
 * These types define the structure of data being sent to/from APIs
 */

import { ScheduleSlot } from './index';

// Doctor DTOs
export interface CreateDoctorDTO {
  name: string;
  nameBn: string;
  specialization: string;
  specializationBn: string;
  qualification: string;
  image: string;
  schedules: ScheduleSlot[];
  description?: string;
  descriptionBn?: string;
  consultationFee?: number;
  isFeatured?: boolean;
}

export interface UpdateDoctorDTO extends Partial<CreateDoctorDTO> {}

// Service DTOs
export interface CreateServiceDTO {
  title: string;
  titleBn: string;
  description: string;
  descriptionBn: string;
  image?: string;
  price?: number;
}

export interface UpdateServiceDTO extends Partial<CreateServiceDTO> {}

// Gallery DTOs
export interface CreateGalleryItemDTO {
  type: 'image' | 'video';
  src: string;
  videoUrl?: string;
  thumbnail?: string;
  title?: string;
  titleBn?: string;
}

export interface UpdateGalleryItemDTO extends Partial<CreateGalleryItemDTO> {}

// Ad DTOs
export interface CreateAdDTO {
  type: 'image' | 'text';
  imageUrl?: string;
  textContent?: string;
  startTime?: string;
  endTime: string;
}

export interface UpdateAdDTO extends Partial<CreateAdDTO> {}

// Carousel Image DTOs
export interface CreateCarouselImageDTO {
  imageUrl: string;
  altText?: string;
  order?: number;
  isActive?: boolean;
}

export interface UpdateCarouselImageDTO extends Partial<CreateCarouselImageDTO> {}
