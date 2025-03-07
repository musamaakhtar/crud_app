import Joi from "joi";

const userValidationSchema = Joi.object({
  name: Joi.string().min(3).max(30).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  role: Joi.string().valid("user", "admin"),
});

const loginValidationSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
});

const roleValidationSchema = Joi.object({
  role: Joi.string().valid("user", "admin"),
});

export { userValidationSchema, loginValidationSchema, roleValidationSchema };
