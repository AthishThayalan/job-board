const express = require("express");
const Job = require("../models/Job");

const router = express.Router();

// Route to get all jobs
router.get("/", async (req, res) => {
  try {
    const jobs = await Job.find();
    res.json(jobs);
  } catch (error) {
    res.status(500).json({ message: "Error fetching jobs", error });
  }
});

module.exports = router;
