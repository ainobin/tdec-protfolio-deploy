import { NextRequest, NextResponse } from 'next/server';
import { withAuth } from '@/lib/middleware';
import { DoctorModel } from '@/models';

/**
 * POST /api/doctors/featured
 * Protected endpoint - Toggle doctor featured status (only one can be featured at a time)
 */
export async function POST(request: NextRequest) {
  return withAuth(request, async (req) => {
    try {
      const body = await req.json();
      const { id, isFeatured } = body;
      
      if (!id) {
        return NextResponse.json(
          { success: false, error: 'Doctor ID is required' },
          { status: 400 }
        );
      }
      
      let success = false;
      
      if (isFeatured) {
        // Set this doctor as featured and unfeature all others
        success = await DoctorModel.setAsFeatured(parseInt(id));
      } else {
        // Just remove featured status from this doctor
        success = await DoctorModel.removeFeatured(parseInt(id));
      }
      
      if (!success) {
        return NextResponse.json(
          { success: false, error: 'Doctor not found' },
          { status: 404 }
        );
      }
      
      return NextResponse.json({
        success: true,
        message: isFeatured 
          ? 'Doctor set as Top Doctor successfully' 
          : 'Doctor removed from Top Doctor successfully'
      });
    } catch (error) {
      console.error('Error updating doctor featured status:', error);
      return NextResponse.json(
        { success: false, error: 'Failed to update doctor featured status' },
        { status: 500 }
      );
    }
  });
}