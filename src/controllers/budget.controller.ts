import { NextFunction, Request, Response } from "express";
import { CustomRequest } from "interfaces/request.interface";
import { createBudgetService, deleteBudgetService, getAllBudgetsService, getUserBudgetsService, updateBudgetService } from "services/budget.services";

export const createBudget = async (req: CustomRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
        const userId = req.user.id
        const budgetData = req.body
        const createBudgetData = await createBudgetService(userId, budgetData)
        res.status(200).json({
            success: true,
            status: "OK",
            message: "You have created a new Budget",
            data: createBudgetData
        })
    } catch (error) {
        next(error)
    }
}

export const getAllBudgets = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const budgets = await getAllBudgetsService()
        res.status(200).json(budgets)
    } catch (error) {
        next(error)
    }
}

export const getUserBudgets = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const userId = req.params.id
        const userBudgets = await getUserBudgetsService(userId)
        res.status(200).json(userBudgets)
    } catch (error) {
        next(error)
    }
}

export const updateBudget = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const userId = req.params.id
        const budgetId = req.params.budgetId
        const budgetData = req.body
        const updatedBudgetData = await updateBudgetService(userId, budgetId, budgetData)
        res.status(200).json({
            success: true,
            status: "OK",
            message: "Budget Information has been Successfully updated",
            data: updatedBudgetData
        })
    } catch (error) {
        next(error)
    }
}

export const deleteBudget = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const userId = req.params.id
        const budgetId = req.params.budgetId
        await deleteBudgetService(userId, budgetId)
            .then(() => {
                res.status(200).json({
                    success: true,
                    status: "OK",
                    message: "Budget Information has been deleted"
                })
            })
    } catch (error) {
        next(error)
    }
}