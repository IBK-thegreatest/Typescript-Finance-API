import mongoose from "mongoose"

const NotificationSchema = new mongoose.Schema(
    {
        userId: {
            type: String,
            required: true
        },
        notificationType: {
            type: String,
            required: true
        },
        enabled: {
            type: Boolean,
            default: false
        }
    },
    {
        timestamps: true
    }
)

const notificationModel = mongoose.model("Notification", NotificationSchema)

export default notificationModel;