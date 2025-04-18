import mongoose, { Schema } from "mongoose";

const appointmentSchema = new Schema(
    {
        doctorId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Doctor",
            required: true,
        },
        patientId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Patient", // Assuming you have a Patient model
            required: true,
        },
        patientName: {
            type: String,
            required: true,
        },
        date: {
            type: Date,
            required: true,
        },
        from: {
            type: String,
            required: true,
            match: [/^([01]\d|2[0-3]):([0-5]\d)$/, "Invalid 24-hour format (HH:mm)"],
        },
        to: {
            type: String,
            required: true,
            match: [/^([01]\d|2[0-3]):([0-5]\d)$/, "Invalid 24-hour format (HH:mm)"],
        },
        typeOfAppointment: {
            type: String,
            required: true,
        },
        status : {
            type : String,
            default : "Awaiting",
        },
        clinicId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Clinic",
            required: true,
        },
    },
    { timestamps: true }
);

const Appointment = mongoose.model("Appointment", appointmentSchema);

export default Appointment;
