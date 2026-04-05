import express from "express";
import { protectRoute } from "../middlewares/protectRoute.ts";
import getRecommendedFriends from "../controllers/user/getRecommendedFriends.controller.ts";
import getMyFriends from "../controllers/user/getMyFriends.controller.ts";
import sendFriendRequest from "../controllers/user/sendFriendRequest.controller.ts";
import acceptFriendRequest from "../controllers/user/acceptFriendRequest.controller.ts";
import getFriendRequests from "../controllers/user/getFriendRequest.controller.ts";
import getOutgoingFriendRequests from "../controllers/user/getOutgoingFriendRequests.controller.ts";

const router = express.Router();

router.use(protectRoute);

router.get("/", getRecommendedFriends);
router.get("/friends", getMyFriends);
router.post("/friend-request/:id", sendFriendRequest);
router.put("/friend-request/:id/accept", acceptFriendRequest);
router.get("/friend-requests", getFriendRequests);
router.get("/outgoing-friend-requests", getOutgoingFriendRequests);

export default router;
