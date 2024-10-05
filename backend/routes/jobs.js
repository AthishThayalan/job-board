// routes/jobs.js
const express = require("express");
const Job = require("../models/Job");
const verifyToken = require("../middleware/authMiddleware");

const router = express.Router();

// Create a new job listing (protected route)
router.post("/create", verifyToken, async (req, res) => {
  const { title, company, location, description } = req.body;
  try {
    const newJob = new Job({
      title,
      company,
      location,
      description,
      user: req.user.id,
    });
    await newJob.save();
    res.status(201).json(newJob);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Get all job listings
router.get("/", async (req, res) => {
  try {
    const jobs = await Job.find();
    res.json(jobs);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
