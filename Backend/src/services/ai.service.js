const { zodToJsonSchema } = require("zod-to-json-schema");

const { GoogleGenAI } = require("@google/genai");
const { z } = require('zod');

const ai = new GoogleGenAI({
    apiKey: process.env.GOOGLE_GENAI_API_KEY
})

async function invokeGeminiAi(prompt = "Hello gemini ! Explain what is Interview ?") {
    try {
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: prompt
        })
        console.log(response.text)
        return response.text;
    } catch (err) {
        console.error("Gemini API error:", err.message)
    }
}

const interviewReportSchema = z.object({
    matchScore: z.number().describe("A score between 0 to 100 indicating how well the candidate's profile matches the job description"),

    technicalQuestions: z.array(z.object({
        question: z.string().describe("The technical question that can be asked in the Interview"),
        intention: z.string().describe("The intention of interviewer behind asking this question"),
        answer: z.string().describe("How to answer this question, what points to cover")
    })).describe("Technical Questions that can be asked in the interview along with the intention"),

    behavioralQuestions: z.array(z.object({
        question: z.string().describe("The behavioral question that can be asked in the Interview"),
        intention: z.string().describe("The intention of interviewer behind asking this question"),
        answer: z.string().describe("How to answer this question, what points to cover")
    })).describe("Behavioral Questions that can be asked in the interview along with the intention"),

    skillGaps: z.array(z.object({
        skill: z.string().describe("The skill which the candidate is lacking"),
        severity: z.enum(["low", "medium", "high"]).describe("The severity of the skill gap")
    })).describe("Skill gaps that the candidate has"),

    preparationPlan: z.array(z.object({
        day: z.number().describe("The day number in the plan, starting from 1"),
        focus: z.string().describe("The main focus of this day in the preparation plan"),
        tasks: z.array(z.string()).describe("List of tasks to be done on this day")
    })).describe("A day-wise preparation plan for the candidate to follow in order"),

    title: z.string().describe("the title of the job for which the interview report is generated"),
})

/**
 * Removes fields from a JSON Schema that Gemini's API does not support.
 * zodToJsonSchema adds "$schema" and "additionalProperties: false" which
 * cause Gemini to return a 400 Bad Request error.
 */
function cleanSchemaForGemini(schema) {
    if (typeof schema !== "object" || schema === null) return schema;

    const cleaned = {};
    for (const [key, value] of Object.entries(schema)) {
        // Skip fields Gemini doesn't support
        if (key === "$schema" || key === "additionalProperties") continue;
        if (typeof value === "object" && !Array.isArray(value)) {
            cleaned[key] = cleanSchemaForGemini(value);
        } else if (Array.isArray(value)) {
            cleaned[key] = value.map(item => cleanSchemaForGemini(item));
        } else {
            cleaned[key] = value;
        }
    }
    return cleaned;
}

async function generateInterviewReport({ resume, selfdescription, jobdescription }) {

    const prompt = `Generate an interview report for a candidate with the following details :
    Resume : ${resume}
    SelfDescription : ${selfdescription}
    JobDescription : ${jobdescription}`

    try {
        // Clean the schema — Gemini rejects $schema and additionalProperties:false
        const rawSchema = zodToJsonSchema(interviewReportSchema);
        const geminiSchema = cleanSchemaForGemini(rawSchema);

        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: prompt,
            config: {
                responseMimeType: "application/json",
                responseSchema: geminiSchema
            }
        })

        // Extract JSON — Gemini may wrap it in markdown code fences
        let rawText = response.text.trim();
        if (rawText.startsWith("```")) {
            rawText = rawText.replace(/^```(?:json)?\s*/i, "").replace(/```\s*$/, "").trim();
        }

        const result = JSON.parse(rawText)
        return result;

    } catch (err) {
        console.error("generateInterviewReport error:", err.message);
        throw err; // re-throw so the controller's catch block handles it
    }
}

module.exports = generateInterviewReport;