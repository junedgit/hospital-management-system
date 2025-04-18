import Ward from "../../../../models/clinicAdmin/masterDataConfig/bed/ward.model.js";

const addWard = async (req, res) => {
    try {
        const { code, name } = req.body;
        if (!code || !name) {
            return res.status(400).json({
                success: false,
                message: "Both code and name are required",
            });
        }
        const clinicId = req.user.id;
        if (!clinicId) {
            return res.status(403).json({
                success: false,
                message: "Unauthorized: Clinic ID not found in user data.",
            });
        }
        const existingWard = await Ward.findOne({
            code,
            name,
            clinicId,
        });
        if (existingWard) {
            return res.status(400).json({
                success: false,
                message: "Ward with these details already exists",
            });
        }

        const newWard = new Ward({
            code,
            name,
            clinicId,
        });
        await newWard.save();
        return res.status(201).json({
            success: true,
            message: "Ward added successfully",
            ward: newWard,
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
const allWards = async (req, res) => {
    try {
        const { page = 1, limit = 10, code, name } = req.query;
        const clinicId = req.user.id;
        if (!clinicId) {
            return res.status(403).json({
                success: false,
                message: "Unauthorized: Clinic ID not found in user data.",
            });
        }

        // Creating a dynamic filter object
        let filter = { clinicId };
        if (code) filter.code = code;
        if (name) filter.name = { $regex: new RegExp(name, "i") }; // Case-insensitive search
        // if (clinicId) filter.clinicId = clinicId;

        // Fetching filtered wards with pagination
        const wards = await Ward.find(filter)
            .sort({ createdAt: -1 }) // Sorting by newest first
            .skip((page - 1) * limit)
            .limit(Number(limit));

        // Count total documents for pagination
        const totalWards = await Ward.countDocuments(filter);

        return res.status(200).json({
            success: true,
            message: "Wards fetched successfully",
            totalWards,
            currentPage: Number(page),
            totalPages: Math.ceil(totalWards / limit),
            wards,
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
const getWard = async (req, res) => {
    try {
        const { id } = req.params;
        const clinicId = req.user.id;

        if (!id.match(/^[0-9a-fA-F]{24}$/)) {
            return res
                .status(400)
                .json({ success: false, message: "Invalid Ward ID format" });
        }
        const ward = await Ward.findOne({
            _id: id,
            clinicId,
        });

        if (!ward) {
            return res
                .status(404)
                .json({ success: false, message: "Ward not found" });
        }

        return res
            .status(200)
            .json({
                success: true,
                message: "Ward retrieved successfully",
                ward,
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

const editWard = async (req, res) => {
    try {
        const { id } = req.params; // Ward ID from URL
        const { code, name } = req.body; // Updated fields
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
                .json({ success: false, message: "Invalid Ward ID format" });
        }

        // Find the existing ward
        const existingWard = await Ward.findById(id);
        if (!existingWard) {
            return res
                .status(404)
                .json({ success: false, message: "Ward not found" });
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

        // Check if a ward with the same name and clinicId already exists
        if (name && clinicId) {
            const duplicateWard = await Ward.findOne({
                name,
                clinicId,
                _id: { $ne: id },
            });
            if (duplicateWard) {
                return res
                    .status(400)
                    .json({
                        success: false,
                        message:
                            "Ward with this name already exists in the clinic",
                    });
            }
        }

        // Update ward fields dynamically
        const updatedWard = await Ward.findByIdAndUpdate(
            id,
            { $set: { code, name } },
            { new: true, runValidators: true }
        );

        return res.status(200).json({
            success: true,
            message: "Ward updated successfully",
            ward: updatedWard,
        });
    } catch (error) {
        console.error("Error updating ward:", error);
        return res.status(500).json({
            success: false,
            message: "Internal server error",
            error: error.message,
        });
    }
};

export { addWard, allWards, getWard, editWard };
