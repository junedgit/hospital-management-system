import mongoose, { Schema } from "mongoose";

const testParameterSchema = new Schema(
    {
        sectionName: { type: String, required: true },
        department: { type: String, required: true },
        group: { type: String, required: true },
        charge: { type: Number, required: true }, // INR charge

        testDetails: {
            testName: { type: String, required: true },
            group: { type: String, required: true },
            unit: { type: String, default: "" }, // Optional
            method: { type: String, required: true },
            interpretation: { type: String, required: true },
            charge: { type: Number, required: true }, // INR charge
        },
        clinicId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Clinic",
            required: true,
        },
    },
    { timestamps: true }
);

const TestParameter = mongoose.model("TestParameter", testParameterSchema);

export default TestParameter;
