import { Router } from "express";
import { auth } from "../middlewares/index.js";
import {
  UpdateContractStatus,
  addMileStone,
  acceptContract,
  createContract,
} from "../controllers/contract.js";

const router = Router();
router.post("/add-milestone", auth, addMileStone);
router.post("/update-status", auth, UpdateContractStatus);
router.post("/accept-contract", auth, acceptContract);
router.post("/create-contract", auth, createContract);

export default router;
