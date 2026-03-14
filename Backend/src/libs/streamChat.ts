import { StreamChat } from "stream-chat";

const STREAM_CHAT_API_KEY = process.env.STREAM_CHAT_API_KEY;
const STREAM_CHAT_API_SECRET = process.env.STREAM_CHAT_API_SECRET;

const streamChat = StreamChat.getInstance(
  STREAM_CHAT_API_KEY as string,
  STREAM_CHAT_API_SECRET as string,
);

export const upsertStreamUser = async (userData: any) => {
  try {
    await streamChat.upsertUsers([userData]);
    return userData;
  } catch (error) {
    console.error("Error in upsertStreamUser.ts: ", error);
    throw new Error("Failed to upsert user in Stream Chat");
  }
};

export const generateStreamToken = async (userId: string) => {
  try {
    const token = streamChat.createToken(userId);
    return token;
  } catch (error) {
    console.error("Error in generateStreamToken.ts: ", error);
    throw new Error("Failed to generate token in Stream Chat");
  }
};
