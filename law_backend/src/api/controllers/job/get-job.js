import { Job } from "../../../models/index.js";
import { errorHelper, getText } from "../../../utils/index.js";

export default async (req, res) => {
  let jobId = req.query.jobId;
  let job = await Job.findById(jobId)
    .populate("owner")
    .exec()
    .catch((err) => {
      return res.status(500).json(errorHelper("00000", req, err.message));
    });

  if (job.isActive) {
    let activeJob = await Job.findById(job._id)
      .populate({
        path: "activeProposal",
        populate: { path: "owner" },
      })
      .populate("clientReview")
      .populate("lawyerReview")
      .populate("contract")
      .populate("owner")
      .exec()
      .catch((err) => {
        return res.status(500).json(errorHelper("00000", req, err.message));
      });

    return res.status(200).json({
      resultMessage: { en: getText("en", "00201"), ur: getText("ur", "00201") },
      resultCode: "00201",
      job: activeJob,
    });
  } else {
    return res.status(200).json({
      resultMessage: { en: getText("en", "00201"), ur: getText("ur", "00201") },
      resultCode: "00201",
      job,
    });
  }
};
