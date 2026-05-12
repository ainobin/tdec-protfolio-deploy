import { NextRequest, NextResponse } from 'next/server';
import { DoctorModel } from '@/models';

interface Params {
  id: string;
}

/**
 * GET /api/doctors/[id]
 * Retrieve a single doctor by ID
 */
export async function GET(
  request: NextRequest,
  context: { params: Promise<Params> }
): Promise<NextResponse> {
  try {
    const { id } = await context.params;
    
    // Validate ID format
    const doctorId = parseInt(id);
    if (isNaN(doctorId)) {
      return NextResponse.json(
        { success: false, error: 'Invalid doctor ID format' },
        { status: 400 }
      );
    }

    const doctor = await DoctorModel.findById(doctorId);
    
    if (!doctor) {
      return NextResponse.json(
        { success: false, error: 'Doctor not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: doctor });
  } catch (error) {
    console.error('Error fetching doctor:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch doctor' },
      { status: 500 }
    );
  }
}