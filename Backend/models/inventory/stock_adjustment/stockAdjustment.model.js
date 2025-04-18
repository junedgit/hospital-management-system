import mongoose from "mongoose";
import { Schema } from "mongoose";

const stockAdjustmentSchema = new Schema({
    itemName : {
        type : String,
        required : true,
    },
    batchNumber : {
        type : String,
        required : true,
    },
    currStock : {
        type : Number,
        required : true,
    },
    adjustmentValue : {
        type : Number,
        required : true,
    },
    reason : {
        type : String,
        required : true,
    },
    clinicId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Clinic",
        required: true,
    },
});

const StockAdjustment = mongoose.model("StockAdjustment", stockAdjustmentSchema);

export default StockAdjustment;