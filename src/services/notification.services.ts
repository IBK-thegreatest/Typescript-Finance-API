import HttpException from "exceptions/HttpException";
import { Notification } from "interfaces/notification.interfaces";
import notificationModel from "models/Notification";
import userModel from "models/User";

//CREATE A Notification
export const createNotificationService = async (userId: string, NotificationData: Notification): Promise<Notification> => {
    const data: Notification = {
        userId: userId,
        notificationType: NotificationData.notificationType,
        enabled: NotificationData.enabled
    }
    const newNotification = new notificationModel(data)
    const createNotification: Notification = await newNotification.save();
    return createNotification
}

//GET ALL NOTIFICATIONS
export const getAllNotificationsService = async (): Promise<Notification[]> => {
    const notifications: Notification[] = await notificationModel.find()
    return notifications
}

//GET USER NOTIFICATIONS
export const getUserNotificationsService = async (userId: string): Promise<Notification[]> => {
    const user = await userModel.findById(userId)
    if(!user) throw new HttpException(404, "This user does not exist")
    const notifications: Notification[] = await notificationModel.find({ userId: userId })
    return notifications
}

//UPDATE NOTIFICATION INFORMATION
export const updateNotificationService = async (userId: string, notificationId: string, notificationData: Notification): Promise<Notification> => {
    const user = await userModel.findById(userId)
    if(!user) throw new HttpException(404, "This User does not exist")
    const notification = await notificationModel.findById(notificationId)
    if(!notification) throw new HttpException(404, "Notification Not found")
    const updateNotification = await notificationModel.findByIdAndUpdate(
        notificationId,
        { $set: notificationData },
        { new: true }
    )
    return updateNotification
}

//DELETED NOTIFICATION INFORMATION
export const deleteNotificationService = async (userId: string, notificationId: string): Promise<Notification> => {
    const user = await userModel.findById(userId)
    if(!user) throw new HttpException(404, "This User does not exist")
    const notification = await notificationModel.findById(notificationId)
    if(!notification) throw new HttpException(404, "Notification Not found")

    await notificationModel.findByIdAndDelete(notificationId)
    return notification
}