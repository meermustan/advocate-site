import { Job } from '../../../models/index.js';
import { errorHelper, getText } from '../../../utils/index.js';

export default async (req, res) => {
  let myJobs = await Job.find({ owner: req.user._id }).catch(err => {
    return res.status(500).json(errorHelper('00000', req, err.message));
  });
  return res.status(200).json({
    resultMessage: { en: getText('en', '00201'), ur: getText('ur', '00201') },
    resultCode: '00201',
    myJobs
  });
};