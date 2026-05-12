import { NextRequest, NextResponse } from "next/server";
import { withAuth } from "@/lib/middleware";
import { AdModel } from "@/models";

/**
 * GET /api/ads
 * Protected endpoint - Retrieve all ads (admin only)
 */
export async function GET(request: NextRequest) {
  return withAuth(request, async (req) => {
    try {
      const ads = await AdModel.findAll();
      return NextResponse.json({ success: true, data: ads });
    } catch (error) {
      console.error("Error fetching ads:", error);
      return NextResponse.json(
        { success: false, error: "Failed to fetch ads" },
        { status: 500 },
      );
    }
  });
}

/**
 * POST /api/ads
 * Protected endpoint - Create a new ad
 */
export async function POST(request: NextRequest) {
  return withAuth(request, async (req) => {
    try {
      const body = await req.json();
      console.log("Received ad data:", body);

      // Set default startTime to current UTC time if not provided
      if (!body.startTime) {
        body.startTime = new Date().toISOString(); // UTC time
      }

      // Ensure times are stored as ISO strings (UTC)
      if (body.startTime && typeof body.startTime === "string") {
        body.startTime = new Date(body.startTime).toISOString();
      }
      if (body.endTime && typeof body.endTime === "string") {
        body.endTime = new Date(body.endTime).toISOString();
      }

      // Validate input
      const validation = AdModel.validate(body);
      console.log("Validation result:", validation);
      if (!validation.valid) {
        return NextResponse.json(
          {
            success: false,
            error: "Validation failed",
            details: validation.errors,
          },
          { status: 400 },
        );
      }

      const newAd = await AdModel.create(body);

      return NextResponse.json({
        success: true,
        data: newAd,
        message: "Ad created successfully",
      });
    } catch (error) {
      console.error("Error creating ad:", error);
      return NextResponse.json(
        { success: false, error: "Failed to create ad" },
        { status: 500 },
      );
    }
  });
}

/**
 * PUT /api/ads
 * Protected endpoint - Update an existing ad
 */
export async function PUT(request: NextRequest) {
  return withAuth(request, async (req) => {
    try {
      const body = await req.json();
      const { id, ...updateData } = body;

      if (!id) {
        return NextResponse.json(
          { success: false, error: "Ad ID is required" },
          { status: 400 },
        );
      }

      // Ensure times are stored as ISO strings (UTC)
      if (updateData.startTime && typeof updateData.startTime === "string") {
        updateData.startTime = new Date(updateData.startTime).toISOString();
      }
      if (updateData.endTime && typeof updateData.endTime === "string") {
        updateData.endTime = new Date(updateData.endTime).toISOString();
      }

      // Validate update data
      const validation = AdModel.validate({
        ...updateData,
        type: updateData.type || "text",
        endTime: updateData.endTime || new Date(),
      });
      if (!validation.valid) {
        return NextResponse.json(
          {
            success: false,
            error: "Validation failed",
            details: validation.errors,
          },
          { status: 400 },
        );
      }

      const updated = await AdModel.update(id, updateData);

      if (!updated) {
        return NextResponse.json(
          { success: false, error: "Ad not found" },
          { status: 404 },
        );
      }

      return NextResponse.json({
        success: true,
        message: "Ad updated successfully",
      });
    } catch (error) {
      console.error("Error updating ad:", error);
      return NextResponse.json(
        { success: false, error: "Failed to update ad" },
        { status: 500 },
      );
    }
  });
}

/**
 * DELETE /api/ads
 * Protected endpoint - Delete an ad
 */
export async function DELETE(request: NextRequest) {
  return withAuth(request, async (req) => {
    try {
      const body = await req.json();
      const id = body.id; // now comes from request body

      if (!id) {
        return NextResponse.json(
          { success: false, error: "Ad ID is required" },
          { status: 400 },
        );
      }

      const deleted = await AdModel.delete(id);

      if (!deleted) {
        return NextResponse.json(
          { success: false, error: "Ad not found" },
          { status: 404 },
        );
      }

      return NextResponse.json({
        success: true,
        message: "Ad deleted successfully",
      });
    } catch (error) {
      console.error("Error deleting ad:", error);
      return NextResponse.json(
        { success: false, error: "Failed to delete ad" },
        { status: 500 },
      );
    }
  });
}
