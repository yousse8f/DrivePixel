-- Real Estate + Logistics + Transportation System
-- MySQL Database Initialization Script

-- Create database
CREATE DATABASE IF NOT EXISTS real_estate_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE real_estate_db;

-- Users table
CREATE TABLE IF NOT EXISTS users (
    id VARCHAR(36) PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    role ENUM('ADMIN', 'BUYER', 'LOGISTICS', 'TRANSPORT') DEFAULT 'BUYER',
    phone VARCHAR(50),
    avatar TEXT,
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_email (email)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Properties table
CREATE TABLE IF NOT EXISTS properties (
    id VARCHAR(36) PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    price DECIMAL(15, 2) NOT NULL,
    location VARCHAR(255) NOT NULL,
    lat DECIMAL(10, 8),
    lng DECIMAL(11, 8),
    images JSON,
    bedrooms INT,
    bathrooms INT,
    area DECIMAL(10, 2),
    type ENUM('APARTMENT', 'HOUSE', 'VILLA', 'LAND', 'COMMERCIAL', 'OFFICE') NOT NULL,
    status ENUM('AVAILABLE', 'SOLD', 'RENTED', 'PENDING') DEFAULT 'AVAILABLE',
    featured BOOLEAN DEFAULT FALSE,
    userId VARCHAR(36) NOT NULL,
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (userId) REFERENCES users(id) ON DELETE CASCADE,
    INDEX idx_userId (userId),
    INDEX idx_status (status),
    INDEX idx_type (type)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Transport Orders table
CREATE TABLE IF NOT EXISTS transport_orders (
    id VARCHAR(36) PRIMARY KEY,
    userId VARCHAR(36) NOT NULL,
    pickupLocation VARCHAR(255) NOT NULL,
    pickupLat DECIMAL(10, 8),
    pickupLng DECIMAL(11, 8),
    dropLocation VARCHAR(255) NOT NULL,
    dropLat DECIMAL(10, 8),
    dropLng DECIMAL(11, 8),
    vehicleType ENUM('CAR', 'VAN', 'TRUCK', 'MOTORCYCLE') NOT NULL,
    status ENUM('PENDING', 'CONFIRMED', 'IN_PROGRESS', 'COMPLETED', 'CANCELLED') DEFAULT 'PENDING',
    cost DECIMAL(10, 2),
    distance DECIMAL(10, 2),
    scheduledDate DATETIME,
    completedDate DATETIME,
    notes TEXT,
    driverName VARCHAR(255),
    driverPhone VARCHAR(50),
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (userId) REFERENCES users(id) ON DELETE CASCADE,
    INDEX idx_userId (userId),
    INDEX idx_status (status)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Logistics Requests table
CREATE TABLE IF NOT EXISTS logistics_requests (
    id VARCHAR(36) PRIMARY KEY,
    userId VARCHAR(36) NOT NULL,
    type ENUM('PACKAGE', 'FREIGHT', 'WAREHOUSE', 'DISTRIBUTION') NOT NULL,
    weight DECIMAL(10, 2),
    dimensions JSON,
    origin VARCHAR(255) NOT NULL,
    destination VARCHAR(255) NOT NULL,
    destLat DECIMAL(10, 8),
    destLng DECIMAL(11, 8),
    status ENUM('PENDING', 'PROCESSING', 'IN_TRANSIT', 'DELIVERED', 'CANCELLED') DEFAULT 'PENDING',
    price DECIMAL(10, 2),
    trackingId VARCHAR(100) UNIQUE,
    estimatedDelivery DATETIME,
    actualDelivery DATETIME,
    notes TEXT,
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (userId) REFERENCES users(id) ON DELETE CASCADE,
    INDEX idx_userId (userId),
    INDEX idx_status (status),
    INDEX idx_trackingId (trackingId)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Insert default admin user (password: admin123)
INSERT INTO users (id, name, email, password, role) VALUES 
('admin-001', 'System Admin', 'admin@example.com', '$2a$10$rXQvkKJqM5JZ5Y5Z5Y5Z5uO5Z5Z5Z5Z5Z5Z5Z5Z5Z5Z5Z5Z5Z5Z5Z', 'ADMIN')
ON DUPLICATE KEY UPDATE id=id;
