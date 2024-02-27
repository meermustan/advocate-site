import { User, Verification } from "../../../models/index.js";
import { errorHelper, getText } from "../../../utils/index.js";

export default async (req, res) => {
  let reviewsType = "lawyer";
  if (req.user.type == "lawyer") reviewsType = "client";
  let user = await User.findById(req.user._id)
    .populate({
      path: "profile",
      populate: {
        path: "reviews",
        match: { type: reviewsType },
        populate: {
          path: reviewsType,
        },
      },
    })
    .lean()
    .exec()
    .catch((err) => {
      return res.status(500).json(errorHelper("00088", req, err.message));
    });

  const verification = await Verification.findOne({ user: req.user._id }).lean();
  if (verification) {
    user.verification = verification;
  }

  return res.status(200).json({
    resultMessage: { en: getText("en", "00089"), ur: getText("ur", "00089") },
    resultCode: "00089",
    user,
  });
};
