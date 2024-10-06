const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../models/User");
const multer = require("multer");
const path = require("path");
const verifyToken = require("../middleware/authMiddleware"); // Ensure this middleware is imported

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET;

// Set up multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // Specify the directory to store the uploaded files
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});
const upload = multer({ storage: storage });

// Serve the uploaded files as static files
router.use("/uploads", express.static(path.join(__dirname, "../uploads")));

// Register route
router.post("/register", async (req, res) => {
  const { username, email, password, displayName, description } = req.body;
  try {
    const newUser = new User({
      username,
      email,
      password,
      displayName,
      description,
    });
    await newUser.save();
    res
      .status(201)
      .json({ message: "User registered successfully", user: newUser });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Login route
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ error: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: "Invalid credentials" });
    }

    // Create JWT token
    const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: "1h" });
    res.json({
      token,
      user: { id: user._id, username: user.username, email: user.email },
    });
  } catch (error) {
    console.log("Error during login:", error.message);
    res.status(500).json({ error: error.message });
  }
});

// Image upload route
router.put(
  "/profile/upload",
  verifyToken,
  upload.single("profileImage"),
  async (req, res) => {
    try {
      // Check if a file was uploaded
      if (!req.file) {
        return res.status(400).json({ message: "No file uploaded" });
      }

      const user = await User.findById(req.user.id);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      // Set the image path
      user.profileImage = `/uploads/${req.file.filename}`;
      await user.save();
      res.json({
        message: "Profile image uploaded successfully",
        profileImage: user.profileImage,
      });
    } catch (err) {
      console.error("Error during image upload:", err);
      res.status(500).json({ message: "Server Error" });
    }
  }
);

// Update user profile
router.put("/profile", verifyToken, async (req, res) => {
  const { displayName, description } = req.body;
  try {
    const user = await User.findById(req.user.id);
    if (user) {
      user.displayName = displayName || user.displayName;
      user.description = description || user.description;
      await user.save();
      res.json(user);
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
});

// Get user profile
router.get("/profile", verifyToken, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
});

module.exports = router;
