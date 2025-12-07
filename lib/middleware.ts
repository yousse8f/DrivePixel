/**
 * Authentication Middleware
 * Protects API routes and validates JWT tokens
 */

import { NextRequest } from 'next/server';
import { verifyToken, extractTokenFromHeader, JWTPayload } from './auth';

export interface AuthenticatedRequest extends NextRequest {
    user?: JWTPayload;
}

/**
 * Middleware to authenticate requests
 * Returns user payload if authenticated, null otherwise
 */
export async function authenticate(request: NextRequest): Promise<JWTPayload | null> {
    const authHeader = request.headers.get('authorization');
    const token = extractTokenFromHeader(authHeader);

    if (!token) {
        return null;
    }

    const user = verifyToken(token);
    return user;
}

/**
 * Check if user has required role
 */
export function hasRole(user: JWTPayload | null, allowedRoles: string[]): boolean {
    if (!user) return false;
    return allowedRoles.includes(user.role);
}

/**
 * Require authentication - throws error if not authenticated
 */
export async function requireAuth(request: NextRequest): Promise<JWTPayload> {
    const user = await authenticate(request);

    if (!user) {
        throw new Error('Unauthorized');
    }

    return user;
}

/**
 * Require specific role - throws error if user doesn't have required role
 */
export async function requireRole(
    request: NextRequest,
    allowedRoles: string[]
): Promise<JWTPayload> {
    const user = await requireAuth(request);

    if (!hasRole(user, allowedRoles)) {
        throw new Error('Forbidden');
    }

    return user;
}
