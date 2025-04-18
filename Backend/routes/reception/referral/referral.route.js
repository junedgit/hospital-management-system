import express from "express"
import { addReferral, allReferrals, editReferral, getReferral } from "../../../controllers/reception/referral/referral.controller.js"
import { authenticateUser, authorizeRoles } from "../../../middlewares/authMiddleware.js"
const referralRouter= express.Router()

referralRouter.post("/add-referral",authenticateUser,authorizeRoles(),addReferral);
referralRouter.get("/get-referral/:id",authenticateUser,authorizeRoles(),getReferral)
referralRouter.get("/all-referrals",authenticateUser,authorizeRoles(),allReferrals)
referralRouter.put("/edit-referral/:id",authenticateUser,authorizeRoles(),editReferral)

export default referralRouter