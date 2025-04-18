import mongoose, { Schema } from "mongoose";

const serviceCategorySchema = new Schema({
    serviceType : {
        type : String,
        enum : ["IP service","OP service","Both"],
        required : true,
    },
    name : {
        type : String,
        required : true,
    },
    subCategories : {
        type : [String],
        required : true,
    },
    clinicId : {    
        type : mongoose.Schema.Types.ObjectId,
        ref : "Clinic",
        required : true,
    }
});

const ServiceCategory = mongoose.model("ServiceCategory", serviceCategorySchema);

export default ServiceCategory;
