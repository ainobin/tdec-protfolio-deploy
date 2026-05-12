/**
 * Models Layer - Database Access Layer
 * 
 * This layer provides a clean abstraction over database operations.
 * Each model handles CRUD operations for its respective collection.
 * 
 * Benefits:
 * - Centralized database logic
 * - Consistent error handling
 * - Easy to test and maintain
 * - Keeps API routes clean and focused
 */

export { DoctorModel } from './Doctor';
export { ServiceModel } from './Service';
export { GalleryModel } from './Gallery';
export { AdModel } from './Ad';
export { CarouselImageModel } from './CarouselImage';
