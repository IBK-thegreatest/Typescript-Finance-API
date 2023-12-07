import { NextFunction, Request, Response } from "express";
import { deleteUserService, getAllUsersService, getUserService, updateUserService } from "services/user.services";

export const getAllUsers = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const users = await getAllUsersService()
        res.status(200).json(users)
    } catch (error) {
        next(error)
    }
}

export const getUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const userId = req.params.id
    const user = await getUserService(userId)
    res.status(200).json(user)
}

export const updateUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const userId = req.params.id
        const userData = req.body
        const updateData = await updateUserService(userId, userData)
        res.status(200).json({
            success: true,
            status: "OK",
            message: "User Information has been Updated successfully",
            data: updateData
        })
    } catch (error) {
        next(error)
    }
}

export const deleteUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const userId = req.params.id
        await deleteUserService(userId)
            .then(() => {
                res.status(200).json({
                    success: true,
                    status: "OK",
                    message: "User Information has been Successfully deleted"
                })
            })
    } catch (error) {
        next(error)
    }
}