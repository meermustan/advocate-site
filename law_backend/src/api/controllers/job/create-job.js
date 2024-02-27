import { Job } from "../../../models/index.js";
import { errorHelper, logger, getText } from "../../../utils/index.js";

export default async (req, res) => {
  let visibility = req.body.visibility === "private"? false : true;

  let job = new Job({
    owner: req.user._id,
    activeProposal: null,
    jobChat: req.body.jobChat,
    city: req.body.city,
    title: req.body.title,
    summary: req.body.summary,
    isVisible: visibility,
    estimatedBudget: req.body.estimatedBudget,
  });

  job = await job.save().catch((err) => {
    return res.status(500).json(errorHelper("00000", req, err.message));
  });

  logger("00200", req.user._id, getText("en", "00200"), "Info", req);
  return res.status(200).json({
    resultMessage: { en: getText("en", "00200"), ur: getText("ur", "00200") },
    resultCode: "00200",
    job,
  });
};
