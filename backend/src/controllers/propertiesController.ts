import { Request, Response } from "express";
import { propertySchema } from "../utils/validation";
import { successResponse, errorResponse } from "../utils/apiResponse";
import { query } from "../config/database";

export const createProperty = async (req: Request, res: Response) => {
  try {
    const validatedData = propertySchema.parse(req.body);
    const userId = (req as any).userId;

    const result = await query(
      "INSERT INTO properties (user_id, title, description, price, location, bedrooms, bathrooms) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING id, user_id, title, description, price, location, bedrooms, bathrooms, created_at, updated_at",
      [userId, validatedData.title, validatedData.description || null, validatedData.price, validatedData.location, validatedData.bedrooms || null, validatedData.bathrooms || null]
    );

    const newProperty = result.rows[0];

    return res
      .status(201)
      .json(successResponse("Property created successfully", newProperty));
  } catch (error: any) {
    return res
      .status(400)
      .json(errorResponse("Validation error", error.message));
  }
};

export const getProperties = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).userId;

    const result = await query(
      "SELECT id, user_id, title, description, price, location, bedrooms, bathrooms, created_at, updated_at FROM properties WHERE user_id = $1 ORDER BY created_at DESC",
      [userId]
    );

    return res.json(
      successResponse("Properties retrieved successfully", result.rows)
    );
  } catch (error: any) {
    return res.status(500).json(errorResponse("Server error", error.message));
  }
};

export const getProperty = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const result = await query(
      "SELECT id, user_id, title, description, price, location, bedrooms, bathrooms, created_at, updated_at FROM properties WHERE id = $1",
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json(errorResponse("Property not found"));
    }

    return res.json(successResponse("Property retrieved successfully", result.rows[0]));
  } catch (error: any) {
    return res.status(500).json(errorResponse("Server error", error.message));
  }
};

export const updateProperty = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { title, description, price, location, bedrooms, bathrooms } =
      req.body;

    const updateFields: string[] = [];
    const updateValues: any[] = [];
    let paramIndex = 1;

    if (title) {
      updateFields.push(`title = $${paramIndex}`);
      updateValues.push(title);
      paramIndex++;
    }

    if (description !== undefined) {
      updateFields.push(`description = $${paramIndex}`);
      updateValues.push(description);
      paramIndex++;
    }

    if (price) {
      updateFields.push(`price = $${paramIndex}`);
      updateValues.push(price);
      paramIndex++;
    }

    if (location) {
      updateFields.push(`location = $${paramIndex}`);
      updateValues.push(location);
      paramIndex++;
    }

    if (bedrooms !== undefined) {
      updateFields.push(`bedrooms = $${paramIndex}`);
      updateValues.push(bedrooms);
      paramIndex++;
    }

    if (bathrooms !== undefined) {
      updateFields.push(`bathrooms = $${paramIndex}`);
      updateValues.push(bathrooms);
      paramIndex++;
    }

    if (updateFields.length === 0) {
      return res.status(400).json(errorResponse("No fields to update"));
    }

    updateFields.push(`updated_at = CURRENT_TIMESTAMP`);
    updateValues.push(id);

    const result = await query(
      `UPDATE properties SET ${updateFields.join(", ")} WHERE id = $${paramIndex} RETURNING id, user_id, title, description, price, location, bedrooms, bathrooms, created_at, updated_at`,
      updateValues
    );

    if (result.rows.length === 0) {
      return res.status(404).json(errorResponse("Property not found"));
    }

    return res.json(
      successResponse("Property updated successfully", result.rows[0])
    );
  } catch (error: any) {
    return res.status(500).json(errorResponse("Server error", error.message));
  }
};

export const deleteProperty = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const result = await query("DELETE FROM properties WHERE id = $1", [id]);

    if (result.rowCount === 0) {
      return res.status(404).json(errorResponse("Property not found"));
    }

    return res.json(successResponse("Property deleted successfully"));
  } catch (error: any) {
    return res.status(500).json(errorResponse("Server error", error.message));
  }
};
