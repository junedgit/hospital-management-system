import express from "express";
import {
    addBed,
    allBeds,
    editBed,
    getBed,
} from "../../../../controllers/clinicAdmin/masterDataConfig/bed/bed.controller.js";
import { authenticateUser,authorizeRoles } from "../../../../middlewares/authMiddleware.js";

const bedRouter = express.Router();

bedRouter.post("/add-bed", authenticateUser,authorizeRoles(),addBed);
bedRouter.get("/all-beds", authenticateUser,authorizeRoles() ,allBeds);
bedRouter.get("/get-bed/:id", authenticateUser, authorizeRoles(),getBed);
bedRouter.put("/edit-bed/:id", authenticateUser, authorizeRoles(),editBed);
export default bedRouter;
