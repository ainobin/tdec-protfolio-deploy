import { Service } from '@/types';
import { getCollection } from '@/lib/mongodb';

export class ServiceModel {
  private static collectionName = 'services';

  /**
   * Get all services sorted by ID
   */
  static async findAll(): Promise<Service[]> {
    const collection = await getCollection<Service>(this.collectionName);
    return collection.find({}).sort({ id: 1 }).toArray();
  }

  /**
   * Find a service by ID
   */
  static async findById(id: number): Promise<Service | null> {
    const collection = await getCollection<Service>(this.collectionName);
    return collection.findOne({ id });
  }

  /**
   * Create a new service with auto-incremented ID
   */
  static async create(serviceData: Omit<Service, 'id'>): Promise<Service> {
    const collection = await getCollection<Service>(this.collectionName);
    
    // Get the highest ID and increment
    const lastService = await collection
      .find({})
      .sort({ id: -1 })
      .limit(1)
      .toArray();
    
    const newId = lastService.length > 0 ? lastService[0].id + 1 : 1;
    
    const newService: Service = {
      ...serviceData,
      id: newId,
    };
    
    await collection.insertOne(newService as any);
    return newService;
  }

  /**
   * Update a service by ID
   */
  static async update(id: number, updateData: Partial<Omit<Service, 'id'>>): Promise<boolean> {
    const collection = await getCollection<Service>(this.collectionName);
    
    // Remove any potential id or _id fields from updateData to prevent MongoDB errors
    const { id: _, _id, ...cleanUpdateData } = updateData as any;
    
    const result = await collection.updateOne(
      { id },
      { $set: cleanUpdateData }
    );
    
    return result.matchedCount > 0;
  }

  /**
   * Delete a service by ID
   */
  static async delete(id: number): Promise<boolean> {
    const collection = await getCollection<Service>(this.collectionName);
    
    const result = await collection.deleteOne({ id });
    return result.deletedCount > 0;
  }

  /**
   * Validate service data before create/update
   */
  static validate(data: Partial<Service>, isPartialUpdate: boolean = false): { valid: boolean; errors: string[] } {
    const errors: string[] = [];

    if (!isPartialUpdate) {
      // Full validation for create operations
      if (!data.title || data.title.trim().length < 2) {
        errors.push('Title must be at least 2 characters');
      }

      if (!data.titleBn || data.titleBn.trim().length < 2) {
        errors.push('Bengali title must be at least 2 characters');
      }

      if (!data.description || data.description.trim().length < 10) {
        errors.push('Description must be at least 10 characters');
      }

      if (!data.descriptionBn || data.descriptionBn.trim().length < 10) {
        errors.push('Bengali description must be at least 10 characters');
      }
    } else {
      // Partial validation - only validate present fields
      if (data.title !== undefined && (!data.title || data.title.trim().length < 2)) {
        errors.push('Title must be at least 2 characters');
      }

      if (data.titleBn !== undefined && (!data.titleBn || data.titleBn.trim().length < 2)) {
        errors.push('Bengali title must be at least 2 characters');
      }

      if (data.description !== undefined && (!data.description || data.description.trim().length < 10)) {
        errors.push('Description must be at least 10 characters');
      }

      if (data.descriptionBn !== undefined && (!data.descriptionBn || data.descriptionBn.trim().length < 10)) {
        errors.push('Bengali description must be at least 10 characters');
      }
    }

    // Price validation (optional but must be non-negative if provided)
    if (data.price !== undefined && data.price < 0) {
      errors.push('Price cannot be negative');
    }

    return {
      valid: errors.length === 0,
      errors,
    };
  }
}
