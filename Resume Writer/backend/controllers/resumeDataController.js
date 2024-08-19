const Resume = require("../models/resume");
const Users = require("../models/users");
const USers = require("../models/users");
// Create a new resume
exports.createResume = async (req, res) => {
  const userId = req.user.userId;
  try {
    console.log("req.user.userId:", req.user.userId);
    const resume = new Resume({
      user: userId, // assuming user id is stored in req.user
      ...req.body,
    });
    await resume.save();
    const resumeId = resume._id;
    const user = await Users.findByIdAndUpdate(
      userId,
      { $push: { resumes: resumeId } },
      { new: true, useFindAndModify: false }
    );

    res.status(201).json(resume);
  } catch (error) {
    res.status(500).json({ message: "Error creating resume", error });
  }
};

// Get a user's resume
exports.getUserResume = async (req, res) => {
  const userId = req.user.userId; // Extract userId from the token payload
  const resumeId = req.params.id;

  try {
    // Find the resume associated with the user
    console.log(resumeId);
    const resume = await Resume.findById({ _id: resumeId });
    if (!resume) {
      return res.status(404).json({ message: "Resume not found" });
    }

    res.status(200).json({ resume });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Something went wrong", error: error.message });
  }
};

exports.updateResume = async (req, res) => {
  const { resumeId } = req.params;
  const updateData = req.body;

  try {
    // Find the resume by ID and update it with the new data
    console.log("resumeId", resumeId);
    const updatedResume = await Resume.findByIdAndUpdate(resumeId, updateData, {
      new: true,
      runValidators: true,
    });

    if (!updatedResume) {
      return res.status(404).json({ message: "Resume not found" });
    }

    res.status(200).json(updatedResume);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
