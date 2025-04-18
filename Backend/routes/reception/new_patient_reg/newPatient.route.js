import express from "express";
import upload from "../../../middlewares/multer.js";
import { authenticateUser,authorizeRoles } from "../../../middlewares/authMiddleware.js";
import { addPatient, searchReferral } from "../../../controllers/reception/new_patient_reg/newPatientReg.controller.js";
const newPatientRouter= express.Router();

newPatientRouter.post("/add-patient",authenticateUser,authorizeRoles("Receptionist"),upload.single("image"),addPatient)
newPatientRouter.get("/search-referral",authenticateUser,authorizeRoles(),searchReferral)

export default newPatientRouter