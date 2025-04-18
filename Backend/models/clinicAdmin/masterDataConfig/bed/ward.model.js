import mongoose, { Schema } from "mongoose";

const wardSchema = new Schema(
    {
        code: {
            type: Number,
            required: true,
            // unique: true,
        },
        name: {
            type: String,
            required: true,
        },
        clinicId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Clinic",
            required: true,
        },
    },
    { timestamps: true }
);
const Ward = mongoose.model("Ward", wardSchema);

export default Ward;
