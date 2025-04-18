import Manufacturer from "../../../models/inventory/manufacturer_data/manufacturer.model.js";

const addManufacturer = async (req, res) => {
    try {
        const { brandName, address, city, state, pinCode } = req.body;
        const clinicId = req.user.id; // Assuming user is authenticated and has a clinic ID

        // Check for required fields
        if (!brandName || !address) {
            return res.status(400).json({
                success: false,
                message: "Brand Name and Address are required."
            });
        }
        if (!clinicId) {
            return res.status(403).json({
                success: false,
                message: "Unauthorized: Clinic ID not found in user data."
            });
        }

        // Check if manufacturer already exists for this clinic
        const existingManufacturer = await Manufacturer.findOne({ brandName, clinicId ,address});

        if (existingManufacturer) {
            return res.status(409).json({
                success: false,
                message: "Manufacturer with this Brand Name already exists for this clinic."
            });
        }

        // Create and save the new manufacturer
        const newManufacturer = await Manufacturer.create({
            brandName,
            address,
            city,
            state,
            pinCode,
            clinicId
        });

        res.status(201).json({
            success: true,
            message: "Manufacturer added successfully!",
            data: newManufacturer,
        });
    } catch (error) {
        console.error("Error adding manufacturer:", error.message);

        const statusCode = error.name === "ValidationError" ? 400 : 500;
        res.status(statusCode).json({
            success: false,
            message: "Error adding manufacturer",
            error: error.message,
        });
    }
};


const editManufacturer = async (req, res) => {
    try {
        const { id } = req.params;
        const { brandName, address, city, state, pinCode } = req.body;
        // if (!id.match(/^[0-9a-fA-F]{24}$/)) {
        //     return res
        //         .status(400)
        //         .json({ success: false, message: "Invalid Bed ID format" });
        // }

        // Find and update manufacturer
        const updatedManufacturer = await Manufacturer.findByIdAndUpdate(
            id,
            { brandName, address, city, state, pinCode },
            { new: true, runValidators: true } // Return updated doc & validate
        );

        if (!updatedManufacturer) {
            return res.status(404).json({ message: "Manufacturer not found." });
        }

        res.status(200).json({ message: "Manufacturer updated successfully!", data: updatedManufacturer });
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};

const getManufacturer = async (req, res) => {
    try {
        const { id } = req.params;
        const manufacturer = await Manufacturer.findById(id);

        if (!manufacturer) {
            return res.status(404).json({ message: "Manufacturer not found." });
        }

        res.status(200).json({ data: manufacturer });
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};

const allManufacturers = async (req, res) => {
    try {
        const { brandName, city, state, page = 1, limit = 10 } = req.query;

        // Build filter object dynamically
        const clinicId = req.user.id
        let filter = {clinicId};
        if (brandName) filter.brandName = new RegExp(brandName, "i"); // Case-insensitive search
        if (city) filter.city = new RegExp(city, "i");
        if (state) filter.state = new RegExp(state, "i");

        const manufacturers = await Manufacturer.find(filter)
            .limit(parseInt(limit)) // Convert string to int
            .skip((parseInt(page) - 1) * parseInt(limit)) // Pagination logic
            .sort({ createdAt: -1 }); // Sort by latest

        const total = await Manufacturer.countDocuments(filter);

        res.status(200).json({
            total,
            page: parseInt(page),
            totalPages: Math.ceil(total / limit),
            data: manufacturers,
        });
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};

const editSupplier = async (req, res) => {
    try {
        const { id } = req.params;
        const updateData = req.body;

        // Validate ObjectId format
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ success: false, message: "Invalid Supplier ID format." });
        }

        // Check if supplier exists
        const existingSupplier = await Supplier.findById(id);
        if (!existingSupplier) {
            return res.status(404).json({ success: false, message: "Supplier not found." });
        }

        // Update supplier
        const updatedSupplier = await Supplier.findByIdAndUpdate(id, updateData, {
            new: true, // Return updated document
            runValidators: true, // Ensure validation rules are applied
        });

        res.status(200).json({ success: true, message: "Supplier updated successfully", data: updatedSupplier });
    } catch (error) {
        console.error("Error updating supplier:", error.message);
        res.status(500).json({ success: false, message: "Error updating supplier", error: error.message });
    }
};

export { addManufacturer ,editManufacturer, getManufacturer,allManufacturers };
