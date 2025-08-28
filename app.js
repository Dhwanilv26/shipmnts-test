import express from "express";
import dotenv from "dotenv";
dotenv.config();
import connectDB from "./database/db.js";
import cookieParser from "cookie-parser";
import authRouter from "./routes/auth.routes.js";

const app = express();
app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRouter);
app.get("/", (req, res) => {
  res.json({ message: "API IS RUNNING" });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, async () => {
  console.log(`server is running on port ${PORT} `);
  connectDB();
});

export default app;
