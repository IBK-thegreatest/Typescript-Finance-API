import HttpException from "exceptions/HttpException";
import { Goal } from "interfaces/goal.interface";
import goalModel from "models/Goal";
import userModel from "models/User";

//CREATE A GOAL
export const createGoalService = async (userId: string, goalData: Goal): Promise<Goal> => {
    const data: Goal = {
        userId: userId,
        goalName: goalData.goalName,
        targetAmount: goalData.targetAmount,
        isAchieved: goalData.isAchieved,
        dueDate: goalData.dueDate
    }
    const newGoal = new goalModel(data)
    const createGoal: Goal = await newGoal.save();
    return createGoal
}

//GET ALL GOALS
export const getAllGoalsService = async (): Promise<Goal[]> => {
    const goals: Goal[] = await goalModel.find()
    return goals
}

//GET USER GOALS
export const getUserGoalsService = async (userId: string): Promise<Goal[]> => {
    const user = await userModel.findById(userId)
    if(!user) throw new HttpException(404, "This user does not exist")
    const goals: Goal[] = await goalModel.find({ userId: userId })
    return goals
}

//UPDATE GOAL INFORMATION
export const updateGoalService = async (userId: string, goalId: string, goalData: Goal): Promise<Goal> => {
    const user = await userModel.findById(userId)
    if(!user) throw new HttpException(404, "This User does not exist")
    const goal = await goalModel.findById(goalId)
    if(!goal) throw new HttpException(404, "Goal Not found")
    const updateGoal = await goalModel.findByIdAndUpdate(
        goalId,
        { $set: goalData },
        { new: true }
    )
    return updateGoal
}

//DELETED GOAL INFORMATION
export const deleteGoalService = async (userId: string, goalId: string): Promise<Goal> => {
    const user = await userModel.findById(userId)
    if(!user) throw new HttpException(404, "This User does not exist")
    const goal = await goalModel.findById(goalId)
    if(!goal) throw new HttpException(404, "Goal Not found")

    await goalModel.findByIdAndDelete(goalId)
    return goal
}