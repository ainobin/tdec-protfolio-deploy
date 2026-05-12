import ImageKit from 'imagekit';

// Validate environment variables
const publicKey = process.env.IMAGEKIT_PUBLIC_KEY;
const privateKey = process.env.IMAGEKIT_PRIVATE_KEY;
const urlEndpoint = process.env.IMAGEKIT_URL_ENDPOINT;

if (!publicKey || !privateKey || !urlEndpoint) {
  throw new Error(
    'Missing ImageKit configuration. Please ensure IMAGEKIT_PUBLIC_KEY, IMAGEKIT_PRIVATE_KEY, and IMAGEKIT_URL_ENDPOINT are set in your .env file.'
  );
}

// Initialize ImageKit instance (server-side only)
export const imagekit = new ImageKit({
  publicKey,
  privateKey,
  urlEndpoint,
});

/**
 * Upload a file to ImageKit
 * @param file - File buffer or base64 string
 * @param fileName - Name for the uploaded file
 * @param folder - Optional folder path in ImageKit
 * @returns Promise with upload response containing url and fileId
 */
export async function uploadToImageKit(
  file: Buffer | string,
  fileName: string,
  folder?: string
): Promise<{ url: string; fileId: string; name: string }> {
  try {
    const uploadOptions: any = {
      file,
      fileName,
      useUniqueFileName: true,
      overwriteFile: false,
    };

    if (folder) {
      uploadOptions.folder = folder;
    }

    const response = await imagekit.upload(uploadOptions);

    return {
      url: response.url,
      fileId: response.fileId,
      name: response.name,
    };
  } catch (error) {
    console.error('ImageKit upload error:', error);
    throw new Error('Failed to upload file to ImageKit');
  }
}

/**
 * Delete a file from ImageKit
 * @param fileId - The ImageKit file ID
 * @returns Promise<void>
 */
export async function deleteFromImageKit(fileId: string): Promise<void> {
  try {
    await imagekit.deleteFile(fileId);
  } catch (error) {
    console.error('ImageKit delete error:', error);
    throw new Error('Failed to delete file from ImageKit');
  }
}

/**
 * Get authentication parameters for client-side upload
 * This is used for direct browser uploads
 * @returns Authentication parameters
 */
export function getImageKitAuthParams() {
  const authenticationEndpoint = `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/api/imagekit-auth`;
  
  return {
    publicKey,
    urlEndpoint,
    authenticationEndpoint,
  };
}
