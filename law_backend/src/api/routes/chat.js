import { Router } from "express";
import {
  addMessage,
  getChats,
  initChats,
  getChat,
  getMessages,
  createChat,
  updateStatus
} from "../controllers/chat/index.js";
import { auth } from "../middlewares/index.js";

const router = Router();

router.get("/init", auth, initChats);

router.get("/chats", auth, getChats);

router.post("/create-chat", auth, createChat);

router.get("/chat", auth, getChat);

router.get("/get-messages", auth, getMessages);

router.put("/", auth, addMessage);

router.put("/update-status", auth, updateStatus);

export default router;
