import HttpException from "exceptions/HttpException";
import { Budget } from "interfaces/budget.interface";
import budgetModel from "models/Budget";
import userModel from "models/User";

//CREATE A NEW BUDGET
export const createBudgetService = async (userId: string, budgetData: Budget): Promise<Budget> => {
    const data: Budget = {
        userId: userId,
        category: budgetData.category,
        budgetLimit: budgetData.budgetLimit
    }
    const newBudget = new budgetModel(budgetData)
    const createBudget: Budget = await newBudget.save();
    return createBudget
}

//GET ALL BUDGETS
export const getAllBudgetsService = async (): Promise<Budget[]> => {
    const budgets: Budget[] = await budgetModel.find()
    return budgets
}

//GET BUDGET MADE BY A USER
export const getUserBudgetsService = async (userId: string): Promise<Budget[]> => {
    const user = await userModel.findById(userId)
    if(!user) throw new HttpException(404, "This User does not exist")
    const budgets: Budget[] = await budgetModel.find({ userId: userId })
    return budgets
}


//UPDATE BUDGET INFORMATION
export const updateBudgetService = async (userId: string, budgetId: string, budgetData: Budget): Promise<Budget> => {
    const user = await userModel.findById(userId)
    if(!user) throw new HttpException(404, "This User does not exist")
    const budget = await budgetModel.findById(budgetId)
    if(!budget) throw new HttpException(404, "Budget Not Found!!!")

    const updateBudget = await budgetModel.findByIdAndUpdate(
        budgetId,
        { $set: budgetData },
        { new: true }
    )
    return updateBudget
}

//DELETE BUDGET INFORMATION
export const deleteBudgetService = async (userId: string, budgetId: string): Promise<Budget> => {
    const user = await userModel.findById(userId)
    if(!user) throw new HttpException(404, "This User does not exist")
    const budget = await budgetModel.findById(budgetId)
    if(!budget) throw new HttpException(404, "Budget Not Found!!!")

    await budgetModel.findByIdAndDelete(budgetId)
    return budget
}