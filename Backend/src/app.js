const express = require('express');
const cookieParser = require("cookie-parser");


const app = express();
app.use(express.json());//allow data to be read in request body
app.use(cookieParser());

/*require all the routes here */
const authRouter = require('./routes/auth.routes');


/*using all the routes here */
app.use("/api/auth", authRouter);



module.exports = app;