import { User, Token } from "../../../../models/index.js";
import { validateVerifyEmail } from "../../../validators/user.validator.js";
import {
  errorHelper,
  getText,
  logger,
  signAccessToken,
  signRefreshToken,
} from "../../../../utils/index.js";
import ipHelper from "../../../../utils/helpers/ip-helper.js";
import { jwtSecretKey } from "../../../../config/index.js";
import pkg from "jsonwebtoken";
const { verify } = pkg;

export default async (req, res) => {
  const { error } = validateVerifyEmail(req.body);
  if (error)
    return res
      .status(400)
      .json(errorHelper("00053", req, error.details[0].message));

  try {
    req.user = verify(req.body.token, jwtSecretKey);
  } catch (err) {
    return res.status(400).json(errorHelper("00055", req, err.message));
  }

  const exists = await User.exists({
    _id: req.user._id,
    isActivated: true,
  }).catch((err) => {
    return res.status(500).json(errorHelper("00051", req, err.message));
  });

  if (!exists) return res.status(400).json(errorHelper("00052", req));

  if (req.body.code !== req.user.code)
    return res.status(400).json(errorHelper("00054", req));

  await User.updateOne(
    { _id: req.user._id },
    { $set: { isVerified: true } }
  ).catch((err) => {
    return res.status(500).json(errorHelper("00056", req, err.message));
  });

  const accessToken = signAccessToken(req.user._id, req.user.type);
  const refreshToken = signRefreshToken(req.user._id, req.user.type);
  await Token.updateOne(
    { userId: req.user._id },
    {
      $set: {
        userId: req.user._id,
        refreshToken: refreshToken,
        status: true,
        expires: Date.now() + 604800000,
        createdAt: Date.now(),
        createdByIp: ipHelper(req),
      },
    },
    {
      upsert: true,
    }
  ).catch((err) => {
    return res.status(500).json(errorHelper("00057", req, err.message));
  });

  logger("00058", req.user._id, getText("en", "00058"), "Info", req);
  return res.status(200).json({
    resultMessage: { en: getText("en", "00058"), ur: getText("ur", "00058") },
    resultCode: "00058",
    accessToken,
    refreshToken,
  });
};
