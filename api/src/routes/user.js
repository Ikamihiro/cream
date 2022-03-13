const express = require("express")
const UserController = require("./../controllers/user")

const userRouter = express.Router()

userRouter.post("/register", UserController.register)
userRouter.post("/login", UserController.login)

module.exports = userRouter