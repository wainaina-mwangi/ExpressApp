import express from "express";
import { getUserData } from "../controllers/userController";
import userAuth from "../middleware/userAuth";

const userRouter = expressRouter();


userRouter.get("/data",userAuth,getUserData);