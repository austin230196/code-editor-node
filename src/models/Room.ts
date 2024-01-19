import mongoose from "mongoose";


const roomSchema = new mongoose.Schema({
    roomId: {
        type: String,
        unique: true,
        required: true,
        index: true
    },
    owner: {
        type: String,
        required: true
    },
    participants: {
        type: Array,
        required: true
    },
    programmingLanguage: {
        type: String,
        required: true,
    },
    code: {
        type: String,
        required: true
    }
}, {timestamps: true})


const Room = mongoose.model("Room", roomSchema);


export default Room;