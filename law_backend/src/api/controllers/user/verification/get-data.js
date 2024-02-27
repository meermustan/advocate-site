import { Verification } from "../../../../models/index.js";

export default async (req, res) => {
  try {
    let verification;
    if (req.user?.type === 'admin') {
      let filter = {};
      
      if (req.query.status) {
        filter.status = req.query.status;
      }

      verification = await Verification.find(filter).populate('user');
    } else {
      verification = await Verification.findOne({ user: req.user._id });
    }

    if (!verification) {
      return res.status(404).json({
        resultMessage: {
          en: "Verification data not found",
          ur: "Verification data not found"
        },
        resultCode: "",
      });
    }

    return res.json({
      resultMessage: {
        en: "Successfully retrieved verification data.",
        ur: "Successfully retrieved verification data."
      },
      resultCode: "",
      result: verification
    });
  } catch (error) {
    return res.status(500).json({
      resultMessage: {
        en: error.message,
        ur: error.message
      },
      resultCode: "",
    });
  }
}