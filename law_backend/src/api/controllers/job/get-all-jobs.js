import { Job } from "../../../models/index.js";
import { errorHelper, getText } from "../../../utils/index.js";

export default async (req, res) => {
  let allJobs = await Job.find({ isVisible: true })
    .populate({
      path: "owner",
      populate: {
        path: "profile",
        populate: {
          path: "reviews",
          match: { type: "lawyer" },
          populate: {
            path: "lawyer",
          },
        },
      },
    })
    .exec()
    .catch((err) => {
      return res.status(500).json(errorHelper("00000", req, err.message));
    });
  return res.status(200).json({
    resultMessage: { en: getText("en", "00201"), ur: getText("ur", "00201") },
    resultCode: "00201",
    allJobs,
  });
};
