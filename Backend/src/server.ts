import "dotenv/config";
import express from "express";
import cookieParser from "cookie-parser";

import authRoutes from "./routes/auth.routes.ts";
import userRoutes from "./routes/user.routes.ts";
import chatRoutes from "./routes/chat.routes.ts";
import { connectToDB } from "./libs/index.ts";
import checkEnvironmentConfig from "./libs/checkEnvironmentConfig.ts";
const PORT = process.env.PORT;

const app = express();

app.use(express.json()); // to parse the incoming requests with JSON payloads (from req.body)
app.use(cookieParser());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/chats", chatRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on the port ${PORT}`);
  try {
    checkEnvironmentConfig();
    connectToDB();
  } catch (error) {
    console.error("Error in server.ts: ", error);
    process.exit(1);
  }
});
