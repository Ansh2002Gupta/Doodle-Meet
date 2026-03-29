import { upsertStreamUser } from "../../libs/streamChat.ts";
import User from "../../schema/User.ts";
import { Request, Response } from "express";

async function onboardController(req: Request, res: Response) {
  try {
    const { fullName, bio, nativeLanguage, learningLanguage, location } =
      req.body;

    if (
      !fullName ||
      !bio ||
      !nativeLanguage ||
      !learningLanguage ||
      !location
    ) {
      return res.status(400).json({
        error: true,
        message: "All fields are required.",
        missingFields: [
          !fullName && "Full Name",
          !bio && "Bio",
          !nativeLanguage && "Native Language",
          !learningLanguage && "Learning Language",
          !location && "Location",
        ].filter(Boolean),
      });
    }

    let updatedUser;
    try {
      updatedUser = await User.findByIdAndUpdate(
        (req as any).user._id,
        {
          fullName,
          bio,
          nativeLanguage,
          learningLanguage,
          location,
          isOnboarded: true,
        },
        { new: true },
      ).select("-password");
    } catch (error) {
      console.error("Error in onboardController.ts | line 45:", error);
      return res
        .status(500)
        .json({ error: true, message: "Internal Server Error" });
    }

    if (!updatedUser)
      return res
        .status(400)
        .json({ error: true, message: "User cannot be onboarded" });

    try {
      await upsertStreamUser({
        id: updatedUser._id.toString(),
        name: updatedUser.fullName,
        image: updatedUser.profilePicture || "",
      });
    } catch (error) {
      console.error("Error in onboardController.ts | line 63:", error);
      return res
        .status(500)
        .json({ error: true, message: "Internal Server Error" });
    }

    return res.status(200).json({
      success: true,
      message: "User onboarded successfully",
      data: updatedUser,
    });
  } catch (error) {
    console.error("Error in onboardController.ts | line 75:", error);
    return res
      .status(500)
      .json({ error: true, message: "Internal Server Error" });
  }
}

export default onboardController;
