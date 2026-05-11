import type { Request, Response, NextFunction } from "express";
import { TokenService } from "../services/token.service.js";

export interface AuthRequest extends Request {
  userId?: string;
}

export const authMiddleware = (req: AuthRequest, res: Response, next: NextFunction ) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      throw new Error("No token provided");
    }

    const token = authHeader.split(" ")[1];
    
    if (!token) {
      throw new Error("No token provided");
    }

    const decoded: any = TokenService.verifyToken(token);

    req.userId = decoded.userId;

    next();
  } catch (error) {
    res.status(401).json({
      success: false,
      message: "Unauthorized",
    });
  }
};
