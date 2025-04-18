import mongoose, { Schema } from "mongoose";

const departmentSchema = new Schema({
    name : {
        type : String,
        required : true,
    },
    description : {
        type : String,
        required : true,
    },
    clinicId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "Clinic",
        required : true,
    }
});

const Department = mongoose.model("Department", departmentSchema);

export default Department;
