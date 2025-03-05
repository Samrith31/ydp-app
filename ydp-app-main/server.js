import express from "express";
import cors from "cors";
import nodemailer from "nodemailer";
import connectDB from "./backend/lib/db.js";
import User from "./backend/models/User.js";
import dotenv from "dotenv";

dotenv.config(); // Load environment variables

const app = express();
app.use(cors());
app.use(express.json());

// ✅ Log Important Environment Variables (Without Showing Passwords)
console.log("✅ MongoDB URI:", process.env.MONGODB_URI ? "Loaded" : "Not Found");
console.log("✅ Email User:", process.env.EMAIL_USER ? "Loaded" : "Not Found");
console.log("✅ Admin Email:", process.env.ADMIN_EMAIL ? "Loaded" : "Not Found");

// ✅ Connect to MongoDB
connectDB();

// ✅ API to Register User & Send Email to Admin
app.post("/api/register", async (req, res) => {
  try {
    const { name, phone, location, gender, dob } = req.body;
    console.log(`📝 Registering User: ${name}, ${phone}`);

    if (!name || !phone || !location || !gender || !dob) {
      console.log("❌ Missing Fields");
      return res.status(400).json({ message: "All fields are required!" });
    }

    const userExists = await User.findOne({ phone });
    if (userExists) {
      console.log(`❌ User already registered: ${phone}`);
      return res.status(400).json({ message: "User already registered" });
    }

    const userId = `YDP-${Date.now()}`;
    const user = new User({ name, phone, location, gender, dob, userId });
    await user.save();
    console.log(`✅ Registration Successful, User ID: ${userId}`);

    // ✅ Send email to admin
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS, // 🔹 Keep this hidden & never expose it
      },
      tls: { rejectUnauthorized: false },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.ADMIN_EMAIL,
      subject: "New Member Registered - All India Youth Development Party",
      text: `A new Member has registered.\n\nName: ${name}\nPhone: ${phone}\nLocation: ${location}\nGender: ${gender}\nDOB: ${dob}\nUser ID: ${userId}`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error("❌ Email Sending Error:", error);
      } else {
        console.log("✅ Email Sent to Admin:", info.response);
      }
    });

    res.status(201).json({ message: "✅ Registration successful!", userId });
  } catch (error) {
    console.error("❌ Registration Error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// ✅ API to Fetch User Details by ID
app.get("/api/user/:userId", async (req, res) => {
  try {
    console.log(`🔍 Searching for user with ID: ${req.params.userId}`);

    const user = await User.findOne({ userId: req.params.userId });

    if (!user) {
      console.log("❌ User not found!");
      return res.status(404).json({ message: "User not found" });
    }

    console.log("✅ User found:", user);

    res.status(200).json({ user });
  } catch (error) {
    console.error("❌ Error fetching user:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// ✅ API to Fetch Users Based on District
app.get("/api/users", async (req, res) => {
  try {
    const { district } = req.query;
    if (!district) {
      return res.status(400).json({ message: "District is required" });
    }

    const users = await User.find({ location: district }).select("name userId");
    res.status(200).json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// ✅ Server Configuration
const PORT = process.env.PORT || 5000;
app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on port ${PORT}`);
});
