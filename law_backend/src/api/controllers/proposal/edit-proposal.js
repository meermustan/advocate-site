import { Proposal } from '../../../models/index.js';
import { errorHelper, logger, getText } from '../../../utils/index.js';

export default async (req, res) => {
  let proposal = await Proposal.findById(req.body.proposalId).catch((err) => {
    return res.status(500).json(errorHelper('00000', req, err.message));
  });

  if (req.body.summary) proposal.summary = req.body.summary;
  if (req.body.updateViewed) proposal.isViewed = req.body.isViewed;
  if (req.body.updateActive) proposal.isActive = req.body.isActive;

  await proposal.save().catch((err) => {
    return res.status(500).json(errorHelper('00000', req, err.message));
  });
  
  logger('00306', req.user._id, getText('en', '00306'), 'Info', req);
  return res.status(200).json({
    resultMessage: { en: getText('en', '00306'), ur: getText('ur', '00306') },
    resultCode: '00306',
    proposal
  });
};