const { User } = require('../models');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
require('dotenv').config();

// Temporary in-memory storage
const pendingSignups = {};
const pendingLogins = {};
const pendingPasswordResets = {};

// Email transporter
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'mokshithsai263@gmail.com',
    pass: 'vipwnwsdtdeitnoy'
  }
});

// OTP Generator
const generateOTP = () => Math.floor(100000 + Math.random() * 900000);

// Send OTP
const sendOTPEmail = async (email, otp) => {
  await transporter.sendMail({
    from: '"Your App Name" <mokshithsai263@gmail.com>',
    to: email,
    subject: 'Your OTP Code',
    html: `<p>Your OTP code is <b>${otp}</b>. It will expire in 10 minutes.</p>`
  });
};

// ------------------ SIGNUP FLOW ------------------

exports.requestSignupOTP = async (req, res) => {
  console.log('api called:request otp');
  try {
    const { name, phone_number, email, password, role, address, district, state, language } = req.body;

    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) return res.status(400).json({ message: "Email already registered." });

    const otp = generateOTP();
    const hashedPassword = await bcrypt.hash(password, 10);

    pendingSignups[email] = {
      name, phone_number, email, password_hash: hashedPassword,
      role, address, district, state, language, otp
    };

    await sendOTPEmail(email, otp);
    res.status(200).json({ message: "OTP sent to your email for verification." });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
exports.verifySignupOTP = async (req, res) => {
  try {
    const { email, otp } = req.body;
    const pending = pendingSignups[email];

    if (!pending || String(pending.otp) !== String(otp)) {
      return res.status(400).json({ message: "Invalid or expired OTP" });
    }

    const user = await User.create(pending);
    delete pendingSignups[email];

    res.status(201).json({ message: "Signup successful", user });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.verifyLoginOTP = async (req, res) => {
  try {
    const { email, otp } = req.body;
    const pending = pendingLogins[email];
    console.log(pending.user.role);
    if (!pending || String(pending.otp) !== String(otp)) {
      return res.status(400).json({ message: "Invalid or expired OTP" });
    }

    const token = jwt.sign({ userId: pending.user.id, role: pending.user.role }, process.env.JWT_SECRET, {
      expiresIn: "1y"
    });

    delete pendingLogins[email];
    res.status(200).json({ message: "Login successful", token, user: pending.user,role:pending.user.role });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// ------------------ LOGIN FLOW ------------------

exports.requestLoginOTP = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ where: { email } });
    if (!user || !(await bcrypt.compare(password, user.password_hash))) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const otp = generateOTP();
    pendingLogins[email] = { user, otp };

    await sendOTPEmail(email, otp);
    res.status(200).json({ message: "OTP sent to your email for login." });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// ------------------ FORGOT PASSWORD FLOW ------------------

// Step 1: Request OTP for Password Reset
exports.requestForgotPasswordOTP = async (req, res) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ where: { email } });
    if (!user) return res.status(404).json({ message: "User not found" });

    const otp = generateOTP();
    pendingPasswordResets[email] = { user, otp };

    await sendOTPEmail(email, otp);
    res.status(200).json({ message: "OTP sent to your email for password reset." });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Step 2: Verify OTP and Reset Password
exports.resetPasswordWithOTP = async (req, res) => {
  try {
    const { email, otp, newPassword } = req.body;

    const pending = pendingPasswordResets[email];
    if (!pending || pending.otp != otp) {
      return res.status(400).json({ message: "Invalid or expired OTP" });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    await User.update({ password_hash: hashedPassword }, { where: { email } });

    delete pendingPasswordResets[email];

    res.status(200).json({ message: "Password has been reset successfully." });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
