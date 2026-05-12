import { NextRequest, NextResponse } from 'next/server';
import { withAuth } from '@/lib/middleware';
import { ServiceModel } from '@/models';

/**
 * GET /api/services
 * Public endpoint - Retrieve all services
 */
export async function GET() {
  try {
    const services = await ServiceModel.findAll();
    return NextResponse.json({ success: true, data: services });
  } catch (error) {
    console.error('Error fetching services:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch services' },
      { status: 500 }
    );
  }
}

/**
 * POST /api/services
 * Protected endpoint - Create a new service
 */
export async function POST(request: NextRequest) {
  return withAuth(request, async (req) => {
    try {
      const body = await req.json();
      console.log('Received service data:', body);
      
      // Validate input
      const validation = ServiceModel.validate(body);
      console.log('Validation result:', validation);
      if (!validation.valid) {
        return NextResponse.json(
          { success: false, error: 'Validation failed', details: validation.errors },
          { status: 400 }
        );
      }
      
      const newService = await ServiceModel.create(body);
      
      return NextResponse.json({
        success: true,
        data: newService,
        message: 'Service created successfully'
      });
    } catch (error) {
      console.error('Error creating service:', error);
      return NextResponse.json(
        { success: false, error: 'Failed to create service' },
        { status: 500 }
      );
    }
  });
}

/**
 * PUT /api/services
 * Protected endpoint - Update an existing service
 */
export async function PUT(request: NextRequest) {
  return withAuth(request, async (req) => {
    try {
      const body = await req.json();
      const { id, ...updateData } = body;
      
      if (!id) {
        return NextResponse.json(
          { success: false, error: 'Service ID is required' },
          { status: 400 }
        );
      }
      
      // Validate update data - use partial validation for updates
      const validation = ServiceModel.validate(updateData, true);
      if (!validation.valid) {
        return NextResponse.json(
          { success: false, error: 'Validation failed', details: validation.errors },
          { status: 400 }
        );
      }
      
      const updated = await ServiceModel.update(parseInt(id), updateData);
      
      if (!updated) {
        return NextResponse.json(
          { success: false, error: 'Service not found' },
          { status: 404 }
        );
      }
      
      return NextResponse.json({
        success: true,
        message: 'Service updated successfully'
      });
    } catch (error) {
      console.error('Error updating service:', error);
      return NextResponse.json(
        { success: false, error: 'Failed to update service' },
        { status: 500 }
      );
    }
  });
}

/**
 * DELETE /api/services
 * Protected endpoint - Delete a service by ID
 */
export async function DELETE(request: NextRequest) {
  return withAuth(request, async (req) => {
    try {
      const { searchParams } = new URL(req.url);
      const id = searchParams.get('id');
      
      if (!id) {
        return NextResponse.json(
          { success: false, error: 'Service ID is required' },
          { status: 400 }
        );
      }
      
      const deleted = await ServiceModel.delete(parseInt(id));
      
      if (!deleted) {
        return NextResponse.json(
          { success: false, error: 'Service not found' },
          { status: 404 }
        );
      }
      
      return NextResponse.json({
        success: true,
        message: 'Service deleted successfully'
      });
    } catch (error) {
      console.error('Error deleting service:', error);
      return NextResponse.json(
        { success: false, error: 'Failed to delete service' },
        { status: 500 }
      );
    }
  });
}
