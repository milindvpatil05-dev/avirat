import type { NextFunction, Request, Response } from "express";
import { verifyAccessToken } from "../utils/tokens.ts";

export const authenticate = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authorization = req.headers.authorization;
  const token = authorization?.startsWith("Bearer ")
    ? authorization.slice(7)
    : undefined;

  if (!token) {
    res.status(401).json({ success: false, message: "Access token is required" });
    return;
  }

  try {
    req.userId = verifyAccessToken(token).userId;
    next();
  } catch {
    res.status(401).json({ success: false, message: "Invalid or expired access token" });
  }
};
