import bycrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import userModel from "../models/userModel.js";




// register controller
export const register = async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.json({ success: false, message: "missing details" });
  }

  try {
    const existingUser = await userModel.findOne({ email });

    if (existingUser) {
      return res.json({ success: false, message: "user already exists" });
    }
    const hashedPassword = await bycrypt.hash(password, 10);

    const user = new userModel({ name, email, password: hashedPassword });
    await user.save();

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

     res.json({ success: true });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};





// login controller
export const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.json({ success: false, message: "email and password required" });
  }

  try {
    const user = await userModel.findOne({ email });

    if (!user) {
      return res.json({ success: false, message: "invalid email" });
    }

    const isMatched = await bycrypt.compare(password, user.password);

    if (!isMatched) {
      return res.json({ success: false, message: "invalid password" });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.json({ success: true });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};





// logout controller 
 export const logout = async (req,res)=>{

    try {
      res.clearCookie('token',{
       httpOnly: true,
       secure: process.env.NODE_ENV === "production",
       sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
      });

      return res.json({success:true,message:"logged out"});
    } catch (error) {
      res.json({success:false,message:error.message});
    }
 }
