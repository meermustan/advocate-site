import { Job, Proposal, Contract } from "../../../models/index.js";
import { errorHelper, getText } from "../../../utils/index.js";

export default async (req, res) => {
  let { _id, type } = req.user;
  if (type === "client") {
    let activeJobs = await Job.find({ owner: _id }).catch((err) => {
      return res.status(500).json(errorHelper("00000", req, err.message));
    });
    let contracts = await Contract.find({ client: _id })
      .populate("job")
      .populate("proposal")
      .catch((err) => {
        return res.status(500).json(errorHelper("00000", req, err.message));
      });

    return res.status(200).json({
      resultMessage: { en: getText("en", "00201"), ur: getText("ur", "00201") },
      resultCode: "00201",
      activeJobs,
      contracts,
    });
  } else if (type === "lawyer") {
    let activeJobs = await Proposal.find({ owner: _id, isActive: true })
      .populate("job")
      .exec()
      .catch((err) => {
        return res.status(500).json(errorHelper("00000", req, err.message));
      });
    let contracts = await Contract.find({ lawyer: _id })
      .populate("job")
      .populate("proposal")
      .catch((err) => {
        return res.status(500).json(errorHelper("00000", req, err.message));
      });
    return res.status(200).json({
      resultMessage: { en: getText("en", "00201"), ur: getText("ur", "00201") },
      resultCode: "00201",
      activeJobs,
      contracts,
    });
  }
};
