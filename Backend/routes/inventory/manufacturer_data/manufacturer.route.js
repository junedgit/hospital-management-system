import express from "express";
import {
    addManufacturer,
    allManufacturers,
    editManufacturer,
    getManufacturer,
} from "../../../controllers/inventory/manufacturer_data/manufacturer.controller.js";
import {
    authenticateUser,
    authorizeRoles,
} from "../../../middlewares/authMiddleware.js";
const manufacturerRouter = express.Router();

manufacturerRouter.post(
    "/add-manufacturer",
    authenticateUser,
    authorizeRoles(),
    addManufacturer
);
manufacturerRouter.put(
    "/edit-manufacturer/:id",
    authenticateUser,
    authorizeRoles(),
    editManufacturer
);
manufacturerRouter.get(
    "/get-manufacturer/:id",
    authenticateUser,
    authorizeRoles(),
    getManufacturer
);
manufacturerRouter.get(
    "/all-manufacturers",
    authenticateUser,
    authorizeRoles(),
    allManufacturers
);

export default manufacturerRouter;
