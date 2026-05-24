const {GoogleGenAI} = require("@google/genai");

const ai = new GoogleGenAI({
    apikey : process.env.GOOGLE_GENAI_API_KEY
})
async function invokeGeminiAi(){
    const response = await ai.models.generateContent({
        //model should use structured output 
        model:"gemini-2.5-flash",
        contents:"Hello gemini ! Explain what is Interview ?"
    })


    console.log(response.text)
}

module.exports = invokeGeminiAi