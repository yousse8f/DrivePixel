import { Request, Response, NextFunction } from "express";
import { verifyToken } from "./authUtils";
import { query } from "../config/database";

export const adminMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
        error: "No token provided",
      });
    }

    const decoded = verifyToken(token);
    if (!decoded) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
        error: "Invalid token",
      });
    }

    // Check if user is admin
    const userResult = await query(
      "SELECT id, email, role FROM users WHERE id = $1",
      [decoded.userId]
    );

    if (userResult.rows.length === 0) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
        error: "User not found",
      });
    }

    const user = userResult.rows[0];
    if (user.role !== "admin") {
      return res.status(403).json({
        success: false,
        message: "Forbidden",
        error: "Admin access required",
      });
    }

    (req as any).userId = decoded.userId;
    (req as any).userRole = user.role;
    next();
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};

