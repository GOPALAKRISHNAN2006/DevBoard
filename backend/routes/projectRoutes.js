import express from "express"
const router = express.Router();
import authMiddleware from "../middleware/authMiddleware.js";
import { addProject,getProject,getProjectById,updateProject,
    deleteProject, patchProject} from "../Controller/projectController.js";

router.post("/project",authMiddleware,addProject);
router.get("/project",authMiddleware,getProject);
router.get("/project/:id",authMiddleware, getProjectById);
router.put("/project/:id",authMiddleware, updateProject);
router.patch("/project/:id",authMiddleware, patchProject);
router.delete("/project/:id",authMiddleware,deleteProject);

export default router;