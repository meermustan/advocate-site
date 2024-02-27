import { Contract, Job, Proposal } from "../../models/index.js";
import mongoose from "mongoose";
const { ObjectId } = mongoose.Types;
import { errorHelper, logger, getText } from "../../utils/index.js";

const UpdateContractStatus = async (req, res) => {
  const { contractId, status } = req.body;
  let contract = await Contract.findById(contractId).catch((err) => {
    return res.status(500).json(errorHelper("00000", req, err.message));
  });

  contract.status = status;
  await contract.save().catch((err) => {
    return res.status(500).json(errorHelper("00000", req, err.message));
  });

  return res.status(200).json({
    resultMessage: { en: getText("en", "00503"), ur: getText("ur", "00503") },
    resultCode: "00503",
  });
};

const acceptContract = async (req, res) => {
  const { contractId, proposalId, jobId } = req.body;
  let contract = await Contract.findById(contractId).catch((err) => {
    return res.status(500).json(errorHelper("00000", req, err.message));
  });

  contract.status = "Accepted by lawyer";

  await contract.save().catch((err) => {
    return res.status(500).json(errorHelper("00000", req, err.message));
  });

  await Job.findByIdAndUpdate(jobId, {
    isActive: true,
    isVisible: false,
    activeProposal: proposalId,
  }).catch((err) => {
    return res.status(500).json(errorHelper("00000", req, err.message));
  });

  await Proposal.findByIdAndUpdate(proposalId, {
    isActive: true,
  }).catch((err) => {
    return res.status(500).json(errorHelper("00000", req, err.message));
  });

  return res.status(200).json({
    resultMessage: { en: getText("en", "00502"), ur: getText("ur", "00502") },
    resultCode: "00502",
  });
};

const addMileStone = async (req, res) => {
  const { contractId, milestone } = req.body;

  let contract = await Contract.findById(contractId).catch((err) => {
    return res.status(500).json(errorHelper("00000", req, err.message));
  });

  milestone._id = new ObjectId();
  contract.milestones.push(milestone);

  await contract.save().catch((err) => {
    return res.status(500).json(errorHelper("00000", req, err.message));
  });

  return res.status(200).json({
    resultMessage: { en: getText("en", "00501"), ur: getText("ur", "00501") },
    resultCode: "00501",
    contract,
  });
};

const createContract = async (req, res) => {
  const client = req.user._id;
  const { proposalId, jobId, lawyerId, total, summary, milestones } = req.body;

  const newMilestones = await milestones.map((obj) => ({
    ...obj,
    _id: new ObjectId(),
  }));

  let contract = new Contract({
    client: client,
    lawyer: lawyerId,
    proposal: proposalId,
    job: jobId,
    total: Number(total),
    paid: 0,
    secured: 0,
    summary: summary,
    status: "Initiated By Client",
    milestones: newMilestones,
  });

  contract = await contract.save().catch((err) => {
    return res.status(500).json(errorHelper("00000", req, err.message));
  });

  await Job.findByIdAndUpdate(jobId, {
    contract: contract._id,
  }).catch((err) => {
    return res.status(500).json(errorHelper("00000", req, err.message));
  });

  return res.status(200).json({
    resultMessage: { en: getText("en", "00500"), ur: getText("ur", "00500") },
    resultCode: "00500",
  });
};

export {
  UpdateContractStatus,
  addMileStone,
  createContract,
  acceptContract,
};
