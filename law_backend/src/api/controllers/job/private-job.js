import Job from "../../../models/job.js";
import User from "../../../models/user.js";
import { errorHelper, getText } from '../../../utils/index.js';

export default async (req, res) => {
    let requestingUser = await User.findOne({_id: req.user?._id});
    const jobDetails = await Job.findOne({_id : req.body.job})
        .populate({
            path: "owner",
            populate: {
            path: "profile",
            populate: {
                path: "reviews",
                match: { type: "lawyer" },
                populate: {
                path: "lawyer",
                },
            },
            },
        })
        .exec();
    var isUserValid = false;

    if(jobDetails?.isVisible){
        return res.status(200).json({
            resultMessage: { en: getText('en', '00201'), ur: getText('ur', '00201') },
            resultCode: '00201',
            jobDetails
        });
    }

    if(jobDetails?.sharedWith?.length >= 0){
        for (let index = 0; index < (jobDetails?.sharedWith)?.length; index++) {
            const element = jobDetails?.sharedWith[index];
            if(element.equals(requestingUser._id)){
                isUserValid = true;
            }
        }
    }

    if(!isUserValid){
        return res.status(400).json(errorHelper("00204", req));
    }

    
    return res.status(200).json({
        resultMessage: { en: getText('en', '00201'), ur: getText('ur', '00201') },
        resultCode: '00201',
        jobDetails
    });

};