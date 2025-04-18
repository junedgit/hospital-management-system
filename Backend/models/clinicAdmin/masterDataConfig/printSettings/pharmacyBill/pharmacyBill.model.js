import mongoose from "mongoose";

const PharmacyBillSchema = new mongoose.Schema({
    basicSettings: {
        printEachDeptNewPage: { type: Boolean, default: false },
        linesPerPage: { type: Number, required: true, default: 20 },
        fontSize: { type: String, required: true, default: "12px" },
        spaceBetweenLines: { type: Number, required: true, default: 1 },
    },
    bannerHeading: {
        letterHeadSpace: { type: Number, required: true, default: 5 },
        headerBanner: {
            type: { type: String, enum: ["Text", "Image", "None"], default: "None" },
            text: { 
                type: String, 
                required: function () { return this.bannerHeading?.headerBanner?.type === "Text"; }, 
                default: "" 
            },
            imageUrl: { 
                type: String, 
                required: function () { return this.bannerHeading?.headerBanner?.type === "Image"; }, 
                default: "" 
            }
        },
        headingText: { 
            type: String, 
            required: function () { return this.bannerHeading?.headerBanner?.type === "Text"; }, 
            default: "" 
        },
        subHeadingText: { 
            type: String, 
            required: function () { return this.bannerHeading?.headerBanner?.type === "Text"; }, 
            default: "" 
        }
    },
    footerBanner: {
        footerSpaceForSignature: { type: Number, required: true, default: 20 },
        footerBanner: {
            type: { type: String, enum: ["Text", "Image", "None"], default: "None" },
            text: { 
                type: String, 
                required: function () { return this.footerBanner?.footerBanner?.type === "Text"; }, 
                default: "" 
            },
            imageUrl: { 
                type: String, 
                required: function () { return this.footerBanner?.footerBanner?.type === "Image"; }, 
                default: "" 
            }
        },
        headingText: { 
            type: String, 
            required: function () { return this.footerBanner?.footerBanner?.type === "Text"; }, 
            default: "" 
        },
        subHeadingText: { 
            type: String, 
            required: function () { return this.footerBanner?.footerBanner?.type === "Text"; }, 
            default: "" 
        }
    },
    clinicId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Clinic",
        required: true,
    }
});

const PharmacyBill = mongoose.model("PharmacyBill", PharmacyBillSchema);

export default PharmacyBill;
