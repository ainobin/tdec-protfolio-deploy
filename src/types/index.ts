// Schedule Slot Interface
export interface ScheduleSlot {
  day: string;
  dayBn: string;
  startTime: string;
  endTime: string;
}

// Doctor Interface
export interface Doctor {
  id: number;
  name: string;
  nameBn: string;
  specialization: string;
  specializationBn: string;
  qualification: string;
  image: string;
  schedules?: ScheduleSlot[];
  description?: string;
  descriptionBn?: string;
  consultationFee?: number;
  isFeatured?: boolean;
}

// Service Interface
export interface Service {
  id: number;
  title: string;
  titleBn: string;
  description: string;
  descriptionBn: string;
  image?: string;
  price?: number;
}

// Gallery Item Interface
export interface GalleryItem {
  id: string;
  type: 'image' | 'video';
  src: string;
  videoUrl?: string; // For video links from YouTube, Facebook, Instagram
  thumbnail?: string;
  title?: string;
  titleBn?: string;
  createdAt: Date | string;
}

// Ad Interface
export interface Ad {
  id: string;
  type: 'image' | 'text';
  imageUrl?: string;
  textContent?: string;
  startTime: Date | string;
  endTime: Date | string;
  createdAt: Date | string;
}

// Carousel Image Interface
export interface CarouselImage {
  id: string;
  imageUrl: string;
  altText?: string;
  order: number;
  isActive: boolean;
  createdAt: Date | string;
  updatedAt: Date | string;
}

// API Response Types
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface DoctorsResponse extends ApiResponse<Doctor[]> {}
export interface DoctorResponse extends ApiResponse<Doctor> {}
export interface ServicesResponse extends ApiResponse<Service[]> {}
export interface GalleryResponse extends ApiResponse<GalleryItem[]> {}
export interface AdsResponse extends ApiResponse<Ad[]> {}
export interface CarouselImagesResponse extends ApiResponse<CarouselImage[]> {}

// Export DTOs
export * from './dto';
