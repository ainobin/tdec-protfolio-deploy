import { CarouselImage } from '@/types';
import { getCollection } from '@/lib/mongodb';

export class CarouselImageModel {
  private static collectionName = 'carouselImages';

  /**
   * Get all carousel images sorted by order
   */
  static async findAll(): Promise<CarouselImage[]> {
    const collection = await getCollection<CarouselImage>(this.collectionName);
    return collection.find({}).sort({ order: 1 }).toArray();
  }

  /**
   * Get all active carousel images sorted by order
   */
  static async findActive(): Promise<CarouselImage[]> {
    const collection = await getCollection<CarouselImage>(this.collectionName);
    return collection.find({ isActive: true }).sort({ order: 1 }).toArray();
  }

  /**
   * Find a carousel image by ID
   */
  static async findById(id: string): Promise<CarouselImage | null> {
    const collection = await getCollection<CarouselImage>(this.collectionName);
    return collection.findOne({ id });
  }

  /**
   * Create a new carousel image with generated ID
   */
  static async create(imageData: Omit<CarouselImage, 'id' | 'createdAt' | 'updatedAt'>): Promise<CarouselImage> {
    const collection = await getCollection<CarouselImage>(this.collectionName);
    
    // Generate a unique ID
    const timestamp = Date.now();
    const random = Math.random().toString(36).substring(2, 9);
    const id = `carousel-${timestamp}-${random}`;
    
    // Get the highest order number and increment
    const lastImage = await collection
      .find({})
      .sort({ order: -1 })
      .limit(1)
      .toArray();
    
    const newOrder = lastImage.length > 0 ? lastImage[0].order + 1 : 0;
    
    const now = new Date().toISOString();
    const newImage: CarouselImage = {
      ...imageData,
      id,
      order: imageData.order ?? newOrder,
      isActive: imageData.isActive ?? true,
      createdAt: now,
      updatedAt: now,
    };
    
    await collection.insertOne(newImage as any);
    return newImage;
  }

  /**
   * Update a carousel image by ID
   */
  static async update(id: string, updateData: Partial<Omit<CarouselImage, 'id' | 'createdAt'>>): Promise<boolean> {
    const collection = await getCollection<CarouselImage>(this.collectionName);
    
    // Add updatedAt timestamp
    updateData.updatedAt = new Date().toISOString();
    
    const result = await collection.updateOne(
      { id },
      { $set: updateData }
    );
    
    return result.matchedCount > 0;
  }

  /**
   * Delete a carousel image by ID
   */
  static async delete(id: string): Promise<boolean> {
    const collection = await getCollection<CarouselImage>(this.collectionName);
    const result = await collection.deleteOne({ id });
    return result.deletedCount > 0;
  }

  /**
   * Reorder carousel images
   */
  static async reorder(imageIds: string[]): Promise<boolean> {
    const collection = await getCollection<CarouselImage>(this.collectionName);
    
    try {
      // Update each image's order based on its position in the array
      const bulkOps = imageIds.map((id, index) => ({
        updateOne: {
          filter: { id },
          update: { $set: { order: index, updatedAt: new Date().toISOString() } }
        }
      }));
      
      await collection.bulkWrite(bulkOps as any);
      return true;
    } catch (error) {
      console.error('Error reordering carousel images:', error);
      return false;
    }
  }

  /**
   * Validate carousel image data
   */
  static validate(data: any): { valid: boolean; errors: string[] } {
    const errors: string[] = [];

    if (!data.imageUrl || data.imageUrl.trim().length === 0) {
      errors.push('Image URL is required');
    }

    // Validate order if provided
    if (data.order !== undefined && (typeof data.order !== 'number' || data.order < 0)) {
      errors.push('Order must be a non-negative number');
    }

    // Validate isActive if provided
    if (data.isActive !== undefined && typeof data.isActive !== 'boolean') {
      errors.push('isActive must be a boolean');
    }

    return {
      valid: errors.length === 0,
      errors,
    };
  }
}
