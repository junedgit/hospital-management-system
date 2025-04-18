import mongoose, { Schema } from "mongoose";

const manufacturerSchema = new Schema(
    {
        brandName: {
            type: String,
            required: true,
        },
        address: {
            type: String,
            required: true,
        },
        city: {
            type: String,
        },
        state: {
            type: String,
        },
        pinCode: {
            type: String,
        },
        clinicId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Clinic",
            required: true,
        },
    },
    { timestamps: true }
);
const Manufacturer = mongoose.model("Manufacturer", manufacturerSchema);
export default Manufacturer;
