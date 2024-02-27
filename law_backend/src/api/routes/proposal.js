import { Router } from "express";
import {
  createProposal,
  getMyProposal,
  getJobProposal,
  countJobProposal,
  editProposal,
  inviteLawyer
} from "../controllers/proposal/index.js";
import { auth } from "../middlewares/index.js";

const router = Router();

router.post("/", auth, createProposal);

router.post("/invite-lawyer",auth, inviteLawyer);

router.get("/my-proposal", auth, getMyProposal);

router.get("/job-proposal", auth, getJobProposal);

router.get("/count-job-proposal", countJobProposal);

router.put("/edit-proposal", auth, editProposal);

export default router;
