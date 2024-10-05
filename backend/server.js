const dotenv = require("dotenv");
dotenv.config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const authRoutes = require("./routes/auth");
const jobRoutes = require("./routes/jobs");

const app = express();
const port = 5000;

app.use(cors());

app.use(express.json());

console.log("JWT_SECRET in server.js:", process.env.JWT_SECRET);

// Connect to MongoDB
mongoose
  .connect("mongodb://localhost:27017/jobListings", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB !!!"))
  .catch((error) => console.error("Error connecting to MongoDB:", error));

// Use job routes
app.use("/auth", authRoutes);
app.use("/jobs", jobRoutes);

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port} ...`);
});
