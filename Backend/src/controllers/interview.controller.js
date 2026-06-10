const { PDFParse } = require("pdf-parse")
const generateInterviewReport = require("../services/ai.service")
const interviewReportModel = require("../models/InterviewReport.model")


/**
 * @description Controller to generate interviee report based on user self description , resume and job
 */
async function generateInterviewReportController(req, res) {
    try {
        // Guard: ensure a file was actually uploaded
        if (!req.file || !req.file.buffer) {
            return res.status(400).json({
                message: "No resume PDF file uploaded. Please attach a PDF file with field name 'resume'."
            });
        }

        // Parse the uploaded PDF buffer directly
        const pdfParser = new PDFParse({ data: req.file.buffer })
        const resumeContent = await pdfParser.getText();

        const { selfDescription, jobDescription } = req.body

        if (!selfDescription || !jobDescription) {
            return res.status(400).json({
                message: "selfDescription and jobDescription are required fields."
            });
        }

        const interViewReportByAi = await generateInterviewReport({
            resume: resumeContent.text,
            selfdescription: selfDescription,
            jobdescription: jobDescription
        })

        const interviewReport = await interviewReportModel.create({
            // user: req.user.id,
            resume: resumeContent.text,
            SelfDescription: selfDescription,
            jobDescription: jobDescription,
            ...interViewReportByAi
        })

        res.status(201).json({
            message: "interview report generated successfully",
            interviewReport
        })

    } catch (error) {
        console.error("Interview report error:", error.message)
        res.status(500).json({
            message: "Failed to generate interview report",
            error: error.message
        })
    }
}


/**
 * 
 * @description Controller to get interview report by interviewId
 */
async function getInterviewReportByIdController(req, res) {
    const { interviewId } = req.params

    const interviewReport = await interviewReportModel.findOne({ _id: interviewId, user: req.user.id })

    if (!interviewReport) {
        return res.status(404).json({
            message: "Interview report not found."
        })
    }

    res.status(200).json({
        message: "interview report fetched successfully.",
        interviewReport
    })


}

/**
 * @description Controller to get all interview reports of logged in user
 */

async function getAllInterviewReportController(req, res) {
    const interviewReports = (await interviewReportModel.find({ user: req.user.id })).toSorted({ createdAt: -1 }).select("-resume -selfDescription -jobDescription -__v -technicalQuestions -behavioralQuestions -skillGaps -preparationPlan")

    res.status(200).json({
        message: "Interview reports fetched successfully.",
        interviewReports
    })
}

module.exports = { generateInterviewReportController, getInterviewReportByIdController, getAllInterviewReportController }