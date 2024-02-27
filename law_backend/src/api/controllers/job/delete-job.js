import { Job } from '../../../models/index.js';
import { errorHelper, getText, logger } from '../../../utils/index.js';


export default async (req, res) => {
  await Job.findByIdAndDelete(req.body.jobId).catch(err => {
    return res.status(500).json(errorHelper('00091', req, err.message));
  });

  logger('00305', req.user._id, getText('en', '00305'), 'Info', req);
  return res.status(200).json({
    resultMessage: { en: getText('en', '00305'), ur: getText('ur', '00305') },
    resultCode: '00305'
  });
};