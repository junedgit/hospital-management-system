import express from "express"

import { addTemplate, deleteTemplate, getTemplateById, getTemplates, updateTemplate } from "../../../../controllers/clinicAdmin/masterDataConfig/template/template.controller.js";
import { authenticateUser } from "../../../../middlewares/authMiddleware.js";
import { validateTemplateFields } from "../../../../middlewares/templateMiddleware.js"

const templateRouter = express.Router();

templateRouter.post("/add-template", authenticateUser, validateTemplateFields, addTemplate);
templateRouter.get("/all-templates", authenticateUser, getTemplates);
templateRouter.get("/get-template/:id", authenticateUser, getTemplateById);
templateRouter.put("/edit-template/:id", authenticateUser, updateTemplate);
templateRouter.delete("/delete-template/:id", authenticateUser, deleteTemplate);

export default templateRouter