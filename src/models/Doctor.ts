import { Doctor, ScheduleSlot } from '@/types';
import { getCollection } from '@/lib/mongodb';

export class DoctorModel {
  private static collectionName = 'doctors';

  /**
   * Get all doctors sorted by ID
   */
  static async findAll(): Promise<Doctor[]> {
    const collection = await getCollection<Doctor>(this.collectionName);
    return collection.find({}).sort({ id: 1 }).toArray();
  }

  /**
   * Find a doctor by ID
   */
  static async findById(id: number): Promise<Doctor | null> {
    const collection = await getCollection<Doctor>(this.collectionName);
    return collection.findOne({ id });
  }

  /**
   * Create a new doctor with auto-incremented ID
   */
  static async create(doctorData: Omit<Doctor, 'id'>): Promise<Doctor> {
    const collection = await getCollection<Doctor>(this.collectionName);
    
    // Get the highest ID and increment
    const lastDoctor = await collection
      .find({})
      .sort({ id: -1 })
      .limit(1)
      .toArray();
    
    const newId = lastDoctor.length > 0 ? lastDoctor[0].id + 1 : 1;
    
    const newDoctor: Doctor = {
      ...doctorData,
      id: newId,
    };
    
    await collection.insertOne(newDoctor as any);
    return newDoctor;
  }

  /**
   * Update a doctor by ID
   */
  static async update(id: number, updateData: Partial<Omit<Doctor, 'id'>>): Promise<boolean> {
    const collection = await getCollection<Doctor>(this.collectionName);
    
    const result = await collection.updateOne(
      { id },
      { $set: updateData }
    );
    
    return result.matchedCount > 0;
  }

  /**
   * Delete a doctor by ID
   */
  static async delete(id: number): Promise<boolean> {
    const collection = await getCollection<Doctor>(this.collectionName);
    
    const result = await collection.deleteOne({ id });
    return result.deletedCount > 0;
  }

  /**
   * Set a doctor as featured and unfeature all others
   */
  static async setAsFeatured(id: number): Promise<boolean> {
    const collection = await getCollection<Doctor>(this.collectionName);
    
    // First, unfeature all doctors
    await collection.updateMany(
      {},
      { $set: { isFeatured: false } }
    );
    
    // Then, feature the selected doctor
    const result = await collection.updateOne(
      { id },
      { $set: { isFeatured: true } }
    );
    
    return result.matchedCount > 0;
  }

  /**
   * Remove featured status from a doctor
   */
  static async removeFeatured(id: number): Promise<boolean> {
    const collection = await getCollection<Doctor>(this.collectionName);
    
    const result = await collection.updateOne(
      { id },
      { $set: { isFeatured: false } }
    );
    
    return result.matchedCount > 0;
  }

  /**
   * Validate doctor data before create/update
   */
  static validate(data: Partial<Doctor>, isPartialUpdate: boolean = false): { valid: boolean; errors: string[] } {
    const errors: string[] = [];

    // For partial updates, only validate fields that are present
    if (!isPartialUpdate) {
      // Full validation for create operations
      if (!data.name || data.name.trim().length < 2) {
        errors.push('Name must be at least 2 characters');
      }

      if (!data.nameBn || data.nameBn.trim().length < 2) {
        errors.push('Bengali name must be at least 2 characters');
      }

      if (!data.specialization || data.specialization.trim().length < 2) {
        errors.push('Specialization must be at least 2 characters');
      }

      if (!data.specializationBn || data.specializationBn.trim().length < 2) {
        errors.push('Bengali specialization must be at least 2 characters');
      }

      if (!data.qualification || data.qualification.trim().length < 2) {
        errors.push('Qualification must be at least 2 characters');
      }

      if (!data.image || data.image.trim().length === 0) {
        errors.push('Doctor image is required');
      }

      if (!data.schedules || !Array.isArray(data.schedules) || data.schedules.length === 0) {
        errors.push('At least one schedule slot is required');
      } else {
        // Validate schedule slots
        const scheduleValidation = DoctorModel.validateSchedules(data.schedules);
        if (!scheduleValidation.valid) {
          errors.push(...scheduleValidation.errors);
        }
      }
    } else {
      // Partial validation - only validate present fields
      if (data.name !== undefined && (!data.name || data.name.trim().length < 2)) {
        errors.push('Name must be at least 2 characters');
      }

      if (data.nameBn !== undefined && (!data.nameBn || data.nameBn.trim().length < 2)) {
        errors.push('Bengali name must be at least 2 characters');
      }

      if (data.specialization !== undefined && (!data.specialization || data.specialization.trim().length < 2)) {
        errors.push('Specialization must be at least 2 characters');
      }

      if (data.specializationBn !== undefined && (!data.specializationBn || data.specializationBn.trim().length < 2)) {
        errors.push('Bengali specialization must be at least 2 characters');
      }

      if (data.qualification !== undefined && (!data.qualification || data.qualification.trim().length < 2)) {
        errors.push('Qualification must be at least 2 characters');
      }

      if (data.image !== undefined && (!data.image || data.image.trim().length === 0)) {
        errors.push('Doctor image is required');
      }

      if (data.schedules !== undefined) {
        if (!Array.isArray(data.schedules) || data.schedules.length === 0) {
          errors.push('At least one schedule slot is required');
        } else {
          // Validate schedule slots
          const scheduleValidation = DoctorModel.validateSchedules(data.schedules);
          if (!scheduleValidation.valid) {
            errors.push(...scheduleValidation.errors);
          }
        }
      }
    }

    // Consultation fee validation (optional but must be non-negative if provided)
    if (data.consultationFee !== undefined && data.consultationFee < 0) {
      errors.push('Consultation fee cannot be negative');
    }

    return { valid: errors.length === 0, errors };
  }

  /**
   * Validate schedule slots - max 7 unique days, no duplicates
   */
  static validateSchedules(schedules: ScheduleSlot[]): { valid: boolean; errors: string[] } {
    const errors: string[] = [];

    if (!schedules || !Array.isArray(schedules)) {
      errors.push('Schedules must be an array');
      return { valid: false, errors };
    }

    // Validate each schedule slot
    schedules.forEach((schedule, index) => {
      if (!schedule.day || !schedule.dayBn || !schedule.startTime || !schedule.endTime) {
        errors.push(`Schedule ${index + 1}: All schedule fields are required`);
      }
    });

    // Check for duplicate days
    const days = schedules.map(s => s.day);
    const uniqueDays = new Set(days);
    
    if (days.length !== uniqueDays.size) {
      const duplicates = days.filter((day, index) => days.indexOf(day) !== index);
      errors.push(`Duplicate days found: ${[...new Set(duplicates)].join(', ')}. Each day can only be scheduled once.`);
    }

    // Check max 7 unique days
    if (uniqueDays.size > 7) {
      errors.push(`Cannot have more than 7 unique days. You have ${uniqueDays.size} unique days.`);
    }

    return { valid: errors.length === 0, errors };
  }
}
