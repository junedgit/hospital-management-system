import mongoose, { Schema } from "mongoose";

const referralSchema = new Schema(
    {
        firstName: {
            type: String,
            required: true,
        },
        middleName: {
            type: String,
            required: false,
        },
        lastName: {
            type: String,
            required: true,
        },
        referralType: {
            type: String,
            required: true,
        },
        referralCode: {
            type: Number,
            required: true,
        },
        speciality: {
            type: String,
            required: false,
        },
        qualification: {
            type: String,
            required: false,
        },
        clinicName: {
            type: String,
            required: false,
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
        email: {
            type: String,
            required: true,
            unique: true,
            trim: true,
            lowercase: true,
            // match: [/^\S+@\S+\.\S+$/, "Invalid email format"],
        },
        phone: {
            type: Number,
            required: true,
            unique: true,
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

const Referral = new mongoose.model("Referral", referralSchema);

export default Referral;
