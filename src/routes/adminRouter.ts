import express from "express";
import { deleteUser } from "../controllers/userController";
import { adminMiddleware } from "../middleware/authMiddleware";

const router = express.Router();

router.delete("/:id", deleteUser);

export default router;
