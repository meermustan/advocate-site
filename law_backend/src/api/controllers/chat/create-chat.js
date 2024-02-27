import { Chat } from "../../../models/index.js";
import { errorHelper, getText } from "../../../utils/index.js";

export default async (req, res) => {
  const { _id, type } = req.user;
  const { job, user } = req.body;
  let chatType = "";
  let lawyer = null;
  let client = null;
  if (type == "client") {
    chatType = "lawyer";
    client = _id;
    lawyer = user;
  } else if (type == "lawyer") {
    chatType = "client";
    lawyer = _id;
    client = user;
  }
  let chatExist = await Chat.exists({ [chatType]: user, job }).catch((err) => {
    return res.status(500).json(errorHelper("00000", req, err.message));
  });
  if (chatExist) {
    let activeChat = await Chat.findOne({ [chatType]: user, job }).catch(
      (err) => {
        return res.status(500).json(errorHelper("00000", req, err.message));
      }
    );

    let chatRooms = await Chat.find({ [type]: _id })
      .populate("job")
      .populate(chatType)
      .exec()
      .catch((err) => {
        return res.status(500).json(errorHelper("00000", req, err.message));
      });
    return res.status(200).json({
      resultMessage: { en: getText("en", "00400"), ur: getText("ur", "00400") },
      chatRooms,
      activeChat: activeChat._id,
    });
  } else {
    let chat = new Chat({
      client,
      lawyer,
      job,
      messages: [],
    });
    chat = await chat.save().catch((err) => {
      return res.status(500).json(errorHelper("00000", req, err.message));
    });

    let chatRooms = await Chat.find({ [type]: _id })
      .populate("job")
      .populate(chatType)
      .exec()
      .catch((err) => {
        return res.status(500).json(errorHelper("00000", req, err.message));
      });
    return res.status(200).json({
      resultMessage: { en: getText("en", "00400"), ur: getText("ur", "00400") },
      chatRooms,
      activeChat: chat._doc._id,
    });
  }
};
