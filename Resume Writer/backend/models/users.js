const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: {
      type: String,
      required: true,
    },
    resumes: [
      { type: mongoose.Schema.Types.ObjectId, ref: "Resume" },
    ] /*here i have taken arrat so that one person can have  multiple resumes. */,
  },
  { timestamps: true }
);
const Users = mongoose.model("Users", userSchema);
module.exports = Users;
