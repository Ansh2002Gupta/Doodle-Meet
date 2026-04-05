import { generateStreamToken } from "../../libs/streamChat.ts";
import { Request, Response } from "express";

async function getStreamToken(req: Request, res: Response) {
  try {
    const token = generateStreamToken((req as any).user.id);
    return res
      .status(200)
      .json({
        success: true,
        message: "Stream token generated successfully",
        data: token,
      });
  } catch (error) {
    console.error("Error in getStreamToken.controller.ts:", error);
    return res
      .status(500)
      .json({ error: true, message: "Internal server error" });
  }
}

export default getStreamToken;
