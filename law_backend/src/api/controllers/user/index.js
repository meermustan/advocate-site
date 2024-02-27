// AUTH
export { default as register } from "./auth/register.js";
export { default as login } from "./auth/login.js";
export { default as logout } from "./auth/logout.js";
export { default as verifyEmail } from "./auth/verify-email.js";
export { default as refreshToken } from "./auth/refresh-token.js";
export { default as forgotPassword } from "./auth/forgot-password.js";
export { default as sendVerificationCode } from "./auth/send-verification-code.js";
export { default as verifyVerificationCode } from "./auth/email-verification/verify-code.js";

// EDIT
export { default as changePassword } from "./edit/change-password.js";
export { default as editUser } from "./edit/edit-user.js";
export { default as editProfile } from "./edit/edit-profile.js";

// OTHER
export { default as getUser } from "./get-user.js";
export { default as getLawyers } from "./get-lawyers.js";
export { default as deleteUser } from "./delete-user.js";

// VERIFICATION
export { default as submitVerification } from "./verification/submit.js";
export { default as getVerificationData } from "./verification/get-data.js";
export { default as approveVerification } from "./verification/approve.js";
export { default as refuteVerification } from "./verification/refute.js";
export { default as mailLawyersToVerify } from "./mail-lawyers-to-verify.js";