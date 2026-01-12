import { Request, Response } from "express";
import User from "../../schema/User.ts";
import jwt from "jsonwebtoken";
import emailValidator from "../../utils/emailValidator.ts";
import passwordValidator from "../../utils/passwordvalidator.ts";
import { upsertStreamUser } from "../../libs/streamChat.ts";

async function signupController(req: Request, res: Response) {
  try {
    const { fullName, email, password } = req.body;

    if (!fullName)
      return res
        .status(400)
        .json({ error: true, message: "Full name is required" });
    else if (!email)
      return res
        .status(400)
        .json({ error: true, message: "Email is required" });
    else if (!password)
      return res
        .status(400)
        .json({ error: true, message: "Password is required" });

    const isValidEmail = emailValidator(email);
    if (!isValidEmail)
      return res.status(400).json({ error: true, message: "Invalid email" });
    const isValidPassword = passwordValidator(password);
    if (!isValidPassword)
      return res
        .status(400)
        .json({ error: true, message: "Please enter a valid password" });

    const user = await User.findOne({ email });
    if (user)
      return res
        .status(400)
        .json({ error: true, message: "User already exists" });

    const idx = Math.random() * 100 + 1;
    const randomAvatar = `https://avatar.iran.liara.run/public/${idx}.png`;

    const newUser = await User.create({
      fullName,
      email,
      password,
      profilePicture: randomAvatar,
    });

    if (!newUser)
      return res
        .status(400)
        .json({ error: true, message: "New user cannot be created" });

    try {
      await upsertStreamUser({
        id: newUser._id,
        name: newUser.fullName,
        image: newUser.profilePicture,
      });
      console.log(
        `User upserted in Stream Chat successfully ${newUser.fullName}`
      );
    } catch (error) {
      console.error("Error in signupController.ts: ", error);
      return res.status(500).json({ message: "Internal Server Error" });
    }

    const token = jwt.sign(
      { userId: newUser._id },
      process.env.JWT_SECRET as string,
      {
        expiresIn: "1d",
      }
    );

    res.cookie("jwt", token, {
      maxAge: 24 * 60 * 60 * 1000,
      httpOnly: true, //prevents xss attacks
      sameSite: "strict", //prevents csrf attacks
      secure: process.env.NODE_ENV === "production", //prevents man in the middle attacks
    });

    const { password: _, ...userResponse } = newUser.toObject();

    return res.status(201).json({
      success: true,
      message: "New user created successfully",
      data: userResponse,
    });
  } catch (error) {
    console.error("Error in signupController.ts:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
}

export default signupController;
