import express from 'express';
import { protectRoute } from '../middlewares/protectRoute.ts';
import getRecommendedFriends from '../controllers/user/getRecommendedFriends.controller.ts';
import getMyFriends from '../controllers/user/getMyFriends.controller.ts';
import sendFriendRequest from '../controllers/user/sendFriendRequest.controller.ts';

const router = express.Router();

router.use(protectRoute);

router.get('/', getRecommendedFriends);
router.get('/friends', getMyFriends);
router.get('/friend-request/:id', sendFriendRequest);
