import { Job, Chat } from "../../../models/index.js";
import { errorHelper, getText } from "../../../utils/index.js";

export default async (req, res) => {
  let jobId = req.query.jobId;
  let job = await Job.findById(jobId)
    .populate({
      path: "activeProposal",
      populate: { path: "owner" },
    })
    .populate("owner")
    .populate("contract")
    .exec()
    .catch((err) => {
      return res.status(500).json(errorHelper("00000", req, err.message));
    });

  let chat = await Chat.findOne({
    job: job._id,
    client: job.owner._id,
    lawyer: job.activeProposal.owner._id,
  }).catch((err) => {
    return res.status(500).json(errorHelper("00000", req, err.message));
  });

  return res.status(200).json({
    resultMessage: { en: getText("en", "00201"), ur: getText("ur", "00201") },
    resultCode: "00201",
    job,
    chat,
  });
};
