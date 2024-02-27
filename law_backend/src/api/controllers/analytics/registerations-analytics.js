import { User } from "../../../models/index.js";
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

    
    const type = req.body.type || "both"; // Default to both if type is not provided
    let duration = req.body.duration || "week";
    let interval = 1;
    if (duration === 'week') {
      duration = 7; // Weekly duration
    } else if (duration === 'day') {
      duration = 1; // Daily duration
    } else{
      duration = duration
    }
    
    
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - duration);
    
    var registrationUser;
    if(type === 'Lawyer'){
      registrationUser = await User.find({
        type: "lawyer",
        createdAt: {$gte: startDate}
      })
    }else if(type === 'Client'){
      registrationUser = await User.find({
        type: "client",
        createdAt: {$gte: startDate}
      })
    }else{
      registrationUser = await User.find({createdAt: {$gte: startDate}})
    }

    // Create an array of dates for the last 7 days
    const dateLabels = [];
    for (let i = 0; i < duration; i++) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      dateLabels.unshift(date.toLocaleDateString());
    }

    // Initialize counts for all dates to 0
    let dateCounts = Object.fromEntries(dateLabels.map((date) => [date, 0]));

    // Generate data for the specified duration and interval
    registrationUser?.forEach((user) => {
      if (user && user.createdAt) {
        const userDate = new Date(user.createdAt).toLocaleDateString();
        if (dateCounts.hasOwnProperty(userDate)) {
          dateCounts[userDate]++;
        }
      }
    });


    return res.status(200).json({
        resultMessage: { en: getText("en", "00804"), ur: getText("ur", "00804") },
        resultCode: "00804",
        data: dateCounts,
    });
  } catch (error) {
    return res.status(500).json({ error: errorHelper(error) });
  }
};

// Helper function to get user registrations count for a specific date and type
const getUserRegistrationsCount = async (date, type) => {
  const query = { createdAt: { $gte: date } };

  if (type !== "both") {
    query.type = type;
  }

  return await User.countDocuments(query);
};
