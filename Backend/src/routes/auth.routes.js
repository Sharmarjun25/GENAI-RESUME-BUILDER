
const { Router } = require('express');
//const express = require('express');
const authController = require('../controllers/auth.controller.js')
const authMiddleware = require("../middleware/auth.middleware.js")



const authRouter = Router();

/**
 * @route POST /api/auth/register
 * @description Register a new user
 * @access Public
 */
authRouter.post("/register", authController.registerController);

/***
 * @route POST/api/auth/login
 * @description login user with email and password
 * @access Public 
 */
authRouter.post("/login", authController.loginUserController)

/***
 * @route POST/api/auth/logout
 * @description logout user with email and password
 * @access Public 
 */
authRouter.post("/logout", authController.logoutUserController)

/**
 * @route GET?api/auth/get-me
 * @description get the current logged in user detail
 * @access private
 */


authRouter.get("/get-me", authMiddleware.authUser, authController.getMeController)

module.exports = authRouter;