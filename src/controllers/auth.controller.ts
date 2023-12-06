import { Request, Response, NextFunction } from "express";
import { registerService } from "services/auth.services";

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