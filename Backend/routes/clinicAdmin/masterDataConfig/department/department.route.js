import express from "express";
const departmentRouter = express.Router();
import {
    addDepartment,
    editDepartment,
    getDepartments,
} from "../../../../controllers/clinicAdmin/masterDataConfig/department/department.controller.js"
// from "../controllers/clinicAdmin/masterDataConfig/department.controller.js";
import {
    authenticateUser,
    authorizeRoles,
} from "../../../../middlewares/authMiddleware.js";

//Actual routes : protected

// departmentRouter.post("/add-department",authenticateUser, authorizeRoles("clinicAdmin"), addDepartment);
// departmentRouter.put("/edit-department/:id", authenticateUser, authorizeRoles("clinicAdmin"), editDepartment);
// departmentRouter.get("/", authenticateUser, authorizeRoles("clinicAdmin"), getDepartments);

//Testing
departmentRouter.post("/add-department", authenticateUser, addDepartment);
departmentRouter.put("/edit-department/:id", authenticateUser, editDepartment);
departmentRouter.get("/", authenticateUser, getDepartments);

export default departmentRouter;
