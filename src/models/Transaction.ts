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
            enum: ["income", "expense"]
        },
        description: {
            type: String,
            required: false
        },
        fromAccountNumber: {
            type: Number,
            required: true
        },
        toAccountNumber: {
            type: Number,
            required: true
        },
        amount: {
            type: Number,
            required: true
        },
        transactionType: {
            type: String,
            required: true,
            enum: ["deposit", "withdrawal", "transfer"]
        }
    },
    {
        timestamps: true
    }
);

const transactionModel = mongoose.model("Transaction", TransactionSchema)

export default transactionModel;