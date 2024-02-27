import { Job } from "../../../models/index.js";
import { errorHelper, logger, getText } from "../../../utils/index.js";
import { sendNotification } from "../notification.js";

export default async (req, res) => {
  const userType = req.user.type;
  const { job, sender, user } = req.body;
  const url = req.protocol + "://" + req.get("host");
  const newFile = {
    name: req.file.filename,
    size: req.file.size,
    url: url + "/files/" + req.file.filename,
    sender,
    time: Date.now(),
  };

  let jobFound = await Job.findById(job).catch((err) => {
    return res.status(500).json(errorHelper("00000", req, err.message));
  });

  jobFound.jobDocuments.push(newFile);

  const notification = {
    title: "New File Received",
    description: `Your ${userType} sent you a file in <b> ${jobFound.title} </b>`,
    job: job,
    user: user,
    type: userType,
  };

  let savedJob = await jobFound.save().catch((err) => {
    return res.status(500).json(errorHelper("00000", req, err.message));
  });

  res.status(200).json({
    resultMessage: { en: getText("en", "00095"), ur: getText("ur", "00095") },
    resultCode: "00095",
    savedJob,
  });
  sendNotification(notification);
};
