import { createGoal, deleteGoal, getAllGoals, getUserGoals, updateGoal } from "controllers/goal.controller"
import express, { Router } from "express"
import { verifyAdmin, verifyToken, verifyUser } from "middlewares/auth.middleware"
const router: Router = express.Router()

//CREATE A GOAL
router.post("/", verifyToken, createGoal)

//GET ALL GOALS
router.get("/", verifyAdmin, getAllGoals)

//GET USER GOALS
router.get("/:id", verifyUser, getUserGoals)

//UPDATE GOAL INFORMATION
router.put("/:id/:goalId", verifyUser, updateGoal)

//DELETE GOAL INFORMATION
router.delete("/:id/:goalId", verifyUser, deleteGoal)


export default router