import express from "express";
import { getLinkedinProfile } from "../Controllers/linkedinController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.use(authMiddleware);
router.get("/profile", getLinkedinProfile);

export default router;
