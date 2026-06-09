const express = require("express");
const authMiddleware = require("../middleware/auth.middleware")
const interviewController = require("../controllers/interview.controller")
const upload = require("../middleware/file.middleware");
const interviewRouter = express.Router();

/**
 * @route POSt/api/interview
 * @description generate new interview report on the basis of user self description ,
 * resume pdf and job description
 * @access private
 */


// Auth temporarily disabled for testing — re-enable before production
interviewRouter.post("/", upload.single("resume"), interviewController.generateInterviewReportController);

module.exports = interviewRouter