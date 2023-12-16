import { createNotification, deleteNotification, getAllNotifications, getUserNotifications, updateNotification } from "controllers/notification.controller"
import express, { Router } from "express"
import { verifyAdmin, verifyToken, verifyUser } from "middlewares/auth.middleware"
const router: Router = express.Router()

//CREATE A Notification
router.post("/", verifyToken, createNotification)

//GET ALL NotificationS
router.get("/", verifyAdmin, getAllNotifications)

//GET USER NotificationS
router.get("/:id", verifyUser, getUserNotifications)

//UPDATE Notification INFORMATION
router.put("/:id/:notificationId", verifyUser, updateNotification)

//DELETE Notification INFORMATION
router.delete("/:id/:notificationId", verifyUser, deleteNotification)


export default router