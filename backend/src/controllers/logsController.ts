import { Request, Response } from "express";
import { successResponse, errorResponse } from "../utils/apiResponse";
import { query } from "../config/database";
import { LogInput } from "../models/logModel";

export const createLog = async (req: Request, res: Response) => {
  try {
    const data: LogInput = req.body;
    const userId = (req as any).userId || data.userId;
    
    const result = await query(
      `INSERT INTO logs (user_id, action, resource, resource_id, details, ip_address, user_agent) 
       VALUES ($1, $2, $3, $4, $5, $6, $7) 
       RETURNING id, user_id, action, resource, resource_id, details, ip_address, user_agent, created_at`,
      [
        userId || null,
        data.action,
        data.resource,
        data.resourceId || null,
        data.details || null,
        data.ipAddress || req.ip || null,
        data.userAgent || req.get('user-agent') || null,
      ]
    );
    return res.status(201).json(successResponse("Log created successfully", result.rows[0]));
  } catch (error: any) {
    return res.status(400).json(errorResponse("Error creating log", error.message));
  }
};

export const getLogs = async (req: Request, res: Response) => {
  try {
    const { 
      page = '1', 
      limit = '50', 
      resource, 
      action, 
      userId,
      startDate,
      endDate 
    } = req.query;

    const pageNum = parseInt(page as string);
    const limitNum = parseInt(limit as string);
    const offset = (pageNum - 1) * limitNum;

    let whereConditions: string[] = [];
    const queryParams: any[] = [];
    let paramIndex = 1;

    if (resource) {
      whereConditions.push(`resource = $${paramIndex++}`);
      queryParams.push(resource);
    }
    if (action) {
      whereConditions.push(`action = $${paramIndex++}`);
      queryParams.push(action);
    }
    if (userId) {
      whereConditions.push(`user_id = $${paramIndex++}`);
      queryParams.push(userId);
    }
    if (startDate) {
      whereConditions.push(`created_at >= $${paramIndex++}`);
      queryParams.push(startDate);
    }
    if (endDate) {
      whereConditions.push(`created_at <= $${paramIndex++}`);
      queryParams.push(endDate);
    }

    const whereClause = whereConditions.length > 0 
      ? `WHERE ${whereConditions.join(' AND ')}` 
      : '';

    // Get total count
    const countResult = await query(
      `SELECT COUNT(*) as total FROM logs ${whereClause}`,
      queryParams
    );
    const total = parseInt(countResult.rows[0].total);

    // Get logs
    const result = await query(
      `SELECT l.*, u.email as user_email, u.first_name, u.last_name 
       FROM logs l 
       LEFT JOIN users u ON l.user_id = u.id 
       ${whereClause}
       ORDER BY l.created_at DESC 
       LIMIT $${paramIndex} OFFSET $${paramIndex + 1}`,
      [...queryParams, limitNum, offset]
    );

    return res.json(
      successResponse("Logs retrieved successfully", {
        logs: result.rows,
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

export const getLog = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const result = await query(
      `SELECT l.*, u.email as user_email, u.first_name, u.last_name 
       FROM logs l 
       LEFT JOIN users u ON l.user_id = u.id 
       WHERE l.id = $1`,
      [id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json(errorResponse("Log not found"));
    }
    return res.json(successResponse("Log retrieved successfully", result.rows[0]));
  } catch (error: any) {
    return res.status(500).json(errorResponse("Server error", error.message));
  }
};

export const deleteLog = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const result = await query("DELETE FROM logs WHERE id = $1", [id]);
    if (result.rowCount === 0) {
      return res.status(404).json(errorResponse("Log not found"));
    }
    return res.json(successResponse("Log deleted successfully"));
  } catch (error: any) {
    return res.status(500).json(errorResponse("Server error", error.message));
  }
};

