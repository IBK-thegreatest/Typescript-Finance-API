import { createBudget, deleteBudget, getAllBudgets, getUserBudgets, updateBudget } from "controllers/budget.controller"
import express, { Router } from "express"
import { verifyAdmin, verifyToken, verifyUser } from "middlewares/auth.middleware"
const router: Router = express.Router()

//CREATE A BUDGET
router.post("/", verifyToken, createBudget)

//GET ALL BUDGETS
router.get("/", verifyAdmin, getAllBudgets)

//GET USER BUDGETS
router.get("/:id", verifyUser, getUserBudgets)

//UPDATE BUDGET INFORMATION
router.put("/:id/:budgetId", verifyUser, updateBudget)

//DELETE BUDGET INFORMATION
router.delete("/:id/:budgetId", verifyUser, deleteBudget)



export default router