import { Request, Response } from "express";
import { userSignupSchema, userLoginSchema } from "../utils/validation";
import { successResponse, errorResponse } from "../utils/apiResponse";
import { hashPassword, comparePassword, generateToken } from "../utils/authUtils";
import { query } from "../config/database";

export const signup = async (req: Request, res: Response) => {
  try {
    const validatedData = userSignupSchema.parse(req.body);

    // Check if user already exists
    const existingUserResult = await query(
      "SELECT id FROM users WHERE email = $1",
      [validatedData.email]
    );

    if (existingUserResult.rows.length > 0) {
      return res
        .status(400)
        .json(errorResponse("User already exists", "Email already registered"));
    }

    // Hash password
    const hashedPassword = await hashPassword(validatedData.password);

    // Create user in database
    const result = await query(
      "INSERT INTO users (email, password, first_name, last_name) VALUES ($1, $2, $3, $4) RETURNING id, email, first_name, last_name, created_at",
      [validatedData.email, hashedPassword, validatedData.firstName, validatedData.lastName]
    );

    const newUser = result.rows[0];

    // Generate token
    const token = generateToken(newUser.id);

    return res.status(201).json(
      successResponse("User created successfully", {
        user: {
          id: newUser.id,
          email: newUser.email,
          firstName: newUser.first_name,
          lastName: newUser.last_name,
          role: 'user',
        },
        token,
      })
    );
  } catch (error: any) {
    return res
      .status(400)
      .json(errorResponse("Validation error", error.message));
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const validatedData = userLoginSchema.parse(req.body);

    // Find user in database
    const userResult = await query(
      "SELECT id, password, first_name, last_name FROM users WHERE email = $1",
      [validatedData.email]
    );

    if (userResult.rows.length === 0) {
      return res
        .status(401)
        .json(errorResponse("Invalid credentials", "User not found"));
    }

    const user = userResult.rows[0];

    // Compare password
    const isPasswordValid = await comparePassword(
      validatedData.password,
      user.password
    );
    if (!isPasswordValid) {
      return res
        .status(401)
        .json(errorResponse("Invalid credentials", "Wrong password"));
    }

    // Generate token
    const token = generateToken(user.id);

    // Get user role
    const userWithRole = await query(
      "SELECT role FROM users WHERE id = $1",
      [user.id]
    );

    return res.json(
      successResponse("Login successful", {
        user: {
          id: user.id,
          email: validatedData.email,
          firstName: user.first_name,
          lastName: user.last_name,
          role: userWithRole.rows[0]?.role || 'user',
        },
        token,
      })
    );
  } catch (error: any) {
    return res
      .status(400)
      .json(errorResponse("Validation error", error.message));
  }
};
