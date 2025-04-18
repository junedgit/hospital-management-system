import mongoose from "mongoose";
import { Schema } from "mongoose";  

const tariffCategorySchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    description : {
        type : String,
    },
    status : {
        type : String,
        enum : ["Active","Inactive"],
        required : true,
    },
    clinicId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Clinic",
        required: true,
    },
}); 

const TariffCategory = mongoose.model("TariffCategory", tariffCategorySchema);

export default TariffCategory;