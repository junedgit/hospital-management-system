import mongoose, { Schema } from "mongoose";

const clinicUser = new Schema(
    {
        firstName: {
            type: String,
            required: true,
        },
        lastName: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        phoneNumber: {
            type: Number,
            required: true,
            unique: true,
        },
        address: {
            type: String,
            unique: true,
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
        userName: {
            type: String,
            required: true,
            unique: true,
        },
        department: {
            type: String,
            required: true,
        },
        role: {
            type: String,
            required: true,
        },
        clinicId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Clinic",
            required: true,
            index: false,
        },
        password: {
            type: String,
            unique: true,
            required: true,
        },
    },
    { timestamps: true }
);
const ClinicUser = new mongoose.model("ClinicUser", clinicUser);

export default ClinicUser;
