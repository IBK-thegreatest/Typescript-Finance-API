import express, { NextFunction, Request, Response } from "express"
import mongoose from "mongoose"
import compression from "compression"
import helmet from "helmet"
import morgan from "morgan"
import cors from "cors"
import dotenv from "dotenv"
import authRoutes from "./routes/auth.routes"
import userRoutes from "./routes/user.routes"
import transactionRoutes from "./routes/transaction.routes"
import budgetRoutes from "./routes/budget.routes"
import goalRoutes from "./routes/goal.routes"
import notificationRoutes from "./routes/notification.routes"
import errorMiddleware from "middlewares/error.middleware"
import HttpException from "./exceptions/HttpException"

dotenv.config();
mongoose.connect(
    process.env.MONGO_URL
).then(() => {
    console.log("Database Connection Successful");
}).catch (error => {
    console.log(error)
})

const app = express()
app.use(express.json())
app.use(compression())
app.use(morgan("dev"))
app.use(helmet())
app.use(cors())
app.use(errorMiddleware)
app.use("/api/v1/auth", authRoutes)
app.use("/api/v1/users", userRoutes)
app.use("/api/v1/budgets", budgetRoutes)
app.use("/api/v1/goals", goalRoutes)
app.use("/api/v1/notifications", notificationRoutes)
app.use("/api/v1/transactions", transactionRoutes)
app.use((err: HttpException, req: Request, res: Response, next: NextFunction) => {
    const errorStatus = err.status || 500
    const errorMessage = err.message || "Something went wrong!!!"
    res.status(errorStatus).json({
        success: false,
        status: errorStatus,
        message: errorMessage,
        stack: err.stack
    })
})


const PORT: number = 5000
app.listen(PORT, () => {
    console.log(`Backend Server is currently running on port ${PORT}`);
})