/**
 * Input Validation Schemas using Zod
 * Defines validation rules for all API endpoints
 */

import { z } from 'zod';

// User validation schemas
export const registerSchema = z.object({
    name: z.string().min(2, 'Name must be at least 2 characters'),
    email: z.string().email('Invalid email address'),
    password: z.string().min(6, 'Password must be at least 6 characters'),
    role: z.enum(['ADMIN', 'BUYER', 'LOGISTICS', 'TRANSPORT']).optional(),
    phone: z.string().optional(),
});

export const loginSchema = z.object({
    email: z.string().email('Invalid email address'),
    password: z.string().min(1, 'Password is required'),
});

// Property validation schemas
export const createPropertySchema = z.object({
    title: z.string().min(5, 'Title must be at least 5 characters'),
    description: z.string().min(20, 'Description must be at least 20 characters'),
    price: z.number().positive('Price must be positive'),
    location: z.string().min(3, 'Location is required'),
    lat: z.number().optional(),
    lng: z.number().optional(),
    images: z.array(z.string()).optional(),
    bedrooms: z.number().int().positive().optional(),
    bathrooms: z.number().int().positive().optional(),
    area: z.number().positive().optional(),
    type: z.enum(['APARTMENT', 'HOUSE', 'VILLA', 'LAND', 'COMMERCIAL', 'OFFICE']),
    status: z.enum(['AVAILABLE', 'SOLD', 'RENTED', 'PENDING']).optional(),
    featured: z.boolean().optional(),
});

export const updatePropertySchema = createPropertySchema.partial();

// Transport Order validation schemas
export const createTransportOrderSchema = z.object({
    pickupLocation: z.string().min(3, 'Pickup location is required'),
    pickupLat: z.number().optional(),
    pickupLng: z.number().optional(),
    dropLocation: z.string().min(3, 'Drop location is required'),
    dropLat: z.number().optional(),
    dropLng: z.number().optional(),
    vehicleType: z.enum(['CAR', 'VAN', 'TRUCK', 'MOTORCYCLE']),
    scheduledDate: z.string().datetime().optional(),
    notes: z.string().optional(),
});

export const updateTransportOrderSchema = z.object({
    status: z.enum(['PENDING', 'CONFIRMED', 'IN_PROGRESS', 'COMPLETED', 'CANCELLED']).optional(),
    cost: z.number().positive().optional(),
    distance: z.number().positive().optional(),
    driverName: z.string().optional(),
    driverPhone: z.string().optional(),
    completedDate: z.string().datetime().optional(),
});

// Logistics Request validation schemas
export const createLogisticsRequestSchema = z.object({
    type: z.enum(['PACKAGE', 'FREIGHT', 'WAREHOUSE', 'DISTRIBUTION']),
    weight: z.number().positive().optional(),
    dimensions: z.object({
        length: z.number().positive(),
        width: z.number().positive(),
        height: z.number().positive(),
    }).optional(),
    origin: z.string().min(3, 'Origin is required'),
    destination: z.string().min(3, 'Destination is required'),
    destLat: z.number().optional(),
    destLng: z.number().optional(),
    estimatedDelivery: z.string().datetime().optional(),
    notes: z.string().optional(),
});

export const updateLogisticsRequestSchema = z.object({
    status: z.enum(['PENDING', 'PROCESSING', 'IN_TRANSIT', 'DELIVERED', 'CANCELLED']).optional(),
    price: z.number().positive().optional(),
    trackingId: z.string().optional(),
    actualDelivery: z.string().datetime().optional(),
});

// Helper function to validate data
export function validateData<T>(schema: z.ZodSchema<T>, data: unknown): { success: true; data: T } | { success: false; errors: z.ZodError } {
    try {
        const validData = schema.parse(data);
        return { success: true, data: validData };
    } catch (error) {
        if (error instanceof z.ZodError) {
            return { success: false, errors: error };
        }
        throw error;
    }
}
