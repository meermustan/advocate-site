import { User } from "../../../../../models/index.js";
import { signAccessToken } from "../../../../../utils/index.js";

export default async (req, res) => {
  try {
    
    const { email, verification_code } = req.body;

    if (!email || !verification_code) {
      return res.status(400).json({
        resultMessage: {
          en: "Verification code doesn't match!",
          ur: "Verification code doesn't match!",
        },
        resultCode: "",
      });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({
        resultMessage: {
          en: "Verification data not found!",
          ur: "Verification data not found!",
        },
        resultCode: "",
      });
    }

    if (!user.verificationCode) {
      return res.status(404).json({
        resultMessage: {
          en: "Verification data not found!",
          ur: "Verification data not found!",
        },
        resultCode: "",
      });
    }

    if (String(verification_code) !== String(user.verificationCode)) {
      return res.status(400).json({
        resultMessage: {
          en: "Verification code doesn't match!",
          ur: "Verification code doesn't match!",
        },
        resultCode: "",
      });
    }

    const accessToken = signAccessToken(user._id, user.type);

    return res.json({
      resultMessage: {
        en: "Verification code match!",
        ur: "Verification code match!"
      },
      resultCode: "",
      result: {
        accessToken
      },
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