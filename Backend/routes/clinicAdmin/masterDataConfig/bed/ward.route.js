import express from "express";
const wardRouter = express.Router();
import {
    addWard,
    allWards,
    editWard,
    getWard,
} from "../../../../controllers/clinicAdmin/masterDataConfig/bed/ward.controller.js";
import { authenticateUser } from "../../../../middlewares/authMiddleware.js";

wardRouter.post("/add-ward", authenticateUser, addWard);
wardRouter.get("/get-ward/:id", authenticateUser, getWard);
wardRouter.get("/all-wards",authenticateUser,allWards)
wardRouter.put("/edit-ward/:id",authenticateUser,editWard)
export default wardRouter;
