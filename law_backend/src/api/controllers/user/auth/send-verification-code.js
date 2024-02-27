import { User } from '../../../../models/index.js';
import { validateSendVerificationCode } from '../../../validators/user.validator.js';
import { generateRandomCode, errorHelper, logger, getText, signConfirmCodeToken } from '../../../../utils/index.js';

import sendCodeToEmail from './email-verification/send-code-to-email.js';

export default async (req, res) => {
  const { error } = validateSendVerificationCode(req.body);
  if (error) return res.status(400).json(errorHelper('00029', req, error.details[0].message));

  const user = await User.findOne({ email: req.body.email, isActivated: true })
    .catch((err) => {
      return res.status(500).json(errorHelper('00030', req, err.message));
    });

  if (!user) return res.status(404).json(errorHelper('00036', req));

  const emailCode = generateRandomCode(6);

  const sendEmail = await sendCodeToEmail({
    email: req.body.email,
    subject: 'Verification Code',
    verificationCode: emailCode,
    mode: req.body.mode
  });

  if (!sendEmail.success) {
    return res.status(500).json({
      resultMessage: {
        en: sendEmail.message,
        ur: sendEmail.message,
      },
      resultCode: "",
    });
  }

  user.verificationCode = emailCode;

  await user.save().catch((err) => {
    return res.status(500).json(errorHelper('00037', req, err.message));
  });

  const confirmCodeToken = signConfirmCodeToken(user._id, emailCode);
  logger('00048', user._id, getText('en', '00048'), 'Info', req);
  return res.status(200).json({
    resultMessage: { en: getText('en', '00048'), ur: getText('ur', '00048') },
    resultCode: '00048',
    confirmToken: confirmCodeToken
  });
};