const mongoose = require('mongoose')
//const cookieParser = require("cookie-parser")

const blacklistTokenSchema = new mongoose.Schema({
    token: {
        type: String,
        required: [true, "token is required to be added in blacklist"]
    }
}, {
    timestamps: true //token kab blacklist hona start hua tha 
    // yeh batana start krdega apne aap se

})

const tokenBlacklistModel = mongoose.model("blacklistTokens", blacklistTokenSchema);

module.exports = tokenBlacklistModel;