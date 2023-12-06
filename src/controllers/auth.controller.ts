import { Request, Response, NextFunction } from "express";
import { loginService, passwordResetService, registerService } from "services/auth.services";

export const register = async (req: Request, res: Response, next: NextFunction) : Promise<void>=> {
    try {
        const userData = req.body
        const registerData = await registerService(userData)
        res.status(200).json({
            success: true,
            status: "OK",
            message: "User has been successfully registered",
            accountNumber: `Hello ${registerData.firstName} ${registerData.lastName}, Your account number is ${registerData.accountNumber}`,
            data: registerData
        })
    } catch (error) {
        next(error)
    }
}

export const login = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const userData = req.body
        const loginData = await loginService(userData)
        res.status(200).json({
            success: true,
            status: "OK",
            message: "You are now logged In",
            data: loginData
        })
    } catch (error) {
        next(error)
    }
}

export const passwordReset = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const userData = req.body
        const resetData = await passwordResetService(userData)
        res.status(200).json({
            success: true,
            status: "OK",
            message: `Your Password has been reset, your new password is ${resetData}`
        })
    } catch (error) {
        next(error)
    }
}