import { Router } from "express";
import { createNote, deleteNote, getNotes } from "../controllers/noteController.js";
import userAuth from "../middleware/userAuth.js";

const noteRouter = Router();

noteRouter.post("/add",userAuth,createNote );
noteRouter.get("/",userAuth, getNotes);
noteRouter.delete("/:id",userAuth, deleteNote);

export default noteRouter;