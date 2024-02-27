// import { Job, Proposal } from "../../../models/index.js";
// import { errorHelper, logger, getText } from "../../../utils/index.js";
import Job from "../../../models/job.js";
import User from "../../../models/user.js";
import { sendNotification } from "../../controllers/notification.js";
import { errorHelper, getText } from "../../../utils/index.js";

export default async(req, res) => {
  const theLawyer = await User.findOne({_id : req.body.lawyer});
  const jobDetails = await Job.findOne({_id : req.body.case});
  var alreadySubmitted = false;
  if(jobDetails?.sharedWith?.length >= 0){
    for (let index = 0; index < (jobDetails?.sharedWith)?.length; index++) {
      const element = jobDetails?.sharedWith[index];
      if(element.equals(theLawyer._id)){
         alreadySubmitted = true;
      }
    }
  }
  if(!alreadySubmitted){
    jobDetails?.sharedWith?.push(theLawyer?._id);
  }

  if(alreadySubmitted){
    return res.status(400).json(errorHelper("00601", req));
  }

  jobDetails.save();


  const notification = {
    title: "Invited For Job",
    description: `You recived an invitatioin for Job <b> ${jobDetails?.title} </b>`,
    job: jobDetails?._id,
    user: theLawyer?._id,
    type: "invitation",
  };

  sendNotification(notification, false);
  return res.status(200).json({
      resultMessage: { en: getText('en', '00600'), ur: getText('ur', '00600') },
      resultCode: '00600',
  });

};