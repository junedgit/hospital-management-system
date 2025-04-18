import express from "express";
import {
    addSupplier,
    allSuppliers,
    editSupplier,
    getSupplier,
} from "../../../controllers/inventory/supplier_data/supplier.controller.js";
import {
    authenticateUser,
    authorizeRoles,
} from "../../../middlewares/authMiddleware.js";

const supplierRouter = express.Router();

supplierRouter.post(
    "/add-supplier",
    authenticateUser,
    authorizeRoles(),
    addSupplier
);
supplierRouter.put(
    "/edit-supplier/:id",
    authenticateUser,
    authorizeRoles(),
    editSupplier
);
supplierRouter.get(
    "/get-supplier/:id",
    authenticateUser,
    authorizeRoles(),
    getSupplier
);
supplierRouter.get(
    "/all-suppliers",
    authenticateUser,
    authorizeRoles(),
    allSuppliers
);

export default supplierRouter;
