import express from "express";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.routes.ts";

dotenv.config();
const PORT = process.env.PORT;

const app = express();

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use('/api/auth', authRoutes);

app.listen(PORT, () => console.log(`Server is running on the port ${PORT}`));
