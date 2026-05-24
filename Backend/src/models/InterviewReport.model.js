const mongoose = require('mongoose');



/**
 * Job description , 
 * resume text
 * Self description
 * 
 * What will Ai give ?\
 * Technical questions : []
 * Behaviuoral quesrions : [
 *        {
 *         question : "Tell me about a time when you faced a difficult technical problem and how you solved it.",
 * intention : " 
 * answer : " 
 * "
 * }]
 * Skill gaps : [{
 * }]
 * Preparation plan , an array of objects 
 * day : number 
 * focus : String
 */
const technicalQuestionSchema = new mongoose.Schema({
    question : {
        type : String,
        required : [true , "Question is required"]
    },
    intention : {
        type : String,
        required : [true , "Intention is required"]
    },
    answer : {
        type : String , 
        required : [true , "Answer is required"]
    }
} , {
    _id : false
})

const behavioralQuestionSchema = new mongoose.Schema({
    question : {
        type : String,
        required : [true , "Question is required"]
    },
    intention : {
        type : String,
        required : [true , "Intention is required"]
    },
    answer : {
        type : String , 
        required : [true , "Answer is required"]
    }
} 

 , {
    _id : false
})

const skillgapSchema  = new mongoose.Schema({
    skill:{
        type : String,
        required : [true , "Skill is required"]
    },
    severity : {
        type : String,
        enum : ["low" , "medium" , "high"],
        required : [true , "Severity is required"]
    }
} , {
    _id : false
})

 const preparationPlanSchema = new mongoose.Schema({
    day :{
        type : Number , 
        required : [true , "day is required"]
    },
    focus : {
        type : String ,
        required : [true , "Focus is required"]
    },
    tasks:{
        type : String,
        required : [true , "Task is required"]
    }
 })
const interviewReportSchema = new mongoose.Schema({
    jobDescription : {
        type : String ,
        required : [true , "Job description is required"]
    },
    resume : {
        type : String ,
    },
    SelfDescription : {
        type : String,
    },
    matchscore:{
        type : Number,
        min : 0,
        max : 100,
    },
    technicalQuestions : [technicalQuestionSchema],
    behavioralQuestions : [behavioralQuestionSchema],
    skillgap : [skillgapSchema],
    preparationPlan : [preparationPlanSchema]
} , {
    timestamps : true
})


const interviewReportModel = mongoose.model("InterviewReport" , interviewReportSchema);

module.exports = interviewReportModel;
