import mongoose from "mongoose";

const noteSchema = mongoose.Schema({
    title: {type: String,required: true},
    content: {type: String,required: true},
    user: {type: mongoose.Schema.Types.ObjectId,ref: "user", required: true},
},{ timestamps: true });

const noteModel = mongoose.models.note || mongoose.model("note", noteSchema);
export default noteModel;