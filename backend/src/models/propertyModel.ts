export interface Property {
  id: string;
  userId: string;
  title: string;
  description?: string;
  price: number;
  location: string;
  bedrooms?: number;
  bathrooms?: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface PropertyInput {
  title: string;
  description?: string;
  price: number;
  location: string;
  bedrooms?: number;
  bathrooms?: number;
}

// Database schema for properties table
export const propertyTableSchema = `
  CREATE TABLE IF NOT EXISTS properties (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    price DECIMAL(12, 2) NOT NULL,
    location VARCHAR(255) NOT NULL,
    bedrooms INT,
    bathrooms INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  );
`;
