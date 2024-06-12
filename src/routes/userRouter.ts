import express from "express";
import { getUser, updateUser } from "../controllers/userController";
import { validateRole } from "../middleware/validationMiddleware";

const router = express.Router();

router.get("/:id", getUser);
router.put("/:id", validateRole, updateUser);

export default router;
