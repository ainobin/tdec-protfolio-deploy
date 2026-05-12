import { NextRequest, NextResponse } from 'next/server';
import { uploadToImageKit } from '@/lib/imagekit';
import { verifyAuthToken } from '@/lib/middleware';

export const runtime = 'nodejs';

function normalizeFolder(folderValue: FormDataEntryValue | null): string | undefined {
  if (typeof folderValue !== 'string') {
    return undefined;
  }

  const trimmedFolder = folderValue.trim().replace(/^\/+|\/+$/g, '');
  if (!trimmedFolder) {
    return undefined;
  }

  if (!/^[a-zA-Z0-9/_-]+$/.test(trimmedFolder)) {
    throw new Error('Invalid folder name');
  }

  return trimmedFolder;
}

export async function POST(request: NextRequest) {
  try {
    // Verify admin authentication
    const authResult = await verifyAuthToken(request);
    if (!authResult.authenticated) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      );
    }

    // Parse form data
    const formData = await request.formData();
    const fileValue = formData.get('file');
    const folder = normalizeFolder(formData.get('folder'));

    if (!(fileValue instanceof File)) {
      return NextResponse.json(
        { success: false, error: 'No file provided' },
        { status: 400 }
      );
    }

    const file = fileValue;

    // Validate file type
    const allowedTypes = [
      'image/jpeg',
      'image/jpg',
      'image/png',
      'image/gif',
      'image/webp',
      'video/mp4',
      'video/webm',
      'video/ogg',
    ];

    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json(
        { 
          success: false, 
          error: `Invalid file type. Allowed: ${allowedTypes.join(', ')}` 
        },
        { status: 400 }
      );
    }

    // Validate file size (50MB max)
    const maxSize = 50 * 1024 * 1024; // 50MB
    if (file.size > maxSize) {
      return NextResponse.json(
        { success: false, error: 'File size exceeds 50MB limit' },
        { status: 400 }
      );
    }

    // Convert file to buffer
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const uploadResult = await uploadToImageKit(buffer, file.name, folder);

    return NextResponse.json({
      success: true,
      data: {
        url: uploadResult.url,
        fileId: uploadResult.fileId,
        fileName: uploadResult.name,
        fileType: file.type,
        alreadyExists: false,
      },
    });
  } catch (error) {
    if (error instanceof Error && error.message === 'Invalid folder name') {
      return NextResponse.json(
        { success: false, error: error.message },
        { status: 400 }
      );
    }

    console.error('Upload API error:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: error instanceof Error ? error.message : 'Upload failed' 
      },
      { status: 500 }
    );
  }
}
