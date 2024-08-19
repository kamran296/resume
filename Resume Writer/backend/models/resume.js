const mongoose = require("mongoose");

const resumeSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "Users", required: true },
  personalInfo: {
    Name: {
      type: String,
      required: true,
    },
    Email: {
      type: String,
      required: true,
    },
    Address: {
      type: String,
    },
    Phone: {
      type: String,
      required: true,
    },
  },

  education: [
    {
      University_Name: { type: String },
      Graduation_Date: { type: Date },
      Degree: { type: String },
      Department: { type: String },
    },
  ],
  projects: [
    {
      ProjectTitle: { type: String },
      Year: { type: Date },
      Role: { type: String },
      Location: { type: String },
      Description: { type: String },
    },
  ],
  skills: [{ Title: { type: String }, tags: { type: String } }],
  activities: { type: String },
  achievements: { type: String },
  objective: { type: String },
  work: [
    {
      Company: { type: String },
      Date: { type: Date },
      Title: { type: String },
      Description: { type: String },
    },
  ],
  extra: [
    {
      Title: { type: String },
      Description: { type: String },
    },
  ],
});

const Resume = mongoose.model("Resume", resumeSchema);

module.exports = Resume;
