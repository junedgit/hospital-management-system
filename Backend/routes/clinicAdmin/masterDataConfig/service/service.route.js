import express from "express";
import {
    addServiceCategory,
    editServiceCategory,
    getServiceCategories,
    deleteServiceCategory,
} from "../../../../controllers/clinicAdmin/masterDataConfig/service/serviceCategory.controller.js"
// from "../controllers/clinicAdmin/masterDataConfig/serviceCategory.controller.js";
import {
    addService,
    getServices,
    editService,
    deleteService,
} from "../../../../controllers/clinicAdmin/masterDataConfig/service/service.controller.js";
import { authenticateUser } from "../../../../middlewares/authMiddleware.js";

const serviceRouter = express.Router();

//service-category apis
serviceRouter.post(
    "/add-service-category",
    authenticateUser,
    addServiceCategory
);
//yet to check the edit route after services are added
serviceRouter.patch(
    "/edit-service-category/:id",
    authenticateUser,
    editServiceCategory
);
serviceRouter.get("/all-categories", authenticateUser, getServiceCategories);
serviceRouter.delete(
    "/delete-category/:id",
    authenticateUser,
    deleteServiceCategory
);

//service apis
serviceRouter.post("/add-service", authenticateUser, addService);
serviceRouter.patch("/edit-service/:id", authenticateUser, editService);
serviceRouter.get("/all-services", authenticateUser, getServices);
serviceRouter.delete("/delete-service/:id", authenticateUser, deleteService);

export default serviceRouter;
