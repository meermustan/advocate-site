import { Router } from "express";
import { auth } from "../middlewares/index.js";
import {
  getMyNotification,
  updateNotification,
  unseenNotification,
  updateNotificationStatus,
  getLogs,
  DeleteLogs,
} from "../controllers/notification.js";
const router = Router();

router.get("/", auth, getMyNotification);
router.get("/unseen", auth, unseenNotification);
router.patch("/status", auth, updateNotification);
router.patch("/:noteId", auth, updateNotificationStatus);

//logs
router.get("/get-logs", getLogs);
router.get("/del-logs", DeleteLogs);

export default router;
