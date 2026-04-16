import userModel from "./user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";


export const registerController = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "Email is already registered. Try logging in!",
      });
    }

   
    const newUser = new userModel({ name, email, password });
    await newUser.save();

    res.status(201).json({
      success: true,
      message: "User Registered Successfully",
      newUser: {
        _id: newUser._id,
        name: newUser.name,
        email: newUser.email,
      },
    });
  } catch (error) {
    console.log("❌ Register Error:", error);
    res.status(500).json({
      success: false,
      message: "Error in Registration API",
      error: error.message,
    });
  }
};


export const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;

    
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User Not Found",
      });
    }

    
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid Credentials",
      });
    }

    
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    
    res.status(200).json({
      success: true,
      message: "Login Successful",
      token, 
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    console.log("❌ Login Error:", error);
    res.status(500).json({
      success: false,
      message: "Error in Login API",
      error: error.message,
    });
  }
};