/**
 * Standardized API Response Utilities
 * Provides consistent response format across all API endpoints
 */

import { NextResponse } from 'next/server';

export interface ApiResponse<T = any> {
    success: boolean;
    data?: T;
    error?: string;
    message?: string;
}

/**
 * Success response
 */
export function successResponse<T>(
    data: T,
    message?: string,
    status: number = 200
): NextResponse<ApiResponse<T>> {
    return NextResponse.json(
        {
            success: true,
            data,
            message,
        },
        { status }
    );
}

/**
 * Error response
 */
export function errorResponse(
    error: string,
    status: number = 400
): NextResponse<ApiResponse> {
    return NextResponse.json(
        {
            success: false,
            error,
        },
        { status }
    );
}

/**
 * Unauthorized response
 */
export function unauthorizedResponse(): NextResponse<ApiResponse> {
    return errorResponse('Unauthorized - Invalid or missing token', 401);
}

/**
 * Forbidden response
 */
export function forbiddenResponse(): NextResponse<ApiResponse> {
    return errorResponse('Forbidden - Insufficient permissions', 403);
}

/**
 * Not found response
 */
export function notFoundResponse(resource: string = 'Resource'): NextResponse<ApiResponse> {
    return errorResponse(`${resource} not found`, 404);
}

/**
 * Validation error response
 */
export function validationErrorResponse(errors: any): NextResponse<ApiResponse> {
    return NextResponse.json(
        {
            success: false,
            error: 'Validation failed',
            data: errors,
        },
        { status: 422 }
    );
}

/**
 * Server error response
 */
export function serverErrorResponse(message: string = 'Internal server error'): NextResponse<ApiResponse> {
    return errorResponse(message, 500);
}
