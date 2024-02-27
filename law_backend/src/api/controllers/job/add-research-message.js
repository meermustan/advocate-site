import { Job } from "../../../models/index.js";
import { errorHelper, logger, getText } from "../../../utils/index.js";

export default async (req, res) => {
  const { newMessages, jobId } = req.body;
  let job = await Job.findById(jobId).catch((err) => {
    return res.status(500).json(errorHelper("00000", req, err.message));
  });

  await job.legalResearch.push(...newMessages);

  await job.save().catch((err) => {
    return res.status(500).json(errorHelper("00085", req, err.message));
  });
  return res.status(200).json({
    resultMessage: { en: getText("en", "00304"), ur: getText("ur", "00304") },
    resultCode: "00304",
  });
};