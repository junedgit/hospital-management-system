import mongoose from "mongoose";
import { Schema } from "mongoose";

const tariffRateSchema = new Schema({
    type: {
      type: String,
      enum: ["OP", "IP", "Emergency"],
      required: true,
    },
    facility: {
      type: String,
      trim: true,
    },
    classCode: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    className: {
      type: String,
      required: true,
      trim: true,
    },
    aliasName: {
      type: String,
      trim: true,
    },
    status: {
      type: String,
      enum: ["Active", "Inactive"],
      required: true,
    },
    tariffType: {
      type: String,
      required: true,
    },
    ICU: {
      type: Boolean,
      required: true,
    },
    billLevelDiscount: {
      type: Boolean,
      required: true,
    },
    serviceDiscount: {
      type: Boolean,
      required: true,
    },
    seniorCitizenDiscount: {
      type: Boolean,
      required: true,
    },
    negotiableCharges: {
      type: Boolean,
      required: true,
    },
    pharmacyCharges: {
      type: String,
      required: true,
    },
    remarks: {
      type: String,
      trim: true,
    },
    clinicId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Clinic",
      required: true,
    }
  }, { timestamps: true });

const TariffClass = mongoose.model("TariffClass", tariffRateSchema);

export default TariffClass;