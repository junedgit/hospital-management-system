import mongoose, { Schema } from "mongoose";

const bedSchema = new Schema(
    {
        wardName: {
            type: String,
            required: true,
        },
        roomNumber: {
            type: Number,
            required: true,
        },
        bedNumber: {
            type: Number,
            required: true,
            min: 1,
        },
        bedCharges: {
            type: Number,
            required: true,
            min: 0,
        },
        clinicId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Clinic",
            required: true,
        },
    },
    { timestamps: true }
);
const Bed= mongoose.model("Bed",bedSchema);

export default Bed;