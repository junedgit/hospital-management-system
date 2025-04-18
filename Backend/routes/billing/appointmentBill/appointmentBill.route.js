import express from "express"

import { authenticateUser, authorizeRoles } from "../../../middlewares/authMiddleware.js";
import { generateAppointmentInvoice } from "../../../controllers/billing/appointmentBill/appointmentBill.controller.js";

const appointmentBillRouter = express.Router();

appointmentBillRouter.post("/generate-appointment-bill/:appointmentId", authenticateUser, generateAppointmentInvoice);


export default appointmentBillRouter