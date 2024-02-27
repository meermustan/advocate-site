import { Router } from "express";

import { auth } from "../middlewares/index.js";

import uploadSingleimage from "../controllers/images/upload-single-image.js";

const router = Router();
router.post("/upload", auth, uploadSingleimage);

export default router;
