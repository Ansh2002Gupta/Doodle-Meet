import { Request, Response } from "express";
import User from "../../schema/User.ts";

async function getMyFriends(req: Request, res: Response) {
  try {
    const currentUserId = (req as any).user.id;
    const user = await User.findById(currentUserId)
      .select("friends")
      .populate(
        "friends",
        "fullName profilePicture nativeLanguage learningLanguage",
      );
    if (!user) {
      return res.status(404).json({ error: true, message: "User not found" });
    }
    return res.status(200).json({
      success: true,
      message: "Friends fetched successfully",
      data: user.friends,
    });
  } catch (error) {
    console.error("Error in getMyFriends.controller.ts:", error);
    return res
      .status(500)
      .json({ error: true, message: "Internal Server Error" });
  }
}

export default getMyFriends;
