import mongoose from "mongoose";
import Message_Interface from "../interface/Message.ts";

const MessageSchema = new mongoose.Schema<Message_Interface>({
    Content : {
        type : String
    },
    UserId : {
        type : String
    },
    Room : {
        type : String
    }
},{timestamps:true});

const message = mongoose.models.message || mongoose.model("message",MessageSchema);
export default message