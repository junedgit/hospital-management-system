import mongoose from "mongoose";
import { Schema } from "mongoose";

const templateSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        trim: true,
    },
    type: {
        type: String,
        enum: ["Discharge Summary", "Consent Form", "Consultation Form"],
        required: true,
    },
    sections: [
        {
            sectionName: { type: String, required: true }, // "Summary", "Admission Details", "Patient Details"
            selectedFields: [{ type: String }], // e.g., ["Patient Name", "DOB", "Phone Number"]
        },
    ],
    logo: {
        type: String, // URL or file path
    },
    timestamp: {
        type: Boolean,
        default: false,
    },
    status: {
        type: String,
        enum: ["Published", "Unpublished"],
        default: "Published",
    },
    clinicId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Clinic",
        required: true,
    },
}, { timestamps: true });

const Template = mongoose.model("Template", templateSchema);

export default Template;
