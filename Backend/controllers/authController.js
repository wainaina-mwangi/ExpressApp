import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import userModel from "../models/userModel.js";
import transporter from "../config/nodeMailer.js";




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

    const hashedPassword = await bcrypt.hash(password, 10);
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

    // respond to the client now — signup is already done and safe
    res.json({ success: true });

    // fire the welcome email after responding; failures here
    // must never affect the response already sent
    try {
      await transporter.sendMail({
        from: process.env.SENDER_EMAIL,
        to: email,
        subject: "welcome to MERN",
        text: `welcome to Mern your account has been created with email id:${email}`,
      });
    } catch (mailError) {
      console.error("Welcome email failed for", email, mailError.message);
      // nothing else to do — user is registered either way
    }
  } catch (error) {
    return res.json({ success: false, message: error.message });
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

    const isMatched = await bcrypt.compare(password, user.password);

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
  return  res.json({ success: false, message: error.message });
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
    return  res.json({success:false,message:error.message});
    }
 };





//  otp generation function

export const sendVerifyOtp = async (req, res) => {
  try {
    const { userId } = req.body;
    const user = await userModel.findById(userId);

    if (!user) {
      return res.json({ success: false, message: "user not found" });
    }

    if (user.isAccountVerified) {
      return res.json({ success: false, message: "user account verified" });
    }

    const otp = String(Math.floor(100000 + Math.random() * 900000));
    user.verifyOtp = otp;
    user.verifyOtpExpiredAt = Date.now() + 24 * 60 * 60 * 1000;
    await user.save();

    const mailOptions = {
      from: process.env.SENDER_EMAIL,
      to: user.email,
      subject: "Account verification OTP",
      text: `Your ${otp}. verify your account using this otp `,
    };

    await transporter.sendMail(mailOptions);

    return res.json({ success: true, message: "otp sent successfully" });
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};





export const verifyEmail = async (req, res) => {
  const { userId, otp } = req.body;

  if (!userId || !otp) {
    return res.json({ success: false, message: "missing details" });
  }

  try {
    const user = await userModel.findById(userId);
    if (!user) {
      return res.json({ success: false, message: "user not found" });
    }

    if (user.verifyOtp === "" || user.verifyOtp !== otp) {
      return res.json({ success: false, message: "invalid OTP" });
    }

    if (user.verifyOtpExpiredAt < Date.now()) {
      return res.json({ success: false, message: "OTP expired" });
    }

    user.isAccountVerified = true;
    user.verifyOtp = "";
    user.verifyOtpExpiredAt = 0;
    await user.save();

    return res.json({ success: true, message: "email verified successfully" });
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};






export const isAuthenicated = async (req,res)=>{
  try {

    return res.json({success:true});
  } catch (error) {
     return res.json({ success: false, message: error.message });
  }
}


// SEND PASSSWORD RESET OT[P] 
export const sendResetOtp = async (req,res) =>{
  const {email} = req.body;

  if(!email){
    return({success:false,message:"email is required"});
  }

  try {
    const user = await userModel.findOne({email});

    if(!user){
      res.json({succcess:false, message:"user does not exist"});
    }

     const otp = String(Math.floor(100000 + Math.random() * 900000));
    user.resetOtp = otp;
    user.resetOtpExpiredAt = Date.now() + 15 * 60 * 60 * 1000;
    await user.save();

    const mailOptions = {
      from: process.env.SENDER_EMAIL,
      to: user.email,
      subject: "password reset  OTP",
      text: `Your otp for reseting your password is ${otp}. reset your account using this otp `,
    };

    await transporter.sendMail(mailOptions);

    return res.json({success:true, message:"reset otp generated"});

  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
}




// reset password user
export const resetPassword = async (req,res)=>{
  const {email, otp, newPassword} = req.body;

  if(!email || !otp || !newPassword){
     res.json({succcess:false, message:"email,otp and newPassword required"});
  }
   
  try {
    const user = await userModel.findOne({email});
    if(!user){
       res.json({succcess:false, message:"user not found"});
    }

  if(user.resetOtp === ""||user.resetOtp == !otp){
    res.json({succcess:false, message:"invalid otp"});
  }

  if(user.resetOtpExpiredAt < Date.now()){
    res.json({succcess:false, message:"otp expired"});
  }

  const hashedPassword = await bcrypt.hash(hashedPassword,10);
  user.password = hashedPassword;
  user.resetOtp = '';
  user.resetOtpExpiredAt = 0;

  await user.save();
    return res.json({success:true, message:"password reset successfuly"});
  } catch (error) {
     return res.json({ success: false, message: error.message });
  }
}

