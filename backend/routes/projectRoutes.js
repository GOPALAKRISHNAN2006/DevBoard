import express from "express";
const router = express.Router();
import authMiddleware from "../middleware/authMiddleware.js";
import { addProject,getProject,getProjectById,updateProject,
    deleteProject, patchProject} from "../Controllers/projectController.js";

router.post("/",authMiddleware,addProject);
router.get("/",authMiddleware,getProject);
router.get("/:id",authMiddleware, getProjectById);
router.put("/:id",authMiddleware, updateProject);
router.patch("/:id",authMiddleware, patchProject);
router.delete("/:id",authMiddleware,deleteProject);

export default router;