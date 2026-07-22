import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import { createJob,getJob,deleteJob,
         patchJob,getJobById,updateJob,
         getJobStats,searchJobs,filterJobs } from "../Controllers/jobController.js";

const router = express.Router();

router.post("/",authMiddleware,createJob);
router.get("/search",authMiddleware,searchJobs);
router.get("/filter",authMiddleware,filterJobs);
router.get("/stats",authMiddleware,getJobStats);
router.get("/",authMiddleware,getJob);
router.get("/:id",authMiddleware,getJobById);
router.put("/:id",authMiddleware,updateJob);
router.patch("/:id",authMiddleware,patchJob);
router.delete("/:id",authMiddleware,deleteJob);

export default router;

