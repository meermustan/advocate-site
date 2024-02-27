import pkg from "jsonwebtoken";
const { sign } = pkg;
import { jwtSecretKey, refreshTokenSecretKey } from "../../config/index.js";

export function signAccessToken(userId, userType) {
  const accessToken = sign({ _id: userId, type: userType }, jwtSecretKey, {
    expiresIn: "1d",
  });
  return accessToken;
}
export function signRefreshToken(userId, userType) {
  const refreshToken = sign(
    { _id: userId, type: userType },
    refreshTokenSecretKey,
    {
      expiresIn: "7d",
    }
  );
  return refreshToken;
}
export function signConfirmCodeToken(userId, confirmCode) {
  const confirmCodeToken = sign(
    { _id: userId, code: confirmCode },
    jwtSecretKey,
    {
      expiresIn: "5m",
    }
  );
  return confirmCodeToken;
}
