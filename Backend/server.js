import express from "express";
const port = process.env.PORT || 8000;
const app = express();
import cookieParser from 'cookie-parser';
import cors from "cors";
import "dotenv/config";
import connectDB from "./config/db.js";

connectDB();

app.use(cors({ Credentials: true }));
app.use(cookieParser());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Api is working");
});

// app.get("/api/plan/:planName", (req, res) => {

//     const { planName } = req.params;

//     res.send(`You are viewing details for the ${planName} internet speed bundle.`);
// });

app.listen(port, () => {
  console.log(`app runs on http://localhost:${port} `);
});
