import Room from "../../../../models/clinicAdmin/masterDataConfig/bed/room.model.js";
import Ward from "../../../../models/clinicAdmin/masterDataConfig/bed/ward.model.js";

const addRoom = async (req, res) => {
    try {
        const { code, number, ward } = req.body;
        const clinicId = req.user.id; // Assuming clinicId comes from authenticated user

        if (!code || !number || !ward || !clinicId) {
            return res.status(400).json({
                success: false,
                message: "Code, number, ward, and clinicId are required",
            });
        }
        const existingWard = await Ward.findOne({ name: ward });
        if (!existingWard) {
            return res
                .status(400)
                .json({
                    success: false,
                    message:
                        "Ward doesn't exist,First create a ward with this name then you can add room",
                });
        }

        // Check if the room already exists in the same ward and clinic
        const existingRoom = await Room.findOne({
            code,
            number,
            ward,
            clinicId,
        });

        if (existingRoom) {
            return res.status(400).json({
                success: false,
                message:
                    "Room with this code already exists in the same ward and clinic",
            });
        }

        const newRoom = new Room({ code, number, ward, clinicId });
        await newRoom.save();

        return res.status(201).json({
            success: true,
            message: "Room added successfully",
            room: newRoom,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Internal server error",
            error: error.message,
        });
    }
};

const allRooms = async (req, res) => {
    try {
        const { page = 1, limit = 10, code, number, ward } = req.query;
        const clinicId = req.user.id;
        let filter = { clinicId };
        if (code) filter.code = code;
        if (number) filter.number = number;
        if (ward) filter.ward = { $regex: new RegExp(ward, "i") }; // Case-insensitive search
        // if (clinicId) filter.clinicId = clinicId;

        const rooms = await Room.find(filter)
            .sort({ createdAt: -1 })
            .skip((page - 1) * limit)
            .limit(Number(limit));

        const totalRooms = await Room.countDocuments(filter);

        return res.status(200).json({
            success: true,
            message: "Rooms fetched successfully",
            totalRooms,
            currentPage: Number(page),
            totalPages: Math.ceil(totalRooms / limit),
            rooms,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Internal server error",
            error: error.message,
        });
    }
};

const getRoom = async (req, res) => {
    try {
        const { id } = req.params;

        if (!id.match(/^[0-9a-fA-F]{24}$/)) {
            return res
                .status(400)
                .json({ success: false, message: "Invalid Room ID format" });
        }

        const room = await Room.findById(id);

        if (!room) {
            return res
                .status(404)
                .json({ success: false, message: "Room not found" });
        }

        return res
            .status(200)
            .json({
                success: true,
                message: "Room retrieved successfully",
                room,
            });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Internal server error",
            error: error.message,
        });
    }
};

const editRoom = async (req, res) => {
    try {
        const { id } = req.params; // Room ID from URL
        const { code, number, ward } = req.body; // Updated fields
        const clinicId = req.user.id;

        if (!clinicId) {
            return res.status(403).json({
                success: false,
                message: "Unauthorized: Clinic ID not found in user data.",
            });
        }

        // Validate ID format
        if (!id.match(/^[0-9a-fA-F]{24}$/)) {
            return res
                .status(400)
                .json({ success: false, message: "Invalid Room ID format" });
        }

        // Find the existing room
        const existingRoom = await Room.findById(id);
        if (!existingRoom) {
            return res
                .status(404)
                .json({ success: false, message: "Room not found" });
        }

        // Check if clinic ID exists (if provided)
        // if (clinicId) {
        //     const existingClinic = await Clinic.findById(clinicId);
        //     if (!existingClinic) {
        //         return res
        //             .status(404)
        //             .json({ success: false, message: "Clinic not found" });
        //     }
        // }

        // Check if the ward exists (if updating the ward)
        if (ward) {
            const existingWard = await Ward.findOne({
                name: ward,
                clinicId
            });
            if (!existingWard) {
                return res
                    .status(404)
                    .json({
                        success: false,
                        message: "Ward not found in the clinic",
                    });
            }
        }

        // Update room fields dynamically
        const updatedRoom = await Room.findByIdAndUpdate(
            id,
            { $set: { code, number, ward, clinicId } },
            { new: true, runValidators: true }
        );

        return res.status(200).json({
            success: true,
            message: "Room updated successfully",
            room: updatedRoom,
        });
    } catch (error) {
        console.error("Error updating room:", error);
        return res.status(500).json({
            success: false,
            message: "Internal server error",
            error: error.message,
        });
    }
};

export { addRoom, allRooms, getRoom ,editRoom};
