import { Job } from "../../../models/index.js";
import { errorHelper, logger, getText } from "../../../utils/index.js";

export default async (req, res) => {
  let job = await Job.findById(req.body.jobId).catch((err) => {
    return res.status(500).json(errorHelper("00000", req, err.message));
  });

  await job.jobChat.push(req.body.message);

  await job.save().catch((err) => {
    return res.status(500).json(errorHelper("00085", req, err.message));
  });
  return res.status(200).json({
    resultMessage: { en: getText("en", "00304"), ur: getText("ur", "00304") },
    resultCode: "00304",
  });
};
