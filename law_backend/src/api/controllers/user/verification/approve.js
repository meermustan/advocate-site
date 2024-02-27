import { User, Verification } from "../../../../models/index.js";
import sendVerifiedToEmail from "./approved/send-approved-to-email.js";

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

    const { verification_id } = req.body;

    if (!verification_id) {
      return res.status(400).json({
        resultMessage: {
          en: "Invalid verification ID!",
          ur: "Invalid verification ID!",
        },
        resultCode: "",
      });
    }

    const verification = await Verification.findById(verification_id);
    if (!verification) {
      return res.status(404).json({
        resultMessage: {
          en: "Verification data not found!",
          ur: "Verification data not found!",
        },
        resultCode: "",
      });
    }

    if (verification.status !== "pending") {
      return res.status(400).json({
        resultMessage: {
          en: "Invalid verification status!",
          ur: "Invalid verification status!",
        },
        resultCode: "",
      });
    }

    const applicantUser = await User.findOne({_id : verification.user})

    const sendEmail = await sendVerifiedToEmail({
      email: applicantUser.email,
      subject: 'Account Verification - Approved',
    });

    await verification.updateOne({ status: "approved" });
    await applicantUser.updateOne({ verified_by_admin: true });



    return res.json({
      resultMessage: {
        en: "Verification request approved!",
        ur: "Verification request approved!"
      },
      resultCode: "",
      result: null,
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