import { NextFunction, Request, Response } from "express";
import { CustomRequest } from "interfaces/request.interface";
import { createGoalService, deleteGoalService, getAllGoalsService, getUserGoalsService, updateGoalService } from "services/goal.services";

export const createGoal = async (req: CustomRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
        const userId = req.user.id
        const goalData = req.body
        const createGoalData = await createGoalService(userId, goalData)
        res.status(200).json({
            success: true,
            status: "OK",
            message: "You have created a new Goal",
            data: createGoalData
        })
    } catch (error) {
        next(error)
    }
}

export const getAllGoals = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const goals = await getAllGoalsService()
        res.status(200).json(goals)
    } catch (error) {
        next(error)
    }
}

export const getUserGoals = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const userId = req.params.id
        const userGoals = await getUserGoalsService(userId)
        res.status(200).json(userGoals)
    } catch (error) {
        next(error)
    }
}

export const updateGoal = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const userId = req.params.id
        const goalId = req.params.goalId
        const goalData = req.body
        const updatedGoalData = await updateGoalService(userId, goalId, goalData)
        res.status(200).json({
            success: true,
            status: "OK",
            message: "Goal Information has been Successfully updated",
            data: updatedGoalData
        })
    } catch (error) {
        next(error)
    }
}

export const deleteGoal = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const userId = req.params.id
        const goalId = req.params.goalId
        await deleteGoalService(userId, goalId)
            .then(() => {
                res.status(200).json({
                    success: true,
                    status: "OK",
                    message: "Goal Information has been deleted"
                })
            })
    } catch (error) {
        next(error)
    }
}