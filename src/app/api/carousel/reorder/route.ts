import { NextRequest, NextResponse } from 'next/server';
import { withAuth } from '@/lib/middleware';
import { CarouselImageModel } from '@/models';

/**
 * POST /api/carousel/reorder
 * Protected endpoint - Reorder carousel images
 */
export async function POST(request: NextRequest) {
  return withAuth(request, async (req) => {
    try {
      const body = await req.json();
      const { imageIds } = body;
      
      if (!imageIds || !Array.isArray(imageIds) || imageIds.length === 0) {
        return NextResponse.json(
          { success: false, error: 'Image IDs array is required' },
          { status: 400 }
        );
      }
      
      const success = await CarouselImageModel.reorder(imageIds);
      
      if (!success) {
        return NextResponse.json(
          { success: false, error: 'Failed to reorder carousel images' },
          { status: 500 }
        );
      }
      
      return NextResponse.json({
        success: true,
        message: 'Carousel images reordered successfully'
      });
    } catch (error) {
      console.error('Error reordering carousel images:', error);
      return NextResponse.json(
        { success: false, error: 'Failed to reorder carousel images' },
        { status: 500 }
      );
    }
  });
}
