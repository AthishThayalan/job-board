const express = require("express");
const mongoose = require("mongoose");
const jobRoutes = require("./routes/jobs");
const cors = require("cors"); // Import cors

const app = express();
const port = 5000;

app.use(cors()); // Enable CORS for all routes

// Middleware to parse JSON
app.use(express.json());

// Connect to MongoDB
mongoose
  .connect("mongodb://localhost:27017/jobListings", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB !!!"))
  .catch((error) => console.error("Error connecting to MongoDB:", error));

// Use job routes
app.use("/jobs", jobRoutes);

app.get("/", (req, res) => {
  res.send("hello");
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port} ...`);
});
