import express from "express";
import { getUserData } from "../controllers/userController.js";
import userAuth from "../middleware/userAuth.js";

const userRouter = expressRouter();


userRouter.get("/data",userAuth,getUserData);



export default userRouter;