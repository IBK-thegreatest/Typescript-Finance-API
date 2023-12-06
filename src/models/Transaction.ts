import mongoose from "mongoose"

const TransactionSchema = new mongoose.Schema(
    {
        userId: {
            type: String,
            required: true
        },
        category: {
            type: String,
            required: true,
            enum: ["deposit", "withdrawal", "transfer"]
        },
        description: {
            type: String,
            required: false
        },
        amount: {
            type: Number,
            required: true
        },
        transactionType: {
            type: String,
            required: true
        }
    },
    {
        timestamps: true
    }
);

const transactionModel = mongoose.model("Transaction", TransactionSchema)

export default transactionModel;