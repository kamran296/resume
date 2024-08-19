const express = require("express");
const router = express.Router();
const { generateResume } = require("../controllers/resumeController");
const resumeDataController = require("../controllers/resumeDataController");
const { auth } = require("../middleware/authToken");

router.post("/generate", generateResume);
router.route("/add").post(auth, resumeDataController.createResume);
router.route("/get-resume/:id").get(auth, resumeDataController.getUserResume);
router.put("/:resumeId", resumeDataController.updateResume);
module.exports = router;
