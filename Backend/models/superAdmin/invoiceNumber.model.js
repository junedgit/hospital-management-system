import mongoose from "mongoose";
import { Schema } from "mongoose";

const invoiceNumberSchema = new Schema({
    invoiceNumber: {
        type: Number,
        required: true,
    },
    clinicId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "Clinic",
        required : true
    },
});

const InvoiceNumber = mongoose.model("InvoiceNumber", invoiceNumberSchema);

export default InvoiceNumber;