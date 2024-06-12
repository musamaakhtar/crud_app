import express from "express";
import {
  registerUser,
  authenticateUser,
  logoutUser,
} from "../controllers/authController";
import {
  validateLogin,
  validateRegisterUser,
} from "../middleware/validationMiddleware";

const router = express.Router();

router.post("/register", validateRegisterUser, registerUser);
router.post("/login", validateLogin, authenticateUser);
router.post("/logout", logoutUser);

export default router;
