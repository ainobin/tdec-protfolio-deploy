import { Ad } from '@/types';
import { getCollection } from '@/lib/mongodb';

export class AdModel {
  private static collectionName = 'ads';

  /**
   * Get all ads sorted by creation date (newest first)
   */
  static async findAll(): Promise<Ad[]> {
    const collection = await getCollection<Ad>(this.collectionName);
    return collection.find({}).sort({ createdAt: -1 }).toArray();
  }

  /**
   * Find an ad by ID
   */
  static async findById(id: string): Promise<Ad | null> {
    const collection = await getCollection<Ad>(this.collectionName);
    return collection.findOne({ id });
  }

  /**
   * Get currently active ads based on current UTC time
   */
  static async findActive(): Promise<Ad[]> {
    const collection = await getCollection<Ad>(this.collectionName);
    // Use UTC time for consistent cross-timezone behavior
    const nowUTC = new Date();
    const nowISOString = nowUTC.toISOString();
    
    console.log('Finding active ads at UTC time:', nowISOString);
    
    return collection
      .find({
        startTime: { $lte: nowISOString },
        endTime: { $gte: nowISOString }
      })
      .sort({ createdAt: -1 })
      .toArray();
  }

  /**
   * Create a new ad with generated ID
   */
  static async create(adData: Omit<Ad, 'id' | 'createdAt'>): Promise<Ad> {
    const collection = await getCollection<Ad>(this.collectionName);
    
    // Generate a unique ID
    const timestamp = Date.now();
    const random = Math.random().toString(36).substring(2, 9);
    const id = `ad-${timestamp}-${random}`;
    
    const newAd: Ad = {
      ...adData,
      id,
      createdAt: new Date().toISOString(), // Stored in UTC
    };
    
    console.log('Creating ad with data:', JSON.stringify({
      id: newAd.id,
      type: newAd.type,
      startTime: newAd.startTime,
      endTime: newAd.endTime,
      createdAt: newAd.createdAt
    }, null, 2));
    
    await collection.insertOne(newAd as any);
    return newAd;
  }

  /**
   * Update an ad by ID
   */
  static async update(id: string, updateData: Partial<Omit<Ad, 'id' | 'createdAt'>>): Promise<boolean> {
    const collection = await getCollection<Ad>(this.collectionName);
    
    const result = await collection.updateOne(
      { id },
      { $set: updateData }
    );
    
    return result.matchedCount > 0;
  }

  /**
   * Delete an ad by ID
   */
  static async delete(id: string): Promise<boolean> {
    const collection = await getCollection<Ad>(this.collectionName);
    const result = await collection.deleteOne({ id });
    return result.deletedCount > 0;
  }

  /**
   * Validate ad data
   */
  static validate(data: any): { valid: boolean; errors: string[] } {
    const errors: string[] = [];

    if (!data.type || !['image', 'text'].includes(data.type)) {
      errors.push('Type must be either "image" or "text"');
    }

    if (data.type === 'image' && !data.imageUrl) {
      errors.push('Image URL is required for image ads');
    }

    if (data.type === 'text' && !data.textContent) {
      errors.push('Text content is required for text ads');
    }

    if (!data.endTime) {
      errors.push('End time is required');
    }

    // Validate dates
    if (data.startTime && data.endTime) {
      const start = new Date(data.startTime);
      const end = new Date(data.endTime);
      
      if (isNaN(start.getTime())) {
        errors.push('Invalid start time');
      }
      
      if (isNaN(end.getTime())) {
        errors.push('Invalid end time');
      }
      
      if (start >= end) {
        errors.push('End time must be after start time');
      }
    }

    return {
      valid: errors.length === 0,
      errors,
    };
  }
}
