import { Chat } from "../../../models/index.js";
import { errorHelper, getText } from "../../../utils/index.js";

export default async (req, res) => {
  let chatId = req.query.chatId;
  let { type } = req.user;
  await Chat.findByIdAndUpdate(chatId, {
    [`${type}Unread`]: false,
  }).catch((err) => {
    return res.status(500).json(errorHelper("00000", req, err.message));
  });

  return res.status(200).json({});
};
