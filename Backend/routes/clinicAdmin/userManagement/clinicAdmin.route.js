import express from "express";
import {
    addClinicUser,
    listClinicUsers,
    // loginClinicAdmin,
    editClinicUser,
    getClinicUser,
} from "../../../controllers/clinicAdmin/userManagement/clinicAdmin.controller.js";
import { authenticateUser, authorizeRoles } from "../../../middlewares/authMiddleware.js";
const clinicAdminRouter = express.Router();

clinicAdminRouter.post("/add-clinicUser", authenticateUser,authorizeRoles("clinicAdmin") ,addClinicUser);
// clinicAdminRouter.post("/login", loginClinicAdmin);
clinicAdminRouter.get("/all-clinicUsers", authenticateUser, listClinicUsers);
clinicAdminRouter.put("/edit-clinicUser/:id", authenticateUser, editClinicUser);
clinicAdminRouter.get("/get-ClinicUser/:id",authenticateUser,getClinicUser)
export default clinicAdminRouter;
