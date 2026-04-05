import express from "express";
import { protectRoute } from "../middlewares/protectRoute.ts";
import { getStreamToken } from "../controllers/chat/index.ts";

const router = express.Router();

router.get("/token", protectRoute, getStreamToken);

export default router;
