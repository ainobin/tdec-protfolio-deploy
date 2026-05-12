import { NextResponse } from 'next/server';
import { AdModel } from '@/models';

// Ensure this route is always dynamic and not cached
export const dynamic = 'force-dynamic';
export const revalidate = 0;

/**
 * GET /api/ads/active
 * Public endpoint - Retrieve currently active ad
 * Returns the latest created active ad if multiple exist
 */
export async function GET() {
  try {
    const activeAds = await AdModel.findActive();
    
    console.log(`Found ${activeAds.length} active ads`);
    if (activeAds.length > 0) {
      console.log('Active ad:', JSON.stringify(activeAds[0], null, 2));
    }
    
    // Return the latest created ad if multiple active ads exist
    const activeAd = activeAds.length > 0 ? activeAds[0] : null;
    
    return NextResponse.json({ 
      success: true, 
      data: activeAd 
    });
  } catch (error) {
    console.error('Error fetching active ads:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch active ads' },
      { status: 500 }
    );
  }
}
