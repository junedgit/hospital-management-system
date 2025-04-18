import mongoose from "mongoose";
import { Schema } from "mongoose";

const tariffRateSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    service : {
        type : String,
    },
    type : {
        type : String,
        enum : ["OP", "IP", "Emergency"],
        required : true,
    },
    tariffClass : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "TariffClass",
        required : true,
    },
    tariffCategory : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "TariffCategory",
        required : true,    
    },
    rate: {
        type: Number,
    },
    remarks: {
        type: String,  
        trim : true,
    },
    clinicId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Clinic",
        required: true,
    },
});

const TariffRate = mongoose.model("TariffRate", tariffRateSchema);

export default TariffRate;