import { Review, Job, Profile } from "../../../models/index.js";
import { errorHelper, logger, getText } from "../../../utils/index.js";
import { sendNotification } from "../notification.js";

export default async (req, res) => {
  const userType = req.user.type;
  const { job, client, lawyer, rating, review, profile, jobTitle } = req.body;

  let newReview = new Review({
    type: userType,
    client,
    lawyer,
    job,
    rating,
    review,
  });

  newReview = await newReview.save().catch((err) => {
    return res.status(500).json(errorHelper("00000", req, err.message));
  });

  let updateOptions = {};

  const notification = {
    title: `${userType} Reviewed You`,
    description: `Your ${userType} added review for you in <b> ${jobTitle} </b>`,
    job: job,
    type: userType,
  };

  if (userType === "client") {
    updateOptions.clientReview = newReview._id;
    notification.user = lawyer;
  } else if (userType === "lawyer") {
    updateOptions.lawyerReview = newReview._id;
    notification.user = client;
  } else {
    return res.status(500).json(errorHelper("00000", req, err.message));
  }

  let profileFound = await Profile.findById(profile).catch((err) => {
    return res.status(500).json(errorHelper("00000", req, err.message));
  });

  await profileFound.reviews.push(newReview._id);
  await profileFound.save().catch((err) => {
    return res.status(500).json(errorHelper("00085", req, err.message));
  });

  await Job.findByIdAndUpdate(job, updateOptions).catch((err) => {
    return res.status(500).json(errorHelper("00000", req, err.message));
  });

  logger("00094", req.user._id, getText("en", "00094"), "Info", req);
  res.status(200).json({
    resultMessage: { en: getText("en", "00094"), ur: getText("ur", "00094") },
    resultCode: "00094",
    newReview,
  });
  sendNotification(notification);
};
