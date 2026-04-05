import { Request, Response } from "express";
import FriendRequest from "../../schema/FriendRequest.ts";

async function getOutgoingFriendRequests(req: Request, res: Response) {
  try {
    const currentUserId = (req as any).user.id;
    const outgoingRequests = await FriendRequest.find({
      sender: currentUserId,
      status: "pending",
    }).populate(
      "receiver",
      "fullName profilePicture nativeLanguage learningLanguage",
    );

    return res.status(200).json({
      success: true,
      message: "Outgoing friend request fetched successfully",
      data: outgoingRequests,
    });
  } catch (error) {
    console.error("Error in getOutgoingFriendRequest.controller.ts:", error);
    return res
      .status(500)
      .json({ error: true, message: "Internal Server Error" });
  }
}

export default getOutgoingFriendRequests;
