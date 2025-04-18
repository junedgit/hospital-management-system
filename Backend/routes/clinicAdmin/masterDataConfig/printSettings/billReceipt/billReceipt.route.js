import express from "express"
import { authenticateUser,authorizeRoles } from "../../../../../middlewares/authMiddleware.js";
import { createDefaultPrintSettings, getPrintSettings, updateBannerSettings, updateBasicSettings } from "../../../../../controllers/clinicAdmin/masterDataConfig/printSettings/billReceipt/billReceipt.controller.js";
import upload from "../../../../../middlewares/multer/bill/multerBillReceipt.js";

const billReceiptRouter = express.Router();

billReceiptRouter.post("/add-bill-receipt", 
    authenticateUser, 
    upload.fields([{ name: "headerImage", maxCount: 1 }, { name: "footerImage", maxCount: 1 }]),
    createDefaultPrintSettings);

billReceiptRouter.get("/get-bill-receipt", authenticateUser, getPrintSettings);

billReceiptRouter.put("/edit-basic-settings", authenticateUser, updateBasicSettings);

billReceiptRouter.put("/edit-banner-settings", 
    authenticateUser,
    upload.fields([{ name: "headerImage", maxCount: 1 }, { name: "footerImage", maxCount: 1 }]), 
    updateBannerSettings);

export default billReceiptRouter;