import mongoose from "mongoose";
import { Verification } from "../../../../models/index.js";

const { ObjectId } = mongoose.Types;

export default async (req, res) => {
  try {
    
    const user = ObjectId(req.user?._id);

    const currentVerification = await Verification.findOne({ user });
    if (currentVerification?.status === "approved") {
      return res.status(400).json({
        resultMessage: {
          en: "Account already verified!",
          ur: "Account already verified!",
        },
        resultCode: "",
      });
    }

    const {
      CNIC_front_image_url,
      CNIC_back_image_url,
      BAR_front_image_url,
      BAR_back_image_url,
      BAR_no,
      location,
      main_court_of_practice,
      clients = []
    } = req.body;

    console.log(CNIC_front_image_url, CNIC_back_image_url, BAR_front_image_url, BAR_back_image_url);

    if (!CNIC_front_image_url || !CNIC_back_image_url || !BAR_front_image_url || !BAR_back_image_url || !BAR_no || !location || !main_court_of_practice) {
      return res.status(500).json({
        resultMessage: {
          en: "Please fill in all the required fields for the operation to proceed.",
          ur: "Please fill in all the required fields for the operation to proceed.",
        },
        resultCode: "",
      });
    }

    const filter = {
      user
    };
    const newClients = clients.map(client => {
      return {
        name: client.name,
        phone: client.phone,
        case_type: client.case_type
      }
    });
    const update = {
      user,
      CNIC_front_image_url,
      CNIC_back_image_url,
      BAR_front_image_url,
      BAR_back_image_url,
      BAR_no,
      location,
      main_court_of_practice,
      clients: newClients,
      status: 'pending'
    };

    const verification = await Verification.findOneAndUpdate(filter, update, {
      new: true,
      upsert: true
    });

    return res.json({
      resultMessage: {
        en: "Verification data submitted!",
        ur: "Verification data submitted!"
      },
      resultCode: "",
      result: verification,
    });

  } catch (error) {
    return res.status(500).json({
      resultMessage: {
        en: error.message,
        ur: error.message,
      },
      resultCode: "",
    });
  }
}