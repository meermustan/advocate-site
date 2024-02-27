import { Chat } from "../../../models/index.js";
import { errorHelper, getText } from "../../../utils/index.js";

export default async (req, res) => {
  let chatId = req.query.chatId;
  let chatRoom = await Chat.findById(chatId).catch((err) => {
    return res.status(500).json(errorHelper("00000", req, err.message));
  });

  return res.status(200).json({
    resultMessage: { en: getText("en", "00400"), ur: getText("ur", "00400") },
    messages: chatRoom.messages,
  });
};
