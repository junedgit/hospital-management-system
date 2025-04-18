import express from "express";
import { authenticateUser } from "../../../../middlewares/authMiddleware.js";
import { addRoom, allRooms, editRoom, getRoom } from "../../../../controllers/clinicAdmin/masterDataConfig/bed/room.controller.js";
const roomRouter= express.Router();


roomRouter.post("/add-room", authenticateUser,addRoom)
roomRouter.get("/all-rooms", authenticateUser,allRooms)
roomRouter.get("/get-room/:id",authenticateUser,getRoom)
roomRouter.put("/edit-room/:id",authenticateUser,editRoom)
export default roomRouter;