import Bed from "../../../../models/clinicAdmin/masterDataConfig/bed/bed.model.js";
import Ward from "../../../../models/clinicAdmin/masterDataConfig/bed/ward.model.js";
import Room from "../../../../models/clinicAdmin/masterDataConfig/bed/room.model.js";
const addBed = async (req, res) => {
    try {
        const { wardName, roomNumber, bedNumber, bedCharges } = req.body;

        // Check if all fields are provided
        if (!wardName || !roomNumber || !bedNumber || !bedCharges) {
            return res
                .status(400)
                .json({ success: false, message: "All fields are required" });
        }
        const clinicId = req.user.id;
        if (!clinicId) {
            return res.status(403).json({
                success: false,
                message: "Unauthorized: Clinic ID not found in user data.",
            });
        }

        const existingWard = await Ward.findOne({ name: wardName, clinicId });
        if (!existingWard) {
            return res.status(404).json({
                success: false,
                message: "Ward does not exist. Please create the ward first.",
            });
        }

        // Check if the room exists in the ward
        const existingRoom = await Room.findOne({
            number: roomNumber,
            // ward: existingWard._id,
            clinicId,
        });

        if (!existingRoom) {
            return res.status(404).json({
                success: false,
                message:
                    "Room does not exist in the specified ward. Please create the room first.",
            });
        }
        // Check if the bed already exists
        const existingBed = await Bed.findOne({
            wardName,
            roomNumber,
            bedNumber,
            bedCharges,
            clinicId,
        });

        if (existingBed) {
            return res.status(400).json({
                success: false,
                message: "Bed with the same details already exists",
            });
        }

        // Create new bed entry
        const newBed = new Bed({
            wardName,
            roomNumber,
            bedNumber,
            bedCharges,
            clinicId,
        });

        // Save bed to the database
        await newBed.save();

        return res.status(201).json({
            success: true,
            message: "Bed added successfully",
            bed: newBed,
        });
    } catch (error) {
        console.error("Error adding bed:", error);
        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
            error: error.message,
        });
    }
};
const allBeds = async (req, res) => {
    try {
        const { wardName, roomNumber, page, limit } = req.query;

        if (!req.user.id) {
            return res.status(403).json({
                success: false,
                message: "Unauthorized: Clinic ID not found in user data.",
            });
        }
        // Create a filter object
        let filter = { clinicId: req.user.id };

        if (wardName) filter.wardName = wardName;
        if (roomNumber) filter.roomNumber = Number(roomNumber);
        // if (minCharges || maxCharges) {
        //     filter.bedCharges = {};
        //     if (minCharges) filter.bedCharges.$gte = Number(minCharges);
        //     if (maxCharges) filter.bedCharges.$lte = Number(maxCharges);
        // }

        // Convert page and limit to numbers
        const pageNumber = Number(page) || 1;
        const limitNumber = Number(limit) || 10;
        const skip = (pageNumber - 1) * limitNumber;

        // Fetch beds with filtering, pagination, and sorting (latest first)
        const beds = await Bed.find(filter)
            .skip(skip)
            .limit(limitNumber)
            .sort({ createdAt: -1 });

        // Get total count for pagination info
        const totalBeds = await Bed.countDocuments(filter);

        return res.status(200).json({
            success: true,
            totalBeds,
            totalPages: Math.ceil(totalBeds / limitNumber),
            currentPage: pageNumber,
            beds,
        });
    } catch (error) {
        console.error("Error fetching beds:", error);
        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
            error: error.message,
        });
    }
};

const getBed = async (req, res) => {
    try {
        const { id } = req.params;

        if (!id) {
            return res
                .status(400)
                .json({ success: false, message: "id is required" });
        }

        const bed = await Bed.findOne({ _id: id });

        if (!bed) {
            return res.status(404).json({
                success: false,
                message: "No bed exists at this id, provide a correct id",
            });
        }

        return res
            .status(200)
            .json({ success: true, message: "Bed found", bed });
    } catch (error) {
        console.error(error);
        return res
            .status(500)
            .json({ success: false, message: "Internal server error" });
    }
};
const editBed = async (req, res) => {
    try {
        const { id } = req.params;
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
                .json({ success: false, message: "Invalid Bed ID format" });
        }

        const { wardName, roomNumber, bedNumber, bedCharges } = req.body;
        if (wardName) {
            const existingWard = await Ward.findOne({
                name: wardName,
                clinicId,
            });
            if (!existingWard) {
                return res.status(404).json({
                    success: false,
                    message:
                        "Ward does not exist. Please create the ward first.",
                });
            }
        }
        if (roomNumber) {
            // Check if the room exists in the ward
            const existingRoom = await Room.findOne({
                number: roomNumber,
                // ward: existingWard._id,
                clinicId,
            });

            if (!existingRoom) {
                return res.status(404).json({
                    success: false,
                    message:
                        "Room does not exist in the specified ward. Please create the room first.",
                });
            }
        }
        const update = {};
        if (wardName) update.wardName = wardName;
        if (roomNumber) update.roomNumber = roomNumber;
        if (bedNumber) update.bedNumber = bedNumber;
        if (bedCharges) update.bedCharges = bedCharges;

        const bed = await Bed.findByIdAndUpdate(
            { _id: id, clinicId },
            { $set: update },
            { new: true, runValidators: true }
        );

        if (!bed) {
            return res.status(404).json({
                success: false,
                message: "Bed was not found at this ID",
            });
        }

        return res.status(200).json({
            success: true,
            message: "Bed was successfully updated",
            bed, // Return the updated bed object
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
};

export { addBed, allBeds, getBed, editBed };
