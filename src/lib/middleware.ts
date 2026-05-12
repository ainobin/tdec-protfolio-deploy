import { NextResponse } from 'next/server';
import { verifyToken } from './auth';

/**
 * Middleware to verify JWT token from request headers
 */
export async function verifyAuthToken(request: Request): Promise<{ authenticated: boolean; user?: any }> {
  const authHeader = request.headers.get('Authorization');

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return { authenticated: false };
  }

  const token = authHeader.substring(7); // Remove 'Bearer ' prefix

  const payload = await verifyToken(token);

  if (!payload) {
    return { authenticated: false };
  }

  return { authenticated: true, user: payload };
}

/**
 * Helper to create unauthorized response
 */
export function unauthorizedResponse(message: string = 'Unauthorized') {
  return NextResponse.json({ error: message }, { status: 401 });
}

/**
 * Helper to create forbidden response
 */
export function forbiddenResponse(message: string = 'Forbidden') {
  return NextResponse.json({ error: message }, { status: 403 });
}

/**
 * Wrapper for protected API routes
 */
export async function withAuth(
  request: Request,
  handler: (request: Request, user: any) => Promise<Response>
): Promise<Response> {
  const { authenticated, user } = await verifyAuthToken(request);

  if (!authenticated) {
    return unauthorizedResponse('Authentication required');
  }

  return handler(request, user);
}
