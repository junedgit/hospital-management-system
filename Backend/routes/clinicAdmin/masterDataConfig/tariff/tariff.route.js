import express from "express"
import { addTariffClass, deleteTariffClass, getAllTariffClasses, getTariffClassById, updateTariffClass } from "../../../../controllers/clinicAdmin/masterDataConfig/tariff/tariffClass.controller.js";
import { authenticateUser } from "../../../../middlewares/authMiddleware.js";
import { addTariffCategory, deleteTariffCategory, getTariffCategories, getTariffCategoryById, updateTariffCategory } from "../../../../controllers/clinicAdmin/masterDataConfig/tariff/tariffCategory.controller.js";
import { addTariffRate, deleteTariffRate, getTariffRateById, getTariffRates, updateTariffRate } from "../../../../controllers/clinicAdmin/masterDataConfig/tariff/tariffRate.controller.js";

const tariffRouter = express.Router()

//For tariff class
tariffRouter.post("/add-tariff-class", authenticateUser, addTariffClass) 
tariffRouter.get("/all-tariff-classes", authenticateUser, getAllTariffClasses)
tariffRouter.get("/get-tariff-class/:id", authenticateUser, getTariffClassById)
tariffRouter.put("/edit-tariff-class/:id", authenticateUser, updateTariffClass)
tariffRouter.delete("/delete-tariff-class/:id", authenticateUser, deleteTariffClass)

//For tariff category
tariffRouter.post("/add-tariff-category", authenticateUser, addTariffCategory)
tariffRouter.get("/all-tariff-categories", authenticateUser, getTariffCategories)    
tariffRouter.get("/get-tariff-category/:id", authenticateUser, getTariffCategoryById)
tariffRouter.put("/edit-tariff-category/:id", authenticateUser, updateTariffCategory)
tariffRouter.delete("/delete-tariff-category/:id", authenticateUser, deleteTariffCategory)

//For tariff rate
tariffRouter.post("/add-tariff-rate", authenticateUser, addTariffRate)
tariffRouter.get("/all-tariff-rates", authenticateUser, getTariffRates)
tariffRouter.get("/get-tariff-rate/:id", authenticateUser, getTariffRateById)
tariffRouter.put("/edit-tariff-rate/:id", authenticateUser, updateTariffRate)   
tariffRouter.delete("/delete-tariff-rate/:id", authenticateUser, deleteTariffRate)

export default tariffRouter;