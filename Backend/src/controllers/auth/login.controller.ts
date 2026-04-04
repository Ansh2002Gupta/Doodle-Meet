import { Request, Response } from "express";
import User from "../../schema/User.ts";
import jwt from "jsonwebtoken";

async function loginController(req: Request, res: Response) {
  try {
    const { email, password } = req.body;

    if (!email || !password)
      return res
        .status(400)
        .json({ error: true, message: "All fields are required" });

    const user = await User.findOne({ email });

    if (!user)
      return res.status(401).json({
        error: true,
        message: "This email or password is invalid",
      });
    const isPasswordValid = await user.comparePassword(password);

    if (!isPasswordValid)
      return res.status(401).json({
        error: true,
        message: "This email or password is invalid",
      });

    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET as string,
      { expiresIn: "1d" }
    );

    res.cookie("jwt", token, {
      maxAge: 24 * 60 * 60 * 1000,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    });

    const { password: _, ...userResponse } = user.toObject();

    return res.status(200).json({
      success: true,
      message: "User logged in successfully",
      data: userResponse,
    });
  } catch (error) {
    console.error("Error in loginController.ts:", error);
    return res
      .status(500)
      .json({ error: true, message: "Internal Server Error" });
  }
}

export default loginController;
