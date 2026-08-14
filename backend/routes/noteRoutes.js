import express from "express";
import { createNote, getNotes, updateNote, deleteNote } from "../Controllers/noteController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.use(authMiddleware);

router.post("/", createNote);
router.get("/", getNotes);
router.put("/:id", updateNote);
router.delete("/:id", deleteNote);

export default router;
