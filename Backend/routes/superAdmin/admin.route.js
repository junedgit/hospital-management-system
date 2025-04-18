import express from "express";
import {
    loginUser,
    signup,
    passwordChange,
} from "../../controllers/superAdmin/admin.controller.js";
const adminRouter = express.Router();

adminRouter.post("/add-admin", signup);
adminRouter.post("/login-admin", loginUser);
adminRouter.post("/passwordChange-admin", passwordChange);

export default adminRouter;
