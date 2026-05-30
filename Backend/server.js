require('dotenv').config();
const app = require("./src/app");
const connectToDB = require("./src/config/databse");
//const invokeGeminiAi = require("./src/services/ai.service");
const {resume , selfdescription , jobdescription} = require("./src/services/temp");
const generateInterviewReport = require("./src/services/ai.service")

connectToDB();
//invokeGeminiAi();
generateInterviewReport({resume , selfdescription , jobdescription})
app.listen(3000 , () => {
    console.log("Server is running on port 3000");
})