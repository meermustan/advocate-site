import Joi from 'joi';

// language: Joi.string().valid('ur', 'en').required(),
// platform: Joi.string().valid('Android', 'IOS').required(),
// timezone: Joi.number().required(),
// deviceId: Joi.string().min(4).required()

export function validateRegister(body) {
  const schema = Joi.object({
    email: Joi.string().email().min(3).required(),
    password: Joi.string().min(6).max(20).required(),
    name: Joi.string().min(3).max(24).required(),
    type: Joi.string().valid('admin', 'client', 'lawyer').required(),
    gender: Joi.string().valid('male', 'female').required(),
    city: Joi.string().required(),
    lawyerId: Joi.string(),
    courtName: Joi.string()
  });
  return schema.validate(body);
}

export function validateLogin(body) {
  const schema = Joi.object({
    email: Joi.string().email().min(3).required(),
    password: Joi.string().min(6).max(20).required()
  });
  return schema.validate(body);
}

export function validateSendVerificationCode(body) {
  const schema = Joi.object({
    email: Joi.string().email().min(3).required(),
    mode: Joi.string().default("registration")
  });
  return schema.validate(body);
}

export function validateVerifyEmail(body) {
  const schema = Joi.object({
    token: Joi.string().min(10).required(),
    code: Joi.string().length(4).required()
  });
  return schema.validate(body);
}

export function validateRefreshToken(body) {
  const schema = Joi.object({
    refreshToken: Joi.string().min(10).required()
  });
  return schema.validate(body);
}

export function validateForgotPassword(body) {
  const schema = Joi.object({
    password: Joi.string().min(6).max(20).required()
  });
  return schema.validate(body);
}

export function validateChangePassword(body) {
  const schema = Joi.object({
    oldPassword: Joi.string().min(6).max(20).required(),
    newPassword: Joi.string().min(6).max(20).required()
  });
  return schema.validate(body);
}

export function validateEditUser(body) {
  const schema = Joi.object({
    name: Joi.string().min(3).max(24),
    username: Joi.string().min(3).max(15),
    language: Joi.string().valid('ur', 'en'),
    gender: Joi.string().valid('male', 'female', 'other'),
    birthDate: Joi.date()
  });
  return schema.validate(body);
} 