import { Job, Proposal } from "../../../models/index.js";
import { errorHelper, logger, getText } from "../../../utils/index.js";

export default async (req, res) => {
  const jobFound = await Job.findById(req.body.jobId);
  // console.log(req.user._id);
  const sharedWithUser = jobFound?.sharedWith?.filter((userId)=>userId.equals(req?.user?._id));
  if (!jobFound || !(sharedWithUser.length == 1)) {
    return res.status(400).json(errorHelper("00302", req));
  }

  const ownerExists = await Proposal.exists({
    job: req.body.jobId,
    owner: req.user._id,
  });
  if (ownerExists) {
    return res.status(400).json(errorHelper("00303", req));
  }

  let proposal = new Proposal({
    owner: req.user._id,
    job: req.body.jobId,
    summary: req.body.summary,
  });

  proposal = await proposal.save().catch((err) => {
    return res.status(500).json(errorHelper("00000", req, err.message));
  });

  jobFound.proposals.push(proposal._id);

  jobFound.save().catch((err) => {
    return res.status(500).json(errorHelper("00000", req, err.message));
  });

  logger("00300", req.user._id, getText("en", "00300"), "Info", req);
  return res.status(200).json({
    resultMessage: { en: getText("en", "00300"), ur: getText("ur", "00300") },
    resultCode: "00300",
    proposal,
  });
};
