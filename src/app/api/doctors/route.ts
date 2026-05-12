import { NextRequest, NextResponse } from 'next/server';
import { withAuth } from '@/lib/middleware';
import { DoctorModel } from '@/models';

/**
 * GET /api/doctors
 * Public endpoint - Retrieve all doctors
 */
export async function GET() {
  try {
    const doctors = await DoctorModel.findAll();
    return NextResponse.json({ success: true, data: doctors });
  } catch (error) {
    console.error('Error fetching doctors:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch doctors' },
      { status: 500 }
    );
  }
}

/**
 * POST /api/doctors
 * Protected endpoint - Create a new doctor
 */
export async function POST(request: NextRequest) {
  return withAuth(request, async (req) => {
    try {
      const body = await req.json();
      console.log('Received doctor data:', body);
      
      // Validate input
      const validation = DoctorModel.validate(body);
      console.log('Validation result:', validation);
      if (!validation.valid) {
        return NextResponse.json(
          { success: false, error: 'Validation failed', details: validation.errors },
          { status: 400 }
        );
      }
      
      // Check if this doctor should be featured
      const shouldBeFeatured = body.isFeatured === true;
      
      // Remove isFeatured from body before creating (we'll set it after)
      const { isFeatured, ...doctorData } = body;
      
      const newDoctor = await DoctorModel.create(doctorData);
      
      // If should be featured, set as featured (this will unfeature all others)
      if (shouldBeFeatured) {
        await DoctorModel.setAsFeatured(newDoctor.id);
      }
      
      return NextResponse.json({
        success: true,
        data: newDoctor,
        message: 'Doctor created successfully'
      });
    } catch (error) {
      console.error('Error creating doctor:', error);
      return NextResponse.json(
        { success: false, error: 'Failed to create doctor' },
        { status: 500 }
      );
    }
  });
}

/**
 * PUT /api/doctors
 * Protected endpoint - Update an existing doctor
 */
export async function PUT(request: NextRequest) {
  return withAuth(request, async (req) => {
    try {
      const body = await req.json();
      const { id, ...updateData } = body;
      
      if (!id) {
        return NextResponse.json(
          { success: false, error: 'Doctor ID is required' },
          { status: 400 }
        );
      }
      
      // Check if this update is setting this doctor as featured
      const shouldBeFeatured = updateData.isFeatured === true;
      
      // Validate update data - use partial validation for updates
      const validation = DoctorModel.validate(updateData, true);
      if (!validation.valid) {
        return NextResponse.json(
          { success: false, error: 'Validation failed', details: validation.errors },
          { status: 400 }
        );
      }
      
      // If setting as featured, use setAsFeatured which unfeatures all others first
      if (shouldBeFeatured) {
        await DoctorModel.setAsFeatured(parseInt(id));
      }
      
      // Remove isFeatured from updateData (already handled by setAsFeatured if needed)
      const { isFeatured, ...dataWithoutFeatured } = updateData;
      
      const updated = await DoctorModel.update(parseInt(id), dataWithoutFeatured);
      
      if (!updated) {
        return NextResponse.json(
          { success: false, error: 'Doctor not found' },
          { status: 404 }
        );
      }
      
      return NextResponse.json({
        success: true,
        message: 'Doctor updated successfully'
      });
    } catch (error) {
      console.error('Error updating doctor:', error);
      return NextResponse.json(
        { success: false, error: 'Failed to update doctor' },
        { status: 500 }
      );
    }
  });
}

/**
 * DELETE /api/doctors
 * Protected endpoint - Delete a doctor by ID
 */
export async function DELETE(request: NextRequest) {
  return withAuth(request, async (req) => {
    try {
      const { searchParams } = new URL(req.url);
      const id = searchParams.get('id');
      
      if (!id) {
        return NextResponse.json(
          { success: false, error: 'Doctor ID is required' },
          { status: 400 }
        );
      }
      
      const deleted = await DoctorModel.delete(parseInt(id));
      
      if (!deleted) {
        return NextResponse.json(
          { success: false, error: 'Doctor not found' },
          { status: 404 }
        );
      }
      
      return NextResponse.json({
        success: true,
        message: 'Doctor deleted successfully'
      });
    } catch (error) {
      console.error('Error deleting doctor:', error);
      return NextResponse.json(
        { success: false, error: 'Failed to delete doctor' },
        { status: 500 }
      );
    }
  });
}
