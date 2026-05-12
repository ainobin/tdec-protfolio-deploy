import { GalleryItem } from '@/types';
import { getCollection } from '@/lib/mongodb';

export class GalleryModel {
  private static collectionName = 'gallery';

  /**
   * Get all gallery items sorted by creation date (newest first)
   */
  static async findAll(): Promise<GalleryItem[]> {
    const collection = await getCollection<GalleryItem>(this.collectionName);
    return collection.find({}).sort({ createdAt: -1 }).toArray();
  }

  /**
   * Get gallery items filtered by type
   */
  static async findByType(type: 'image' | 'video'): Promise<GalleryItem[]> {
    const collection = await getCollection<GalleryItem>(this.collectionName);
    return collection.find({ type }).sort({ createdAt: -1 }).toArray();
  }

  /**
   * Find a gallery item by ID
   */
  static async findById(id: string): Promise<GalleryItem | null> {
    const collection = await getCollection<GalleryItem>(this.collectionName);
    return collection.findOne({ id });
  }

  /**
   * Create a new gallery item with generated ID
   */
  static async create(itemData: Omit<GalleryItem, 'id' | 'createdAt'>): Promise<GalleryItem> {
    const collection = await getCollection<GalleryItem>(this.collectionName);
    
    // Generate a unique ID
    const timestamp = Date.now();
    const random = Math.random().toString(36).substring(2, 9);
    const id = `${itemData.type}-${timestamp}-${random}`;
    
    const newItem: GalleryItem = {
      ...itemData,
      id,
      createdAt: new Date().toISOString(),
    };
    
    await collection.insertOne(newItem as any);
    return newItem;
  }

  /**
   * Update a gallery item by ID
   */
  static async update(id: string, updateData: Partial<Omit<GalleryItem, 'id'>>): Promise<boolean> {
    const collection = await getCollection<GalleryItem>(this.collectionName);
    
    const result = await collection.updateOne(
      { id },
      { $set: updateData }
    );
    
    return result.matchedCount > 0;
  }

  /**
   * Delete a gallery item by ID
   */
  static async delete(id: string): Promise<boolean> {
    const collection = await getCollection<GalleryItem>(this.collectionName);
    
    const result = await collection.deleteOne({ id });
    return result.deletedCount > 0;
  }

  /**
   * Validate gallery item data before create/update
   */
  static validate(data: Partial<GalleryItem>): { valid: boolean; errors: string[] } {
    const errors: string[] = [];

    // Type validation
    if (!data.type) {
      errors.push('Type is required');
    } else if (!['image', 'video'].includes(data.type)) {
      errors.push('Type must be either "image" or "video"');
    }

    // Source validation for images
    if (data.type === 'image') {
      if (!data.src || data.src.trim().length === 0) {
        errors.push('Image source URL is required');
      } else if (!data.src.startsWith('/') && !data.src.startsWith('http')) {
        errors.push('Invalid image source URL format');
      }
    }

    // Video URL validation for videos  
    if (data.type === 'video') {
      if (!data.videoUrl || data.videoUrl.trim().length === 0) {
        errors.push('Video URL is required for video items');
      } else {
        try {
          new URL(data.videoUrl);
        } catch {
          errors.push('Invalid video URL format');
        }
      }
    }

    return {
      valid: errors.length === 0,
      errors,
    };
  }
}
