import { NextRequest, NextResponse } from 'next/server';
import { withAuth } from '@/lib/middleware';
import { GalleryModel } from '@/models';

/**
 * GET /api/gallery
 * Public endpoint - Retrieve gallery items
 * Supports filtering by type via query param: ?type=image|video|all
 */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const typeFilter = searchParams.get('type');
    
    let gallery;
    if (typeFilter && typeFilter !== 'all' && (typeFilter === 'image' || typeFilter === 'video')) {
      gallery = await GalleryModel.findByType(typeFilter);
    } else {
      gallery = await GalleryModel.findAll();
    }
    
    return NextResponse.json({ success: true, data: gallery });
  } catch (error) {
    console.error('Error fetching gallery:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch gallery' },
      { status: 500 }
    );
  }
}

/**
 * POST /api/gallery
 * Protected endpoint - Create a new gallery item
 */
export async function POST(request: NextRequest) {
  return withAuth(request, async (req) => {
    try {
      const body = await req.json();
      console.log('Received gallery item data:', body);
      
      // Validate input
      const validation = GalleryModel.validate(body);
      console.log('Validation result:', validation);
      if (!validation.valid) {
        return NextResponse.json(
          { success: false, error: 'Validation failed', details: validation.errors },
          { status: 400 }
        );
      }
      
      const newItem = await GalleryModel.create(body);
      
      return NextResponse.json({
        success: true,
        data: newItem,
        message: 'Gallery item created successfully'
      });
    } catch (error) {
      console.error('Error creating gallery item:', error);
      return NextResponse.json(
        { success: false, error: 'Failed to create gallery item' },
        { status: 500 }
      );
    }
  });
}

/**
 * PUT /api/gallery
 * Protected endpoint - Update an existing gallery item
 */
export async function PUT(request: NextRequest) {
  return withAuth(request, async (req) => {
    try {
      const body = await req.json();
      const { id, ...updateData } = body;
      
      if (!id) {
        return NextResponse.json(
          { success: false, error: 'Gallery item ID is required' },
          { status: 400 }
        );
      }
      
      // Validate update data
      const validation = GalleryModel.validate(updateData);
      if (!validation.valid) {
        return NextResponse.json(
          { success: false, error: 'Validation failed', details: validation.errors },
          { status: 400 }
        );
      }
      
      const updated = await GalleryModel.update(id, updateData);
      
      if (!updated) {
        return NextResponse.json(
          { success: false, error: 'Gallery item not found' },
          { status: 404 }
        );
      }
      
      return NextResponse.json({
        success: true,
        message: 'Gallery item updated successfully'
      });
    } catch (error) {
      console.error('Error updating gallery item:', error);
      return NextResponse.json(
        { success: false, error: 'Failed to update gallery item' },
        { status: 500 }
      );
    }
  });
}

/**
 * DELETE /api/gallery
 * Protected endpoint - Delete a gallery item by ID
 */
export async function DELETE(request: NextRequest) {
  return withAuth(request, async (req) => {
    try {
      const { searchParams } = new URL(req.url);
      const id = searchParams.get('id');
      
      if (!id) {
        return NextResponse.json(
          { success: false, error: 'Gallery item ID is required' },
          { status: 400 }
        );
      }
      
      const deleted = await GalleryModel.delete(id);
      
      if (!deleted) {
        return NextResponse.json(
          { success: false, error: 'Gallery item not found' },
          { status: 404 }
        );
      }
      
      return NextResponse.json({
        success: true,
        message: 'Gallery item deleted successfully'
      });
    } catch (error) {
      console.error('Error deleting gallery item:', error);
      return NextResponse.json(
        { success: false, error: 'Failed to delete gallery item' },
        { status: 500 }
      );
    }
  });
}
