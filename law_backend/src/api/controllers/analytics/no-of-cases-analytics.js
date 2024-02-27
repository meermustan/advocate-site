import { Job } from "../../../models/index.js";
import { errorHelper, getText } from "../../../utils/index.js";

export default async (req, res) => {
  try {

    if (req.user?.type !== "admin") {
        return res.status(401).json({
          resultMessage: {
            en: "Unauthorized operation!",
            ur: "Unauthorized operation!",
          },
          resultCode: "",
        });
    }
      

    let duration = req.body.duration || "week";
    let interval = 1;
    if (duration === "week") {
      duration = 7; // Weekly duration
    } else if(duration === "day") {
      duration = 1; // Daily duration
    }else {
      duration = duration
    }

    const startDate = new Date();
    startDate.setDate(startDate.getDate() - duration);
    const jobs = await Job.find({
      createdAt: {$gte: startDate}
    })
    // console.log(jobs);
    // Create an array of dates for the last 7 days
    const dateLabels = [];
    for (let i = 0; i < duration; i++) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      dateLabels.unshift(date.toLocaleDateString());
    }
   
    // Initialize counts for all dates to 0
    let dateCounts = Object.fromEntries(dateLabels.map((date) => [date, 0]));

    // const data = {};

    // Generate data for the specified duration and interval
    jobs?.forEach((job) => {
      if (job && job.createdAt) {
        const jobDate = new Date(job.createdAt).toLocaleDateString();
        if (dateCounts.hasOwnProperty(jobDate)) {
          dateCounts[jobDate]++;
        }
      }
    });

    return res.status(200).json({
        resultMessage: { en: getText("en", "00802"), ur: getText("ur", "00802") },
        resultCode: "00802",
        data: dateCounts,
    });
  } catch (error) {
    return res.status(500).json({ error: errorHelper(error) });
  }
};

// Helper function to get cases count for a specific date
const getCasesCount = async (date) => {
  return await Job.countDocuments({ createdAt: { $gte: date } });
};
