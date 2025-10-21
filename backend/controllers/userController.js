import userModel from "../models/userModel.js";
import validator from "validator";
import bcrypt from 'bcrypt';

// Route for user login
const loginUser = async (req, res) => {};

// Route for user register.
const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    //checking user already exists or not
    const exists = await userModel.findOne({ email });
    if (exists) {
      return res.json({ success: false, message: "User already exists" });
    }

    // validating email format & strong password.
    if (!validator.isEmail(email)) {
      return res.json({
        success: false,
        message: "Please enter a valid email",
      });
    }
    if (password.length < 8) {
      return res.json({
        success: false,
        message: "Please enter a strong password",
      });
    }

    // hasing user password. time 6: 05;
  } catch (error) {}
};

// Route for admin login.
const adminLogin = async (req, res) => {
  res.send("hi i am admin");
};

export { loginUser, registerUser, adminLogin };
