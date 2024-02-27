import { Router } from "express";
import {
  createJob,
  getMyJobs,
  getAllJobs,
  editJob,
  deleteJob,
  getJobDashboard,
  getJob,
  addMessage,
  addResearchMessage,
  addReview,
  addFile,
  welcome,
  getPrivateJob
} from "../controllers/job/index.js";
import { auth, fileUpload } from "../middlewares/index.js";
import { createEvent } from "../controllers/notification.js";

const router = Router();

router.post("/", auth, createJob);
router.get("/welcome", auth, welcome); 

router.get("/dashboard", auth, getJobDashboard);
router.get("/job", auth, getJob);
router.get("/my-jobs", auth, getMyJobs);
router.get("/jobs", getAllJobs);
router.post("/get-private-job",auth,  getPrivateJob);

router.put("/", auth, editJob);
router.put("/add-message", auth, addMessage);
router.put("/add-research-message", auth, addResearchMessage);
router.put("/add-review", auth, addReview);
router.post("/add-file", auth, fileUpload, addFile);
router.post("/add-event",auth, createEvent);

router.delete("/", auth, deleteJob);

export default router;
