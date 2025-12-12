export interface Lead {
  id: string;
  userId: string;
  name: string;
  email: string;
  phone?: string;
  status: "new" | "contacted" | "qualified" | "converted";
  createdAt: Date;
  updatedAt: Date;
}

export interface LeadInput {
  name: string;
  email: string;
  phone?: string;
  status?: "new" | "contacted" | "qualified" | "converted";
}

// Database schema for leads table
export const leadTableSchema = `
  CREATE TABLE IF NOT EXISTS leads (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(20),
    status VARCHAR(50) DEFAULT 'new',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  );
`;
