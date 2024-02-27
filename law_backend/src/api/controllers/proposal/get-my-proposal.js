import { Job, Proposal } from '../../../models/index.js';
import { errorHelper, logger, getText } from '../../../utils/index.js';

export default async (req, res) => {
  let myProposals = await Proposal.find({ owner: req.user._id }).populate("job").exec().catch(err => {
    return res.status(500).json(errorHelper('00000', req, err.message));
  });
  return res.status(200).json({
    resultMessage: { en: getText('en', '00301'), ur: getText('ur', '00301') },
    resultCode: '00301',
    myProposals
  });
};