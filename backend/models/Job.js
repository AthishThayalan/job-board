const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const model = mongoose.model;

const jobSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  company: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
});

const Job = model("Job", jobSchema);

module.exports = Job;
