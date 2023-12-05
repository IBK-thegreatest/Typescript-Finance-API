import HttpException from "exceptions/HttpException";
import { Request, Response, NextFunction } from "express";

const errorMiddleware = (err: HttpException, req: Request, res: Response, next: NextFunction) => {
    const errorStatus = err.status || 500
    const errorMessage = err.message || "Something went wrong!!!"
    return res.status(errorStatus).json({
        success: false,
        status: errorStatus,
        message: errorMessage,
        stack: err.stack
    })
}

export default errorMiddleware