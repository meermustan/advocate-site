import { Chat } from "../../../models/index.js";
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

    // const pastDays = 7;
    let duration = req.body.duration || "week";
    // let interval = 1;
    if (duration === 'week') {
      duration = 7; // Weekly duration
    } else if (duration === 'day') {
      duration = 1; // Daily duration
    } else{
      duration = duration
    }

    // Calculate the date 7 days ago
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - duration);

    // Fetch messages within the last 7 days
    const chats = await Chat.find();

    // Check if chats is an array and has length
    if (!Array.isArray(chats) || chats.length === 0) {
      return res.status(404).json(errorHelper("00801", req));
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

    // Count messages for each date
    chats?.forEach((messages) => {
      messages?.messages?.forEach((message)=>{
        if (message && message.msg && message.sender && message.time) {
          const messageDate = new Date(message.time).toLocaleDateString();
          if (dateCounts.hasOwnProperty(messageDate)) {
            dateCounts[messageDate]++;
          }
        }
      })
      // console.log(messages);
    });


  return res.status(200).json({
    resultMessage: { en: getText("en", "00800"), ur: getText("ur", "00800") },
    resultCode: "00800",
    data: dateCounts,
  });
  } catch (error) {
    return res.status(500).json({ error: errorHelper(error) });
  }
};
