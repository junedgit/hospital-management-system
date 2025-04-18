import mongoose, {Schema} from "mongoose";

const serviceSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    serviceCategory: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "ServiceCategory",
        required: true,
        validate: {
            validator: async function (categoryId) {
                const category = await mongoose.model("ServiceCategory").findById(categoryId);
                return !!category;
            },
            message: "Invalid service category. Category does not exist.",
        },
    },
    subCategory: {
        type: String,
        required: true,
        validate: {
            validator: async function (subCategory) {
                if (!this.serviceCategory) return true;
                const category = await mongoose.model("ServiceCategory").findById(this.serviceCategory);
                return category ? category.subCategories.includes(subCategory) : false;
            },
            message: "Invalid subcategory. Subcategory must belong to the selected service category.",
        },
    },
    serviceType: {
        type: String,
        enum: ["IP service", "OP service", "Both"],
        required: true,
    },
    clinicId: {    
        type: mongoose.Schema.Types.ObjectId,
        ref: "Clinic",
        required: true,
        index: true, // Indexing for faster queries
    },
    price : {
        type : Number,
        required : true,
    }
}, { timestamps: true });

// Prevent duplicate service names in the same clinic
serviceSchema.index({ name: 1, clinicId: 1 }, { unique: true });
const Service = mongoose.model("Service", serviceSchema);

export default Service;

