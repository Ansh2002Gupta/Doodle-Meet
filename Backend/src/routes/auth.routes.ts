import express from "express";
import {
  signupController,
  loginController,
  logoutController,
  onboardController,
} from "../controllers/auth/index.ts";
import { protectRoute } from "../middlewares/protectRoute.ts";

const router = express.Router();

router.post("/signup", signupController);

router.post("/login", loginController);

router.post("/logout", logoutController);

router.post("/onboarding", protectRoute, onboardController);

router.get("/me", protectRoute, (req, res) =>
  res
    .status(200)
    .json({ success: true, message: "User found", data: (req as any).user }),
);
export default router;
