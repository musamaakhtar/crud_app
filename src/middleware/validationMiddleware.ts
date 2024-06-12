import { Request, Response, NextFunction } from "express";
import {
  userValidationSchema,
  loginValidationSchema,
  roleValidationSchema,
} from "../utils/validation";

const validateRegisterUser = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { error } = userValidationSchema.validate(req.body);

  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  next();
};

const validateLogin = (req: Request, res: Response, next: NextFunction) => {
  const { error } = loginValidationSchema.validate(req.body);

  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  next();
};

const validateRole = (req: Request, res: Response, next: NextFunction) => {
  const { error } = roleValidationSchema.validate(req.body);

  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  next();
};

export { validateRegisterUser, validateLogin, validateRole };
