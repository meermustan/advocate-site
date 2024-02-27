import { emitMessage } from "../../../app.js";
import { Chat } from "../../../models/index.js";
import { errorHelper } from "../../../utils/index.js";

export default async (req, res) => {
  const { _id, type } = req.user;
  const { message, chatId } = req.body;
  let chatRoom = await Chat.findById(chatId)
    .populate("job")
    .exec()
    .catch((err) => {
      return res.status(500).json(errorHelper("00000", req, err.message));
    });

  if (!chatRoom) {
    return res.status(500).json(errorHelper("00000", req, "Chat not exist"));
  }

  let receiver = null;
  let unreadType = "";
  if (type == "client") {
    receiver = chatRoom.lawyer;
    unreadType = "lawyerUnread";
  } else if (type == "lawyer") {
    receiver = chatRoom.client;
    unreadType = "clientUnread";
  }
  chatRoom[unreadType] = true;
  chatRoom.messages.push(message);

  await chatRoom.save().catch((err) => {
    return res.status(500).json(errorHelper("00000", req, err.message));
  });

  res.status(200).json({});

  const notification = {
    title: "New Message Received",
    description: `Your ${type} sent you a new message in <b> ${chatRoom.job.title} </b>`,
    job: chatRoom.job._id,
    user: receiver,
    type,
  };

  emitMessage(receiver, message, chatId, notification, unreadType);
};
