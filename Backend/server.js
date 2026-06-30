import express from "express";
const port = process.env.PORT || 6000;
const app = express();
import cookieParser from 'cookie-parser';
import cors from "cors";
import "dotenv/config";
import connectDB from "./config/db.js";

connectDB();

// import the auth router
import authRouter from './routes/authRoutes.js';

app.use(cors({ Credentials: true }));
app.use(cookieParser());
app.use(express.json());


// api endpoints
app.get("/", (req, res) => {
  res.send("Api is working");
});
app.use("/api/auth", authRouter);



app.listen(port, () => {
  console.log(`app runs on http://localhost:${port} `);
});
