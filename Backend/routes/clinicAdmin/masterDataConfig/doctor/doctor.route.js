import express from "express";
import { authenticateUser } from "../../../../middlewares/authMiddleware.js";
import {
    addDoctor,
    allDoctors,
    editDoctor,
    getDoctor,
} from "../../../../controllers/clinicAdmin/masterDataConfig/doctor/doctor.controller.js";

const doctorRouter = express.Router();

doctorRouter.post("/add-doctor", authenticateUser,  addDoctor);
doctorRouter.put("/edit-doctor/:id", authenticateUser, editDoctor);
doctorRouter.get("/all-doctors", authenticateUser, allDoctors);
doctorRouter.get("/get-doctor/:id", authenticateUser, getDoctor);

export default doctorRouter;
