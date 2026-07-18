import express from "express";
import { getProfile,updateProfile } from "../Controller/user.controller.js";

import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();
router.post("/me",authMiddleware,updateProfile);
router.get("/getme",authMiddleware,getProfile);

export default router;