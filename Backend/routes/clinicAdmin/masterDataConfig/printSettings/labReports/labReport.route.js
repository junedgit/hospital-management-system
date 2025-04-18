import express from "express"
import { authenticateUser,authorizeRoles } from "../../../../../middlewares/authMiddleware.js";
import { addSignature, createDefaultPrintSettings, editSignature, getPrintSettings, updateBannerSettings, updateBasicSettings } from "../../../../../controllers/clinicAdmin/masterDataConfig/printSettings/labReports/labReport.controller.js";
import upload from "../../../../../middlewares/multer/bill/multerLabReport.js";

const labReportRouter = express.Router();

// Add consultation print settings (Handles text & optional images)
labReportRouter.post(
    "/add-lab-report",
    authenticateUser,
    upload.fields([{ name: "headerImage", maxCount: 1 }, { name: "footerImage", maxCount: 1 }]),
    createDefaultPrintSettings
);

labReportRouter.get("/get-lab-report", authenticateUser, getPrintSettings);

labReportRouter.put("/edit-basic-settings", authenticateUser, updateBasicSettings);

labReportRouter.put(
    "/edit-banner-settings",
    authenticateUser,
    upload.fields([{ name: "headerImage", maxCount: 1 }, { name: "footerImage", maxCount: 1 }]),
    updateBannerSettings
);

labReportRouter.put("/add-signature", 
    authenticateUser, 
    upload.single("signatureImage"), 
    addSignature);

labReportRouter.put("/edit-signature/:signatureId", 
    authenticateUser, 
    upload.single("signatureImage"), 
    editSignature);

export default labReportRouter;