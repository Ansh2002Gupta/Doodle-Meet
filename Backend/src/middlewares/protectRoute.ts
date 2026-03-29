import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import User from "../schema/User.ts";

export const protectRoute = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const token = req.cookies.jwt;

  if (!token) {
    return res.status(401).json({
      error: true,
      message: "Unauthorized - No token found.",
    });
  }

  try {
    const decodedToken = jwt.verify(
      token,
      process.env.JWT_SECRET as string,
    ) as jwt.JwtPayload & { userId: string };

    if (!decodedToken) {
      return res.status(401).json({
        error: true,
        message: "Unauthorized - Invalid token.",
      });
    }

    const savedUser = await User.findById(decodedToken.userId).select("-password");

    if (!savedUser)
      return res.status(404).json({
        error: true,
        message: "User not found.",
      });

    (req as any).user = savedUser;

    next();
  } catch (error) {
    console.error("Error in protectRoute.ts:", error);
    return res.status(500).json({
      error: true,
      message: "Internal Server Error",
    });
  }
};
