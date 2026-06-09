const { PDFParse } = require("pdf-parse")
const generateInterviewReport = require("../services/ai.service")
const interviewReportModel = require("../models/InterviewReport.model")

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

module.exports = { generateInterviewReportController }