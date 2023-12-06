import mongoose from "mongoose"

const BudgetSchema = new mongoose.Schema(
    {
        userId: {
            type: String,
            required: true
        },
        category: {
            type: String,
            required: true
        },
        budgetLimit: {
            type: Number,
            required: true
        }
    },
    {
        timestamps: true
    }
)

const budgetModel = mongoose.model("Budget", BudgetSchema)

export default budgetModel;