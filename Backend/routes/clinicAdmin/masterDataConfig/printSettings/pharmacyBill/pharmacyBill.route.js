import express from "express"
import { authenticateUser,authorizeRoles } from "../../../../../middlewares/authMiddleware.js";
import { createDefaultPrintSettings, getPrintSettings, updateBannerSettings, updateBasicSettings } from "../../../../../controllers/clinicAdmin/masterDataConfig/printSettings/pharmacyBill/pharmacyBill.controller.js";
import upload from "../../../../../middlewares/multer/bill/multerPharmacy.js";

const pharmacyBillRouter = express.Router();

pharmacyBillRouter.post("/add-pharmacy-bill", 
    authenticateUser,
    upload.fields([{ name: "headerImage", maxCount: 1 }, { name: "footerImage", maxCount: 1 }]),
    createDefaultPrintSettings);

pharmacyBillRouter.get("/get-pharmacy-bill", authenticateUser, getPrintSettings);

pharmacyBillRouter.put("/edit-basic-settings", authenticateUser, updateBasicSettings);

pharmacyBillRouter.put("/edit-banner-settings",
    authenticateUser, 
    upload.fields([{ name: "headerImage", maxCount: 1 }, { name: "footerImage", maxCount: 1 }]),
    updateBannerSettings);

export default pharmacyBillRouter;