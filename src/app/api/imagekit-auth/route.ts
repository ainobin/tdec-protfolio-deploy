import { NextRequest, NextResponse } from 'next/server';
import { imagekit } from '@/lib/imagekit';
import { verifyAuthToken } from '@/lib/middleware';

/**
 * Authentication endpoint for ImageKit client-side uploads
 * This generates authentication parameters that can be used
 * for direct browser-to-ImageKit uploads
 */
export async function GET(request: NextRequest) {
  try {
    // Verify admin authentication
    const authResult = await verifyAuthToken(request);
    if (!authResult.authenticated) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      );
    }

    // Generate authentication parameters
    const authParams = imagekit.getAuthenticationParameters();

    return NextResponse.json({
      success: true,
      data: authParams,
    });
  } catch (error) {
    console.error('ImageKit auth error:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to generate authentication parameters' 
      },
      { status: 500 }
    );
  }
}
