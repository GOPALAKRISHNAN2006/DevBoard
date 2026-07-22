import express from "express"
import authMiddleware from "../middleware/authMiddleware.js";
import { createResume,getResume,updateResume,
    deleteResume,patchResume
 } from "../Controllers/resumeController.js"

const router = express.Router();

router.post("/",authMiddleware,createResume);
router.get("/",authMiddleware,getResume);
router.put("/",authMiddleware,updateResume);
router.delete("/",authMiddleware,deleteResume);
router.patch("/",authMiddleware,patchResume);

export default router;