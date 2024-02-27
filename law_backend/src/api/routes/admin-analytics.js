import { Router } from "express";
import {
    noOfCasesAnalytics,
    registerationsAnylatics,
    totalMessagesAnalytics
} from "../controllers/analytics/index.js";
import { auth } from "../middlewares/index.js";

const router = Router();

router.post("/noOfCases", auth, noOfCasesAnalytics);

router.post("/registrations", auth, registerationsAnylatics);

router.post("/totalMessages", auth, totalMessagesAnalytics);

export default router;
