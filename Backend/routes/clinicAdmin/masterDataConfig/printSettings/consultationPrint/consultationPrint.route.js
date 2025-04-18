import express from "express"
import { authenticateUser,authorizeRoles } from "../../../../../middlewares/authMiddleware.js";
import { createDefaultPrintSettings, getPrintSettings, updateBannerSettings, updateBasicSettings } from "../../../../../controllers/clinicAdmin/masterDataConfig/printSettings/consultationPrint/consultationPrint.controller.js";
import upload from "../../../../../middlewares/multer/bill/multerConsultation.js";

const consultationPrintRouter = express.Router();

// Add consultation print settings (Handles text & optional images)
consultationPrintRouter.post(
    "/add-consultation-print",
    authenticateUser,
    upload.fields([{ name: "headerImage", maxCount: 1 }, { name: "footerImage", maxCount: 1 }]),
    createDefaultPrintSettings
);

consultationPrintRouter.get("/get-consultation-print", authenticateUser, getPrintSettings);

consultationPrintRouter.put("/edit-basic-settings", authenticateUser, updateBasicSettings);

consultationPrintRouter.put(
    "/edit-banner-settings",
    authenticateUser,
    upload.fields([{ name: "headerImage", maxCount: 1 }, { name: "footerImage", maxCount: 1 }]),
    updateBannerSettings
);



export default consultationPrintRouter;