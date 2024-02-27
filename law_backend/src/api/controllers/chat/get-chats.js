import { Chat } from "../../../models/index.js";
import { errorHelper, getText } from "../../../utils/index.js";

export default async (req, res) => {
  const { _id, type } = req.user;
  let chatType = "";
  if (type == "client") {
    chatType = "lawyer";
  } else if (type == "lawyer") {
    chatType = "client";
  }

  let chatRooms = await Chat.find({ [type]: _id })
    .populate("job")
    .populate(chatType)
    .exec()
    .catch((err) => {
      return res.status(500).json(errorHelper("00000", req, err.message));
    });

  return res.status(200).json({
    chatRooms,
  });
};
