import { Request, Response } from "express"
import User from "../../schema/User.ts";

async function getRecommendedFriends(req: Request, res: Response){
    try{
        const currentUserId = (req as any).user._id;
        const currentUser = (req as any).user;

        const recommendedUsers = await User.find({
            $and:[
                {_id: {$ne: currentUserId}}, //exclude current user
                {$id: {$nin: currentUser.friends}}, //exclude current user's friends
                {isOnboarded: true}
            ]
        }).select('-password');
        return res.status(200).json({success: true, message: "Recommended users fetched successfully", data: recommendedUsers});
    }
    catch(error){
        console.error("Error in getRecommendedFriends.controller.ts:", error);
        return res.status(500).json({error: true, message: "Internal Server Error"});
    }
}

export default getRecommendedFriends;
