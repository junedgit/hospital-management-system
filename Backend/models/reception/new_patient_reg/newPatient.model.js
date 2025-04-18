import mongoose, { Schema } from "mongoose";

const patientSchema = new Schema(
    {
        mrn: {
            type: String,
            unique: true, // Ensures each MRN is unique
            sparse: true, // Allows for null values
        },
        iquma: {
            type: Number,
            unique: true, // Ensures uniqueness
            sparse: true,
        },
        patientCategory: {
            type: String,
            required: true,
            // enum: ["Inpatient", "Outpatient", "Emergency"], // Example categories
        },
        image: {
            type: String, // Stores the image URL
            trim: true,
        },
        title: {
            type: String,
            required: true,
            enum: ["Mr", "Ms", "Mrs", "Dr", "Master"], // Example titles
        },
        givenName: {
            type: String,
            required: true,
            trim: true,
        },
        middleName: {
            type: String,
            trim: true,
        },
        familyName: {
            type: String,
            required: true,
            trim: true,
        },
        grandfatherName: {
            type: String,
            trim: true,
        },
        dateOfBirth: {
            type: Date,
        },
        age: {
            type: Number,
            min: 0, // Ensures age cannot be negative
        },
        gender: {
            type: String,
            required: true,
            enum: ["Male", "Female", "Other"],
        },
        maritalStatus: {
            type: String,
            enum: ["Single", "Married", "Divorced", "Widowed"],
        },
        email: {
            type: String,
            unique: true,
            sparse: true,
            lowercase: true,
            trim: true,
        },
        phone: {
            type: String,
            required: true,
            trim: true,
        },
        homePhone: {
            type: String,
            trim: true,
        },
        address: {
            type: String,
            trim: true,
        },
        city: {
            type: String,
            trim: true,
        },
        state: {
            type: String,
            trim: true,
        },
        pinCode: {
            type: String,
            trim: true,
        },
        nationality: {
            type: String,
            trim: true,
        },
        ethnicity: {
            type: String,
            trim: true,
        },
        religion: {
            type: String,
            trim: true,
        },
        bloodGroup: {
            type: String,
            enum: ["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"],
        },
        occupation: {
            type: String,
            trim: true,
        },
        idProfType: {
            type: String,
            trim: true,
        },
        idNo: {
            type: String,
            unique: true,
            sparse: true,
            trim: true,
        },
        passportNumber: {
            type: String,
            unique: true,
            sparse: true,
            trim: true,
        },
        language: {
            type: String,
            trim: true,
        },
        referredBy: {
            referredType: {
                type: String,
                // required: true,
                enum: [
                    "Agent",
                    "Corporate",
                    "External Doctor",
                    "Internal Doctor",
                    "Self",
                    "Insurance",
                ],
            },
            referredName: {
                type: String,
                // required: true,
                trim: true,
            },
        },
        clinicId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Clinic",
            required: true,
            index: false,
        },
    },
    { timestamps: true }
);

const Patient = new mongoose.model("Patient", patientSchema);

export default Patient;
