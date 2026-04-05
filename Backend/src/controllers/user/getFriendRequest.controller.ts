import FriendRequest from "../../schema/FriendRequest.ts";
import { Request, Response } from "express";

async function getFriendRequests(req: Request, res: Response){
    try{
        const currentUserId = (req as any).user.id;
        const incomingRequests = await FriendRequest.find({
            receiver: currentUserId,
            status: "pending"
        }).populate("sender", "fullName profilePicture nativeLanguage learningLanguage");
        const acceptedRequests = await FriendRequest.find({
            receiver: currentUserId,
            status: "accepted",
        }).populate("sender", "fullName profilePicture");

        res.status(200).json({
            success: true,
            messaage: "Friend requests fetched successfully",
            data: {
                incomingRequests: incomingRequests,
                acceptedRequests: acceptedRequests
            }
        });
    }
    catch(error){
        console.error("Error in getFriendRequest.controller.ts:", error);
        return res.status(500).json({error: true, message: "Internal Server Error"});
    }
}

export default getFriendRequests;
