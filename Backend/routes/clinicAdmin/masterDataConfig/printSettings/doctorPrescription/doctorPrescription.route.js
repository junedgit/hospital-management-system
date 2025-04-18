import express from "express"
import { authenticateUser,authorizeRoles } from "../../../../../middlewares/authMiddleware.js";
import { addSignature, createDefaultPrintSettings, editSignature, getPrintSettings, updateBannerSettings, updateBasicSettings } from "../../../../../controllers/clinicAdmin/masterDataConfig/printSettings/doctorPrescription/doctorPrescription.controller.js";
import upload from "../../../../../middlewares/multer/bill/multerPrescription.js";

const doctorPrescriptionRouter = express.Router();

// Add consultation print settings (Handles text & optional images)
doctorPrescriptionRouter.post(
    "/add-prescription-print",
    authenticateUser,
    upload.fields([{ name: "headerImage", maxCount: 1 }, { name: "footerImage", maxCount: 1 }]),
    createDefaultPrintSettings
);

doctorPrescriptionRouter.get("/get-prescription-print", authenticateUser, getPrintSettings);

doctorPrescriptionRouter.put("/edit-basic-settings", authenticateUser, updateBasicSettings);

doctorPrescriptionRouter.put(
    "/edit-banner-settings",
    authenticateUser,
    upload.fields([{ name: "headerImage", maxCount: 1 }, { name: "footerImage", maxCount: 1 }]),
    updateBannerSettings
);

doctorPrescriptionRouter.put("/add-signature", 
    authenticateUser, 
    upload.single("signatureImage"), 
    addSignature);

doctorPrescriptionRouter.put("/edit-signature/:signatureId", 
    authenticateUser, 
    upload.single("signatureImage"), 
    editSignature);

export default doctorPrescriptionRouter;