const {zodToJsonSchema} = require("zod-to-json-schema");

const {GoogleGenAI} = require("@google/genai");
const {z} = require('zod');

const ai = new GoogleGenAI({
    apiKey : process.env.GOOGLE_GENAI_API_KEY
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
    matchScore : z.number().describe("A score between 0 to 100 indicating how well the candidate's profile matches the job description"),

    technicalQuestions : z.array(z.object({
        question : z.string().describe("The technical question that can be asked in the Interview"),
        intention : z.string().describe("The intention of interviewer behind asking this question"),
        answer : z.string().describe("How to answer this question, what points to cover")
    })).describe("Technical Questions that can be asked in the interview along with the intention"),

    behavioralQuestion : z.array(z.object({
        question : z.string().describe("The behavioral question that can be asked in the Interview"),
        intention : z.string().describe("The intention of interviewer behind asking this question"),
        answer : z.string().describe("How to answer this question, what points to cover")
    })).describe("Behavioral Questions that can be asked in the interview along with the intention"),

    skillGaps : z.array(z.object({
        skill : z.string().describe("The skill which the candidate is lacking"),
        severity : z.enum(["low", "medium", "high"]).describe("The severity of the skill gap")
    })).describe("Skill gaps that the candidate has"),

    preparationPlan : z.array(z.object({
        day : z.number().describe("The day number in the plan, starting from 1"),
        focus : z.string().describe("The main focus of this day in the preparation plan"),
        tasks : z.array(z.string()).describe("List of tasks to be done on this day")
    })).describe("A day-wise preparation plan for the candidate to follow in order")
})

async function generateInterviewReport({resume , selfdescription , jobdescription}){

    const prompt = `Generate an interview report for a candidate with the following details :
    Resume : ${resume}
    SelfDescription : ${selfdescription}
    JobDescription : ${jobdescription}`

    
        const response = await ai.models.generateContent({
            model : "gemini-2.5-flash",
            contents: prompt,
            config:{
                responseMimeType : "application/json",
                responseSchema :  zodToJsonSchema(interviewReportSchema)
            }
        })

        const result = JSON.parse(response.text)
        console.log(result)
       // return result;
     
}

module.exports = generateInterviewReport;