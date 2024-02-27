import { User } from "../../../../models/index.js";
import { errorHelper, logger, getText } from "../../../../utils/index.js";

export default async (req, res) => {
  const url = req.protocol + "://" + req.get("host");

  const user = await User.findById(req.user._id).catch((err) => {
    return res.status(500).json(errorHelper("00082", req, err.message));
  });

  if (req.body.name) user.name = req.body.name;
  if (req.body.gender) user.gender = req.body.gender;
  if (req.body.birthDate) user.birthDate = req.body.birthDate;
  if (req.body.language) user.language = req.body.language;
  if (req.body.username && req.body.username !== user.username) {
    const exist = await User.exists({ username: req.body.username }).catch(
      (err) => {
        return res.status(500).json(errorHelper("00083", req, err.message));
      }
    );
    if (exist) return res.status(400).json(errorHelper("00084", req));

    user.username = req.body.username;
  }

  if (req.file) {
    user.photoUrl = url + "/images/" + req.file.filename;
  }

  await user.save().catch((err) => {
    return res.status(500).json(errorHelper("00085", req, err.message));
  });

  return res.status(200).json({
    resultMessage: { en: getText("en", "00086"), ur: getText("ur", "00086") },
    resultCode: "00086",
    user,
  });
};
