import { Request, Response } from "express";
import { leadSchema } from "../utils/validation";
import { successResponse, errorResponse } from "../utils/apiResponse";
import { query } from "../config/database";

export const createLead = async (req: Request, res: Response) => {
  try {
    const validatedData = leadSchema.parse(req.body);
    const userId = (req as any).userId;

    const result = await query(
      "INSERT INTO leads (user_id, name, email, phone, status) VALUES ($1, $2, $3, $4, $5) RETURNING id, user_id, name, email, phone, status, created_at, updated_at",
      [userId, validatedData.name, validatedData.email, validatedData.phone || null, validatedData.status || "new"]
    );

    const newLead = result.rows[0];

    return res.status(201).json(successResponse("Lead created successfully", newLead));
  } catch (error: any) {
    return res
      .status(400)
      .json(errorResponse("Validation error", error.message));
  }
};

export const getLeads = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).userId;

    const result = await query(
      "SELECT id, user_id, name, email, phone, status, created_at, updated_at FROM leads WHERE user_id = $1 ORDER BY created_at DESC",
      [userId]
    );

    return res.json(successResponse("Leads retrieved successfully", result.rows));
  } catch (error: any) {
    return res.status(500).json(errorResponse("Server error", error.message));
  }
};

export const getLead = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const result = await query(
      "SELECT id, user_id, name, email, phone, status, created_at, updated_at FROM leads WHERE id = $1",
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json(errorResponse("Lead not found"));
    }

    return res.json(successResponse("Lead retrieved successfully", result.rows[0]));
  } catch (error: any) {
    return res.status(500).json(errorResponse("Server error", error.message));
  }
};

export const updateLead = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { name, email, phone, status } = req.body;

    const updateFields: string[] = [];
    const updateValues: any[] = [];
    let paramIndex = 1;

    if (name) {
      updateFields.push(`name = $${paramIndex}`);
      updateValues.push(name);
      paramIndex++;
    }

    if (email) {
      updateFields.push(`email = $${paramIndex}`);
      updateValues.push(email);
      paramIndex++;
    }

    if (phone) {
      updateFields.push(`phone = $${paramIndex}`);
      updateValues.push(phone);
      paramIndex++;
    }

    if (status) {
      updateFields.push(`status = $${paramIndex}`);
      updateValues.push(status);
      paramIndex++;
    }

    if (updateFields.length === 0) {
      return res.status(400).json(errorResponse("No fields to update"));
    }

    updateFields.push(`updated_at = CURRENT_TIMESTAMP`);
    updateValues.push(id);

    const result = await query(
      `UPDATE leads SET ${updateFields.join(", ")} WHERE id = $${paramIndex} RETURNING id, user_id, name, email, phone, status, created_at, updated_at`,
      updateValues
    );

    if (result.rows.length === 0) {
      return res.status(404).json(errorResponse("Lead not found"));
    }

    return res.json(successResponse("Lead updated successfully", result.rows[0]));
  } catch (error: any) {
    return res.status(500).json(errorResponse("Server error", error.message));
  }
};

export const deleteLead = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const result = await query("DELETE FROM leads WHERE id = $1", [id]);

    if (result.rowCount === 0) {
      return res.status(404).json(errorResponse("Lead not found"));
    }

    return res.json(successResponse("Lead deleted successfully"));
  } catch (error: any) {
    return res.status(500).json(errorResponse("Server error", error.message));
  }
};
