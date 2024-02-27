import { User, Profile } from '../../../../models/index.js';
import { validateRegister } from '../../../validators/user.validator.js';
import { errorHelper, generateRandomCode, sendCodeToEmail, logger, getText, signConfirmCodeToken } from '../../../../utils/index.js';
import ipHelper from '../../../../utils/helpers/ip-helper.js';
import bcrypt from 'bcryptjs';
const { hash } = bcrypt;
import geoip from 'geoip-lite';
const { lookup } = geoip;

export default async (req, res) => {
  const { error } = validateRegister(req.body);
  if (error) {
    let code = '00025';
    if (error.details[0].message.includes('email'))
      code = '00026';
    else if (error.details[0].message.includes('password'))
      code = '00027';
    else if (error.details[0].message.includes('name'))
      code = '00028';

    return res.status(400).json(errorHelper(code, req, error.details[0].message));
  }

  const exists = await User.exists({ email: req.body.email })
    .catch((err) => {
      return res.status(500).json(errorHelper('00031', req, err.message));
    });

  if (exists) return res.status(409).json(errorHelper('00032', req));

  const hashed = await hash(req.body.password, 10);

  const emailCode = generateRandomCode(6);
  //in futur we may use email verifications
  // await sendCodeToEmail(req.body.email, req.body.name, emailCode, req.body.language, 'register', req, res);

  let username = '';
  let tempName = '';
  let existsUsername = true;
  let name = req.body.name;
  if (name.includes(' ')) {
    tempName = name.trim().split(' ').slice(0, 1).join('').toLowerCase();
  } else {
    tempName = name.toLowerCase().trim();
  }
  do {
    username = tempName + generateRandomCode(4);
    existsUsername = await User.exists({ username: username }).catch((err) => {
      return res.status(500).json(errorHelper('00033', req, err.message));
    });
  } while (existsUsername);

  // const geo = lookup(ipHelper(req));
  const url = req.protocol + '://' + req.get('host');

  let profile = new Profile({});

  profile = await profile.save().catch((err) => {
    return res.status(500).json(errorHelper('00000', req, err.message));
  });

  let user = new User({
    profile: profile._id,
    email: req.body.email,
    password: hashed,
    name: name,
    username: username,
    photoUrl: `${url}/images/avatar.png`,
    gender: req.body.gender,
    courtName: req.body.courtName,
    lawyerId: req.body.lawyerId,
    city: req.body.city,
    isVerified: true,
    type: req.body.type,
    lastLogin: Date.now(),
    verificationCode: emailCode
  });

  user = await user.save().catch((err) => {
    return res.status(500).json(errorHelper('00000', req, err.message));
  });

  user.password = null;

  const confirmCodeToken = signConfirmCodeToken(user._id, emailCode);

  logger('00035', user._id, getText('en', '00035'), 'Info', req);
  return res.status(200).json({
    resultMessage: { en: getText('en', '00035'), ur: getText('ur', '00035') },
    resultCode: '00035', user, confirmToken: confirmCodeToken
  });
};