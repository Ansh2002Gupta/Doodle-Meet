import mongoose from "mongoose";

interface IFriendRequest extends mongoose.Document{
    sender: mongoose.Schema.Types.ObjectId;
    receiver: mongoose.Schema.Types.ObjectId;
    status: "pending" | "accepted"
}

const schemaSkeleton = {
    sender:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    receiver: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    status: {
        type: String,
        enum: ["pending", "accepted"],
        default: "pending",
    },
}

const FriendRequestSchema = new mongoose.Schema(schemaSkeleton, {timestamps: true});

const FriendRequest = mongoose.model<IFriendRequest>("FriendRequest", FriendRequestSchema);

export default FriendRequest;
