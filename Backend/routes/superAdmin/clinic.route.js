import express from "express";
import {
    addClinic,
    deleteClinic,
    getClinic,
    listClinic,
    deleteBackupClinic,
    updateClinic,
    setupCounter,
} from "../../controllers/superAdmin/clinic.controller.js";
import {
    authenticateUser,
    authorizeRoles,
} from "../../middlewares/authMiddleware.js";
const clinicRouter = express.Router();

clinicRouter.post("/add-clinic", authenticateUser, addClinic);
clinicRouter.get("/list-clinic", authenticateUser, listClinic);
clinicRouter.get("/get-clinic", authenticateUser, getClinic);
clinicRouter.patch("/delete-clinic", authenticateUser, deleteClinic);
clinicRouter.post("/deleteBackup-clinic", authenticateUser, deleteBackupClinic);
clinicRouter.post("/update-clinic", authenticateUser, updateClinic);
clinicRouter.post("/initialize-counter", authenticateUser, setupCounter);
export default clinicRouter;
