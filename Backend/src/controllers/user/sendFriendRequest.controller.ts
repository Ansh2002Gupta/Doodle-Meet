import { Request, Response } from "express";
import FriendRequest from "../../schema/FriendRequest.ts";
import User from "../../schema/User.ts";

async function sendFriendRequest(req:Request, res:Response){
    try{
        const myId = (req as any).user.id;
        const receiverId = req.params.id;

        if(!receiverId){
            return res.status(400).json({
                error: true,
                message: "Receiver id is required to create a friend request"
            })
        }

        if(myId === receiverId){
            return res.status(400).json({
                error: true,
                message: "You cannot send a friend request to yourself"
            })
        }

        const receiver = await User.findById(receiverId);
        if(!receiver){
            return res.status(400).json({error: true, message: "Receiver not found"});
        }

        const existingRequest = await FriendRequest.findOne({
            "$or":[
                {sender: myId, reciever: receiverId},
                {sender: receiverId, receiver: myId}
            ]
        });

        if(existingRequest){
            return res.status(400).json({
                error: true,
                message: "This friend request already exists"
            });
        }

        const newFriendRequest = await FriendRequest.create({
            sender: myId,
            receiver: receiverId,
        });

        return res.status(201).json({
            success: true,
            message: "Friend request created successfully",
            data: newFriendRequest
        });
    }
    catch(error){
        console.error("Error in sendFriendRequest.controller.ts:",error);
        return res.status(500).json({
            error: true,
            message: "Internal Server Error"
        })
    }
}

export default sendFriendRequest;
