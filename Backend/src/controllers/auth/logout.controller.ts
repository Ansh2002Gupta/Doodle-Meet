import { Request, Response } from "express";

async function logoutController(req: Request, res: Response) {
  try {
    res.clearCookie("jwt", {
      maxAge: 0,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    });
    return res
      .status(200)
      .json({ success: true, message: "User logged out successfully" });
  } catch (error) {
    console.error("Error in logoutController.ts:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
}

export default logoutController;
