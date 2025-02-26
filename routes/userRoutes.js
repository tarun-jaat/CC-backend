const express = require('express');
const router = express.Router();
const OTP = require('../models/OTP.model');
const otpGenerator = require("otp-generator");
const User = require('../models/User');
const mailSender = require('../utils/emailService')
const crypto = require('crypto');
const jwt = require('jsonwebtoken');

const generateReferralId = () => {
  return Math.random().toString(36).substr(2, 7).toUpperCase();
};


router.post('/signup', async (req, res) => {
  try {
    const { name, email, phone, pickupLocation, dropLocation, referralId } = req.body;

    // Validate required fields
    if (!name || !email || !phone || !pickupLocation || !dropLocation) {
      return res.status(400).json({
        success: false,
        error: 'All fields except referral ID are required'
      });
    }

    // Validate phone format
    if (!/^\d{10}$/.test(phone)) {
      return res.status(400).json({
        success: false,
        error: 'Invalid phone number format (10 digits required)'
      });
    }

    // Validate email format
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return res.status(400).json({
        success: false,
        error: 'Invalid email format'
      });
    }

    let referrer = null;

    if (referralId) {
      referrer = await User.findOne({ referralId });
      if (!referrer) return res.status(400).json({ error: 'Invalid referral ID' });
    }

    const existingUser = await User.findOne({
      $or: [{ email: email }, { phone: phone }]
    });

    if (existingUser) {
      return res.status(400).json({
        error: 'User already exists with this email or phone number'
      });
    }

    const newReferralId = generateReferralId();
    const user = new User({
      name,
      email,
      phone,
      pickupLocation,
      dropLocation,
      referralId: newReferralId
    });

    await user.save();

    if (referrer) {
      await User.findByIdAndUpdate(referrer._id, {
        $inc: { referralCount: 1 },
        $push: { referredUsers: user._id }
      });
      referrer.referralCount += 1; 
      await referrer.save(); 
    }

    res.status(201).json({
      success: true,
      referralId: newReferralId,
      referralCount: referrer ? referrer.referralCount : 0
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message.replace('Error: ', '')
    });
  }
});

// Modified send-otp route with immediate response
router.post('/send-otp', async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email }).lean();
    if (!user) return res.status(400).json({ error: 'User not registered' });
    var otp = otpGenerator.generate(6, {
      upperCaseAlphabets: false,
      lowerCaseAlphabets: false,
      specialChars: false,
    });
    const userName = user.name;
    const result = await OTP.findOne({ otp: otp ,userName: userName});
    while (result) {
      otp = otpGenerator.generate(6, {
        upperCaseAlphabets: false,
      });
    }
    const otpPayload = { email, otp, userName }; // Include userName in the payload
    const otpBody = await OTP.create(otpPayload);
    // console.log("OTP Body", otpBody);
    res.status(200).json({
      success: true,
      message: `OTP Sent Successfully`,
    });
  } catch (error) {
    // console.log(error.message);
    return res.status(500).json({ success: false, error: error.message });
  }
});

router.post("/verify-otp", async (req, res) => { 
  try {
    const { email, otp } = req.body;

    // Find the latest OTP for the email
    const latestOTP = await OTP.findOne({ email }).sort({ createdAt: -1 });

    if (!latestOTP) {
      return res.status(400).json({
        success: false,
        message: "The OTP is not valid",
      });
    }

    // Check if OTP matches
    if (latestOTP.otp !== String(otp)) {
      return res.status(400).json({
        success: false,
        message: "The OTP is not valid",
      });
    }

    const otpExpirationTime = 10 * 60 * 1000; // 10 minutes in ms
    if (new Date() - new Date(latestOTP.createdAt) > otpExpirationTime) {
      return res.status(400).json({
        success: false,
        message: "The OTP has expired",
      });
    }
    
    const user = await User.findOne({ email });    
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User not found",
      });
    }
    // Generate JWT token
    const token = jwt.sign({ email }, 'mysecretkey', { expiresIn: '1h' });

    // Set token in cookies
    res.cookie('token', token, { httpOnly: true });

    // Success response
    return res.status(200).json({
      success: true,
      message: "OTP verified successfully",
      token: token,
      userData: {
        name: user.name,
        email: user.email,
        referralId: user.referralId,
        referralCount: user.referralCount, 
      },
    });

  } catch (error) {
    console.error("Error verifying OTP:", error);
    return res.status(500).json({
      success: false,
      error: "Server Error",
    });
  }
});

module.exports = router;