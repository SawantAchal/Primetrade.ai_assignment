import noteModel from "../model/noteModel.js";
import userModel from "../model/userModel.js";

// add notes
export const createNote = async (req, res) => {
    try {
        const { title, content } = req.body;
        if (!title || !content) {
            return res.status(400).json({ message: "Title and content required" });
        }
        const note = await noteModel.create({
            title,
            content,
            user: req.userId
        });
        await userModel.findByIdAndUpdate(req.userId, {
            $push: { notes: note._id }
        });
        res.status(201).json(note);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// all notes
export const getNotes = async (req, res) => {
    try {
        const notes = await noteModel.find({ user: req.userId })
        .sort({ createdAt: -1 });
        res.json(notes);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// delete note
export const deleteNote = async (req, res) => {
    try {
        const note = await noteModel.findById(req.params.id);
        if (!note) {
            return res.status(404).json({ message: "Note not found" });
        }
        if (note.user.toString() !== req.userId) {
            return res.status(401).json({ message: "Not authorized" });
        }
        await note.deleteOne();
        await userModel.findByIdAndUpdate(req.userId, {
            $pull: { notes: note._id }
        });
        res.json({ message: "Note deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
