import Note from "../models/Note.js";

export const createNote = async (req, res) => {
  try {
    const { title, content, tags, isPinned } = req.body;
    if (!title || !content) {
      return res.status(400).json({ message: "Title and content are required" });
    }
    const note = await Note.create({
      title,
      content,
      tags,
      isPinned,
      owner: req.user.id,
    });
    res.status(201).json({ message: "Note created", note });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getNotes = async (req, res) => {
  try {
    const { search = "", filter = "active" } = req.query;
    
    const query = { owner: req.user.id };
    
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: "i" } },
        { content: { $regex: search, $options: "i" } },
        { tags: { $regex: search, $options: "i" } }
      ];
    }
    
    if (filter === "archived") {
      query.isArchived = true;
    } else {
      query.isArchived = false;
    }

    const notes = await Note.find(query).sort({ isPinned: -1, updatedAt: -1 });
    res.status(200).json(notes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateNote = async (req, res) => {
  try {
    const note = await Note.findOneAndUpdate(
      { _id: req.params.id, owner: req.user.id },
      { $set: req.body },
      { new: true, runValidators: true }
    );
    if (!note) return res.status(404).json({ message: "Note not found" });
    res.status(200).json({ message: "Note updated", note });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteNote = async (req, res) => {
  try {
    const note = await Note.findOneAndDelete({ _id: req.params.id, owner: req.user.id });
    if (!note) return res.status(404).json({ message: "Note not found" });
    res.status(200).json({ message: "Note deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
