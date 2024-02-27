import { Router } from "express";
import user from "./user.js";
import job from "./job.js";
import proposal from "./proposal.js";
import chat from "./chat.js";
import contract from "./contract.js";
import notification from "./notification.js";
import image from "./image.js";
import adminAnalytics from "./admin-analytics.js";

const router = Router();

router.use("/user", user);
router.use("/job", job);
router.use("/proposal", proposal);
router.use("/chat", chat);
router.use("/contract", contract);
router.use("/notification", notification);
router.use("/image", image);
router.use("/analytics", adminAnalytics);

export default router;
