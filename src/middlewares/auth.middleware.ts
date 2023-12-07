import HttpException from "../exceptions/HttpException";
import { NextFunction, Response } from "express";
import { CustomRequest } from "../interfaces/request.interface";
import jwt from "jsonwebtoken"

export const verifyToken = async (req: CustomRequest, res: Response, next: NextFunction): Promise<void> => {
    const authHeader: string = req.headers.authorization
    if (authHeader) {
        const token: string = authHeader.split(" ")[1]
        jwt.verify(
            token,
            process.env.JWT_SEC,
            (err, payLoad) => {
                if(err) throw new HttpException(403, "Your Token is Invalid")
                req.user = payLoad
                next()
            }
        )
    } else {
        res.status(200).json({
            success: false,
            status: 401,
            message: "You are not Authenticated Yet!!!"
        })
    }
}

export const verifyUser = async (req: CustomRequest, res: Response, next: NextFunction) => {
    verifyToken(req, res, () => {
        if(req.user.id === req.params.id) {
            next();
        } else {
            res.status(401).json({
                success: false,
                status: 401,
                message: "You are not Authorized to do this"
            })
        }
    })
}

export const verifyAdmin = async (req: CustomRequest, res: Response, next: NextFunction): Promise<void> => {
    verifyToken(req, res, () => {
        if(req.user.isAdmin) {
            next();
        } else {
            res.status(401).json({
                success: false,
                status: 401,
                message: "You are not Authorized to do this"
            })
        }
    })
}