const express = require("express");
const router = express.Router();
const Job = require("../models/Job");

// Route to get all jobs
router.get("/", async (req, res) => {
  try {
    const jobs = await Job.find(); // Fetch all jobs from MongoDB
    res.json(jobs);
  } catch (error) {
    res.status(500).json({ message: "Error fetching jobs", error });
  }
});

module.exports = router;
