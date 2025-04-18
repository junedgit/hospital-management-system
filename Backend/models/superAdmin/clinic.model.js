import mongoose, { Schema } from "mongoose";

const clinicSchema = new Schema(
    {
        CID: {
            type: Number,
            unique: true,
            required: true,
        },
        clinicName: {
            type: String,
            required: true,
            unique: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        phone_number: {
            type: Number,
            required: true,
            unique: true,
        },
        address: {
            type: String,
            unique: true,
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
        subdomain: {
            type: String,
            unique: true,
            required: true,
        },
        modulePermissions: {
            type: [String],
            required: true,
        },
        activationDate: {
            type: Date,
        },
        usersAllowed: {
            type: Number,
            required: true,
        },
        salesBy_name: {
            type: String,
        },
        salesBy_email: {
            type: String,
        },
        globalLabel1: {
            type: String,
        },
        globalLabel2: {
            type: String,
        },
        softDeleted : {
            type : Boolean,
            default : false,
        },
        password:{
            type: String,
            unique : true,
            required : true,
        }
    },
    { timestamps: true }
);

const Clinic = mongoose.model("Clinic", clinicSchema);

export default Clinic;
