const express = require("express");
const router = express.Router();
const User = require("../models/User_Customer");
const nodemailer = require("nodemailer");
const jwt = require("jsonwebtoken");

require("dotenv").config();

const encodeKey = process.env.ENCODE_KEY;
const user_mail_address = process.env.MAIL_ADDRESS;
const user_mail_password = process.env.Mail_PASS;

router.post("/login", async (req, res) => {
  const { id, password } = req.body;
  try {
    const user = await User.findOne({ phoneNumber: id });

    if (!user) {
      return res.status(200).json({
        success: false,
        data: "User not found. Please sign up to create an account.",
      });
    }

    if (user.password !== password) {
      return res.status(200).json({
        success: false,
        data: "Incorrect password. Please verify your password and try again.",
      });
    }
    delete user.password;

    const token = jwt.sign({ user }, encodeKey, {
      expiresIn: "5d",
    });

    res.status(200).json({ success: true, data: user, token });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, data: "An error occurred: " + error.message });
  }
});

router.post("/createAccount", async (req, res) => {
  const payload = req.body;
  try {
    const existingUser = await User.findOne({
      $or: [{ phone: payload.phoneNumber }, { email: payload.email }],
    });

    if (existingUser) {
      return res.status(200).json({
        success: false,
        data: "Phone number or email is already registered. Please login",
      });
    }

    const createAccount = new User(payload);
    const user = await createAccount.save();

    delete user.password;

    const token = jwt.sign({ user }, encodeKey, {
      expiresIn: "5d",
    });

    res.json({ success: true, data: user, token });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, data: "An error occurred: " + error.message });
  }
});

router.post("/forgotpassword", async (req, res) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ email }, { _id: 1 });

    if (!user) {
      return res.status(200).json({
        success: false,
        data: "Email not found. Please register",
      });
    }
    const token = jwt.sign({ user }, encodeKey, {
      expiresIn: "10m",
    });

    const url = `${process.env.CLIENT_URL}forgot_password/${token}`;
    const message = `Your token will expire in 10 minutes. Please complete the necessary actions within this time frame.
     \n\n
    Please click on the link below to reset your password \n\n ${url}`;

    let transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: user_mail_address,
        pass: user_mail_password,
      },
    });

    // Set up email data
    let mailOptions = {
      from: user_mail_address,
      to: email,
      subject: "Forgot Password",
      text: message,
    };

    // Send email
    let info = await transporter.sendMail(mailOptions);
    console.log("Email sent: " + info.response);

    res.status(200).json({ data: "Email sent successfully", success: true });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ data: error.message || "Failed to send email", success: false });
  }
});

router.post("/forgotpassword/:token", async (req, res) => {
  try {
    const { token, password } = req.body;
    if (!password) {
      return res
        .status(200)
        .json({ data: "Password is required", success: false });
    }
    const decoded = jwt.verify(token, encodeKey);

    if (decoded.error) {
      return res.status(200).json({ data: "Token is invalid", success: false });
    }

    const user = await User.findById(decoded.user._id);

    if (!user) {
      return res.status(404).json({ data: "User not found", success: false });
    }
    user.password = password;
    await user.save();
    res.status(200).json({
      data: "Password updated successfully, Login with new Password !!!",
      success: true,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      data: error.message || "Failed to verify token",
      success: false,
    });
  }
});

module.exports = router;
