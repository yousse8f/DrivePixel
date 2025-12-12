import { Request, Response } from "express";
import { successResponse, errorResponse } from "../utils/apiResponse";
import { query } from "../config/database";

export const getUsers = async (req: Request, res: Response) => {
  try {
    const { page = '1', limit = '50' } = req.query;
    const pageNum = parseInt(page as string);
    const limitNum = parseInt(limit as string);
    const offset = (pageNum - 1) * limitNum;

    const countResult = await query("SELECT COUNT(*) as total FROM users", []);
    const total = parseInt(countResult.rows[0].total);

    const result = await query(
      "SELECT id, email, first_name, last_name, role, created_at FROM users ORDER BY created_at DESC LIMIT $1 OFFSET $2",
      [limitNum, offset]
    );

    return res.json(
      successResponse("Users retrieved successfully", {
        users: result.rows.map(user => ({
          id: user.id,
          email: user.email,
          firstName: user.first_name,
          lastName: user.last_name,
          role: user.role || 'user',
          createdAt: user.created_at,
        })),
        pagination: {
          page: pageNum,
          limit: limitNum,
          total,
          totalPages: Math.ceil(total / limitNum),
        },
      })
    );
  } catch (error: any) {
    return res.status(500).json(errorResponse("Server error", error.message));
  }
};

export const getUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const result = await query(
      "SELECT id, email, first_name, last_name, role, created_at FROM users WHERE id = $1",
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json(errorResponse("User not found"));
    }

    const user = result.rows[0];

    return res.json(
      successResponse("User retrieved successfully", {
        id: user.id,
        email: user.email,
        firstName: user.first_name,
        lastName: user.last_name,
        role: user.role || 'user',
        createdAt: user.created_at,
      })
    );
  } catch (error: any) {
    return res.status(500).json(errorResponse("Server error", error.message));
  }
};

export const updateUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { firstName, lastName, role } = req.body;
    const userRole = (req as any).userRole;

    const updateFields: string[] = [];
    const updateValues: any[] = [];
    let paramIndex = 1;

    if (firstName) {
      updateFields.push(`first_name = $${paramIndex}`);
      updateValues.push(firstName);
      paramIndex++;
    }

    if (lastName) {
      updateFields.push(`last_name = $${paramIndex}`);
      updateValues.push(lastName);
      paramIndex++;
    }

    // Only admins can update roles
    if (role && userRole === 'admin') {
      updateFields.push(`role = $${paramIndex}`);
      updateValues.push(role);
      paramIndex++;
    }

    if (updateFields.length === 0) {
      return res.status(400).json(errorResponse("No fields to update"));
    }

    updateFields.push(`updated_at = CURRENT_TIMESTAMP`);
    updateValues.push(id);

    const result = await query(
      `UPDATE users SET ${updateFields.join(", ")} WHERE id = $${paramIndex} RETURNING id, email, first_name, last_name, role`,
      updateValues
    );

    if (result.rows.length === 0) {
      return res.status(404).json(errorResponse("User not found"));
    }

    const user = result.rows[0];

    return res.json(
      successResponse("User updated successfully", {
        id: user.id,
        email: user.email,
        firstName: user.first_name,
        lastName: user.last_name,
        role: user.role || 'user',
      })
    );
  } catch (error: any) {
    return res.status(500).json(errorResponse("Server error", error.message));
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const result = await query("DELETE FROM users WHERE id = $1", [id]);

    if (result.rowCount === 0) {
      return res.status(404).json(errorResponse("User not found"));
    }

    return res.json(successResponse("User deleted successfully"));
  } catch (error: any) {
    return res.status(500).json(errorResponse("Server error", error.message));
  }
};
