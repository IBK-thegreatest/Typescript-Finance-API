import { login, passwordReset, register } from "controllers/auth.controller"
import express, { Router } from "express"
const router: Router = express.Router()

//REGISTER A USER
router.post("/register", register)

//LOGIN AN EXISTING USER
router.post("/login", login)

//FUNCTIONALITY FOR A USER TO BE ABLE TO RESET HIS PASSWORD
router.post("/password-reset", passwordReset)


export default router