import mongoose, { Schema } from "mongoose";

const roomSchema = new Schema({
    code: {
        type: Number,
        required: true,
    },
    number: {
        type: Number,
        required: true,
    },
    ward: {
        type: String,
        required: true,
    },
    clinicId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Clinic",
        required: true,
    },
});
const Room = new mongoose.model("Room", roomSchema);
export default Room;
