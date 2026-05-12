import { NextRequest, NextResponse } from 'next/server';
import { withAuth } from '@/lib/middleware';
import { CarouselImageModel } from '@/models';

/**
 * GET /api/carousel
 * Public endpoint - Retrieve all carousel images (active only for public use)
 */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const includeInactive = searchParams.get('includeInactive') === 'true';
    
    const images = includeInactive 
      ? await CarouselImageModel.findAll()
      : await CarouselImageModel.findActive();
    
    return NextResponse.json({ success: true, data: images });
  } catch (error) {
    console.error('Error fetching carousel images:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch carousel images' },
      { status: 500 }
    );
  }
}

/**
 * POST /api/carousel
 * Protected endpoint - Create a new carousel image
 */
export async function POST(request: NextRequest) {
  return withAuth(request, async (req) => {
    try {
      const body = await req.json();
      console.log('Received carousel image data:', body);
      
      // Validate input
      const validation = CarouselImageModel.validate(body);
      console.log('Validation result:', validation);
      if (!validation.valid) {
        return NextResponse.json(
          { success: false, error: 'Validation failed', details: validation.errors },
          { status: 400 }
        );
      }
      
      const newImage = await CarouselImageModel.create({
        imageUrl: body.imageUrl,
        altText: body.altText,
        order: body.order,
        isActive: body.isActive ?? true,
      });
      
      return NextResponse.json({
        success: true,
        data: newImage,
        message: 'Carousel image created successfully'
      });
    } catch (error) {
      console.error('Error creating carousel image:', error);
      return NextResponse.json(
        { success: false, error: 'Failed to create carousel image' },
        { status: 500 }
      );
    }
  });
}

/**
 * PUT /api/carousel
 * Protected endpoint - Update an existing carousel image
 */
export async function PUT(request: NextRequest) {
  return withAuth(request, async (req) => {
    try {
      const body = await req.json();
      const { id, ...updateData } = body;
      
      if (!id) {
        return NextResponse.json(
          { success: false, error: 'Carousel image ID is required' },
          { status: 400 }
        );
      }
      
      // Validate update data
      const validation = CarouselImageModel.validate({ ...updateData, imageUrl: updateData.imageUrl || 'dummy' });
      if (!validation.valid) {
        return NextResponse.json(
          { success: false, error: 'Validation failed', details: validation.errors },
          { status: 400 }
        );
      }
      
      const updated = await CarouselImageModel.update(id, updateData);
      
      if (!updated) {
        return NextResponse.json(
          { success: false, error: 'Carousel image not found' },
          { status: 404 }
        );
      }
      
      return NextResponse.json({
        success: true,
        message: 'Carousel image updated successfully'
      });
    } catch (error) {
      console.error('Error updating carousel image:', error);
      return NextResponse.json(
        { success: false, error: 'Failed to update carousel image' },
        { status: 500 }
      );
    }
  });
}

/**
 * DELETE /api/carousel
 * Protected endpoint - Delete a carousel image
 */
export async function DELETE(request: NextRequest) {
  return withAuth(request, async (req) => {
    try {
      const { searchParams } = new URL(req.url);
      const id = searchParams.get('id');
      
      if (!id) {
        return NextResponse.json(
          { success: false, error: 'Carousel image ID is required' },
          { status: 400 }
        );
      }
      
      const deleted = await CarouselImageModel.delete(id);
      
      if (!deleted) {
        return NextResponse.json(
          { success: false, error: 'Carousel image not found' },
          { status: 404 }
        );
      }
      
      return NextResponse.json({
        success: true,
        message: 'Carousel image deleted successfully'
      });
    } catch (error) {
      console.error('Error deleting carousel image:', error);
      return NextResponse.json(
        { success: false, error: 'Failed to delete carousel image' },
        { status: 500 }
      );
    }
  });
}
