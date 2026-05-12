import { SignJWT, jwtVerify } from 'jose';

if (!process.env.JWT_SECRET) {
  throw new Error('Please add your JWT_SECRET to .env');
}

const secret = new TextEncoder().encode(process.env.JWT_SECRET);

export interface JWTPayload {
  username: string;
  role: string;
  iat?: number;
  exp?: number;
}

/**
 * Generate a JWT token
 */
export async function generateToken(payload: Omit<JWTPayload, 'iat' | 'exp'>): Promise<string> {
  const token = await new SignJWT(payload as any)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('7d') // Token expires in 7 days
    .sign(secret);

  return token;
}

/**
 * Verify and decode a JWT token
 */
export async function verifyToken(token: string): Promise<JWTPayload | null> {
  try {
    const { payload } = await jwtVerify(token, secret);
    
    // Validate payload structure
    if (
      typeof payload.username === 'string' &&
      typeof payload.role === 'string'
    ) {
      return {
        username: payload.username,
        role: payload.role,
        iat: payload.iat,
        exp: payload.exp,
      };
    }
    
    return null;
  } catch (error) {
    return null;
  }
}

/**
 * Validate admin credentials
 */
export function validateAdminCredentials(username: string, password: string): boolean {
  const adminUsername = process.env.ADMIN_USERNAME;
  const adminPassword = process.env.ADMIN_PASSWORD;

  if (!adminUsername || !adminPassword) {
    throw new Error('Admin credentials not configured in .env');
  }

  return username === adminUsername && password === adminPassword;
}
