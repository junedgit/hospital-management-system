import express from "express";
import { getOtherAppointments, getTodaysAppointments, saveAndPrint } from "../../../controllers/doctor/OPQueue/opQueue.controller.js";
import { authenticateUser, authorizeRoles } from "../../../middlewares/authMiddleware.js";

const opQueueRouter = express.Router();

opQueueRouter.get("/appointments-today", authenticateUser, getTodaysAppointments);
opQueueRouter.get("/appointments-future", authenticateUser, getOtherAppointments)
opQueueRouter.post("/save-and-print", authenticateUser, saveAndPrint);

export default opQueueRouter;