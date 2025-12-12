import { Request, Response } from "express";
import { successResponse, errorResponse } from "../utils/apiResponse";
import { query } from "../config/database";
import { SettingInput } from "../models/contentModel";

export const getSettings = async (req: Request, res: Response) => {
  try {
    const { key } = req.query;
    if (key) {
      const result = await query(
        "SELECT id, key, value, type, description, updated_at FROM settings WHERE key = $1",
        [key]
      );
      if (result.rows.length === 0) {
        return res.status(404).json(errorResponse("Setting not found"));
      }
      return res.json(successResponse("Setting retrieved successfully", result.rows[0]));
    }

    const result = await query(
      "SELECT id, key, value, type, description, updated_at FROM settings ORDER BY key ASC",
      []
    );
    return res.json(successResponse("Settings retrieved successfully", result.rows));
  } catch (error: any) {
    return res.status(500).json(errorResponse("Server error", error.message));
  }
};

export const createSetting = async (req: Request, res: Response) => {
  try {
    const data: SettingInput = req.body;
    const result = await query(
      `INSERT INTO settings (key, value, type, description) 
       VALUES ($1, $2, $3, $4) 
       RETURNING id, key, value, type, description, updated_at`,
      [data.key, data.value, data.type || 'string', data.description || null]
    );
    return res.status(201).json(successResponse("Setting created successfully", result.rows[0]));
  } catch (error: any) {
    if (error.code === '23505') { // Unique violation
      return res.status(400).json(errorResponse("Setting with this key already exists"));
    }
    return res.status(400).json(errorResponse("Error creating setting", error.message));
  }
};

export const updateSetting = async (req: Request, res: Response) => {
  try {
    const { key } = req.params;
    const { value, type, description } = req.body;

    const updateFields: string[] = [];
    const updateValues: any[] = [];
    let paramIndex = 1;

    if (value !== undefined) {
      updateFields.push(`value = $${paramIndex++}`);
      updateValues.push(value);
    }
    if (type !== undefined) {
      updateFields.push(`type = $${paramIndex++}`);
      updateValues.push(type);
    }
    if (description !== undefined) {
      updateFields.push(`description = $${paramIndex++}`);
      updateValues.push(description);
    }

    if (updateFields.length === 0) {
      return res.status(400).json(errorResponse("No fields to update"));
    }

    updateFields.push(`updated_at = CURRENT_TIMESTAMP`);
    updateValues.push(key);

    const result = await query(
      `UPDATE settings SET ${updateFields.join(", ")} WHERE key = $${paramIndex} 
       RETURNING id, key, value, type, description, updated_at`,
      updateValues
    );

    if (result.rows.length === 0) {
      return res.status(404).json(errorResponse("Setting not found"));
    }

    return res.json(successResponse("Setting updated successfully", result.rows[0]));
  } catch (error: any) {
    return res.status(500).json(errorResponse("Server error", error.message));
  }
};

export const deleteSetting = async (req: Request, res: Response) => {
  try {
    const { key } = req.params;
    const result = await query("DELETE FROM settings WHERE key = $1", [key]);
    if (result.rowCount === 0) {
      return res.status(404).json(errorResponse("Setting not found"));
    }
    return res.json(successResponse("Setting deleted successfully"));
  } catch (error: any) {
    return res.status(500).json(errorResponse("Server error", error.message));
  }
};

