import express from "express";
import { authenticateUser, authorizeRoles } from "../../../middlewares/authMiddleware.js";
import { admitPatient, searchBeds,allAdmittedPatients,getAdmittedPatientByMRN ,dischargePatient} from "../../../controllers/reception/patient_master/patientAdmit.controller.js";

const patientAdmitRouter = express.Router();

patientAdmitRouter.post("/admit-patient/:patientId",authenticateUser,authorizeRoles("Receptionist"),admitPatient )
patientAdmitRouter.get("/search-beds",authenticateUser,authorizeRoles("Receptionist"),searchBeds)
patientAdmitRouter.get("/admitted-patients",authenticateUser,authorizeRoles("Receptionist"),allAdmittedPatients)
patientAdmitRouter.get("/admitted-patient-by-mrn",authenticateUser,authorizeRoles("Receptionist"),getAdmittedPatientByMRN)
patientAdmitRouter.delete("/discharge-patient/:admissionId",authenticateUser,authorizeRoles("Receptionist"),dischargePatient)

export  default patientAdmitRouter