import { NextFunction, Request, Response } from "express";
import { CustomRequest } from "interfaces/request.interface";
import { createNotificationService, deleteNotificationService, getAllNotificationsService, getUserNotificationsService, updateNotificationService } from "services/notification.services";

export const createNotification = async (req: CustomRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
        const userId = req.user.id
        const notificationData = req.body
        const createNotificationData = await createNotificationService(userId, notificationData)
        res.status(200).json({
            success: true,
            status: "OK",
            message: "You have created a new Notification",
            data: createNotificationData
        })
    } catch (error) {
        next(error)
    }
}

export const getAllNotifications = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const notifications = await getAllNotificationsService()
        res.status(200).json(notifications)
    } catch (error) {
        next(error)
    }
}

export const getUserNotifications = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const userId = req.params.id
        const userNotifications = await getUserNotificationsService(userId)
        res.status(200).json(userNotifications)
    } catch (error) {
        next(error)
    }
}

export const updateNotification = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const userId = req.params.id
        const notificationId = req.params.notificationId
        const notificationData = req.body
        const updatedNotificationData = await updateNotificationService(userId, notificationId, notificationData)
        res.status(200).json({
            success: true,
            status: "OK",
            message: "Notification Information has been Successfully updated",
            data: updatedNotificationData
        })
    } catch (error) {
        next(error)
    }
}

export const deleteNotification = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const userId = req.params.id
        const notificationId = req.params.notificationId
        await deleteNotificationService(userId, notificationId)
            .then(() => {
                res.status(200).json({
                    success: true,
                    status: "OK",
                    message: "Notification Information has been deleted"
                })
            })
    } catch (error) {
        next(error)
    }
}