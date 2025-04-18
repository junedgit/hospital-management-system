import express from "express"

import { bookAppointment,getDoctorsByDepartment,rescheduleAppointment,cancelAppointment } from "../../../controllers/reception/patient_master/patientAppointment.controller.js"
import { authenticateUser, authorizeRoles } from "../../../middlewares/authMiddleware.js"
const patientAppointmentRouter = express.Router()

patientAppointmentRouter.get("/get-doctors", authenticateUser, authorizeRoles("Receptionist"), getDoctorsByDepartment)
patientAppointmentRouter.post("/book-appointment", authenticateUser, authorizeRoles("Receptionist"), bookAppointment)
patientAppointmentRouter.put("/reschedule-appointment/:appointmentId", authenticateUser, authorizeRoles("Receptionist"), rescheduleAppointment)
patientAppointmentRouter.delete("/cancel-appointment/:appointmentId", authenticateUser, authorizeRoles("Receptionist"), cancelAppointment)

export default patientAppointmentRouter;