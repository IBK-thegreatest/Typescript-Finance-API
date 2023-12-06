import mongoose from "mongoose"

const GoalSchema = new mongoose.Schema(
    {
        userId: {
            type: String,
            required: true
        },
        goalName: {
            type: String,
            required: true
        },
        targetAmount: {
            type: Number,
            required: true
        },
        isAchieved: {
            type: Boolean,
            default: false
        },
        dueDate: {
            type: Date,
            required: true
        }
    },
    {
        timestamps: true
    }
)

const goalModel = mongoose.model("Goal", GoalSchema)

export default goalModel;