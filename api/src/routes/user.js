const express = require("express")
const { verifyToken } = require("../middlewares/auth")
const UserController = require("./../controllers/user")

const userRouter = express.Router()

userRouter.post("/register", UserController.register)
userRouter.post("/login", UserController.login)
userRouter.get("/me", verifyToken, UserController.me)

module.exports = userRouter