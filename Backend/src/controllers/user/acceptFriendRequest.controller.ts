import { Request, Response } from "express";
import FriendRequest from "../../schema/FriendRequest.ts";
import User from "../../schema/User.ts";

async function acceptFriendRequest(req:Request, res:Response) {
  try {
    const { id: requestId } = req.params;
    const currentUserId = (req as any).user.id;

    if (!requestId) {
      return res.status(400).json({
        error: true,
        message: "Request Id is required",
      });
    }

    const friendRequest = await FriendRequest.findById(requestId);

    if (!friendRequest) {
      return res.status(400).json({
        error: true,
        message: "No such friend request exits",
      });
    }
    if (friendRequest.sender.toString() === currentUserId) {
      return res.status(403).json({
        error: true,
        message: "You cannot accept your own friend request",
      });
    }
    if (friendRequest.receiver.toString() !== currentUserId) {
      return res.status(403).json({
        message: "You are not authorized to access the resources",
      });
    }

    friendRequest.status = "accepted";
    await friendRequest.save();

    await User.findByIdAndUpdate(friendRequest.sender, {
        "$addToSet": {
            friends: friendRequest.receiver
        }
    });
    await User.findByIdAndUpdate(friendRequest.receiver, {
        "$addToSet": {
            friends: friendRequest.sender
        }
    });

    return res.status(200).json({
        success: true,
        message: "Friend request accepted successfully"
    });
  } catch (error) {
    console.error("Error in acceptFriendRequest.controller.ts:", error);
    return res.status(500).json({
      error: true,
      message: "Internal Server Error",
    });
  }
}

export default acceptFriendRequest;
