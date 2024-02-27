import { Profile } from "../../../../models/index.js";
import { errorHelper, logger, getText } from "../../../../utils/index.js";

export default async (req, res) => {
  let profile = await Profile.findById(req.body.profileId).catch((err) => {
    return res.status(500).json(errorHelper("00000", req, err.message));
  });

  if (req.body.about) profile.about = req.body.about;
  if (req.body.history) profile.history = req.body.history;

  await profile.save().catch((err) => {
    return res.status(500).json(errorHelper("00085", req, err.message));
  });

  logger("00093", req.user._id, getText("en", "00093"), "Info", req);
  return res.status(200).json({
    resultMessage: { en: getText("en", "00093"), ur: getText("ur", "00093") },
    resultCode: "00093",
    profile,
  });
};
