import { Router } from "express";
import {
  editProfile,
  changePassword,
  getLawyers,
  deleteUser,
  editUser,
  forgotPassword,
  getUser,
  login,
  logout,
  refreshToken,
  register,
  sendVerificationCode,
  verifyEmail,
  submitVerification,
  getVerificationData,
  approveVerification,
  refuteVerification,
  verifyVerificationCode,
  mailLawyersToVerify
} from "../controllers/user/index.js";
import { auth, imageUpload } from "../middlewares/index.js";

const router = Router();

// AUTH
router.post("/", register);
router.post("/login", login);
router.post("/logout", auth, logout);
router.post("/verify-email", verifyEmail);
router.post("/refresh-token", refreshToken);
router.post("/forgot-password", auth, forgotPassword);
router.post("/send-verification-code", sendVerificationCode);
router.post("/verify-code", verifyVerificationCode);

// EDIT
router.post("/change-password", auth, changePassword);
router.post("/edit-user", auth, imageUpload, editUser);
router.put("/edit-profile", auth, editProfile);

// Get Data
router.get("/lawyers", getLawyers);
router.get("/", auth, getUser);
router.delete("/", auth, deleteUser);

// Verification
router.get("/verification", auth, getVerificationData);
router.post("/verification", auth, submitVerification);
router.patch("/verification/approve", auth, approveVerification);
router.patch("/verification/refute", auth, refuteVerification);
router.get("/mail-lawyers-to-verify", auth , mailLawyersToVerify);

export default router;
