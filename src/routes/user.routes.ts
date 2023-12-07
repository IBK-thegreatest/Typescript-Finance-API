import { deleteUser, getAllUsers, getUser, updateUser } from "../controllers/user.controller"
import express, { Router } from "express"
import { verifyAdmin, verifyUser } from "../middlewares/auth.middleware"
const router: Router = express.Router()

//GET ALL USERS
router.get("/", verifyAdmin, getAllUsers)

//GET A USER
router.get("/:id", verifyUser, getUser)

//UPDATE USER INFORMATION
router.put("/:id", verifyUser, updateUser)

//DELETE USER INFORMATION
router.delete("/:id", verifyUser, deleteUser)


export default router