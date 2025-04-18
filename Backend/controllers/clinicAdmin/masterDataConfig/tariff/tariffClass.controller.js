import TariffClass from "../../../../models/clinicAdmin/masterDataConfig/tariff/tariffClass.model.js";

export const addTariffClass = async (req, res) => {
    try {
        if (!req.user || !req.user.id) {
            return res.status(401).json({ success: false, message: "Unauthorized" });
        }

        const tariffClass = new TariffClass({ ...req.body, clinicId: req.user.id });
        await tariffClass.save();

        res.status(201).json({
            success: true,
            message: "Tariff class created successfully",
            tariffClass,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Error creating tariff class",
        });
    }
};

export const getAllTariffClasses = async (req, res) => {
    try {
        if (!req.user || !req.user.id) {
            return res.status(401).json({ success: false, message: "Unauthorized" });
        }

        const tariffClasses = await TariffClass.find({ clinicId: req.user.id });

        res.status(200).json({
            success: true,
            tariffClasses,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Error fetching tariff classes",
        });
    }
};

// 🔹 Get a specific tariff class (only if it belongs to the logged-in clinic)
export const getTariffClassById = async (req, res) => {
    try {
        if (!req.user || !req.user.id) {
            return res.status(401).json({ success: false, message: "Unauthorized" });
        }

        const { id } = req.params;
        const tariffClass = await TariffClass.findOne({ _id: id, clinicId: req.user.id });

        if (!tariffClass) {
            return res.status(404).json({
                success: false,
                message: "Tariff class not found or unauthorized",
            });
        }

        res.status(200).json({
            success: true,
            tariffClass,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Error fetching tariff class",
        });
    }
};

// 🔹 Update a tariff class (only if it belongs to the logged-in clinic)
export const updateTariffClass = async (req, res) => {
    try {
        if (!req.user || !req.user.id) {
            return res.status(401).json({ success: false, message: "Unauthorized" });
        }

        const { id } = req.params;
        const updatedTariffClass = await TariffClass.findOneAndUpdate(
            { _id: id, clinicId: req.user.id }, // Ensure only the clinic's tariff is updated
            req.body,
            { new: true, runValidators: true }
        );

        if (!updatedTariffClass) {
            return res.status(404).json({
                success: false,
                message: "Tariff class not found or unauthorized",
            });
        }

        res.status(200).json({
            success: true,
            message: "Tariff class updated successfully",
            updatedTariffClass,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Error updating tariff class",
        });
    }
};

// 🔹 Delete a tariff class (only if it belongs to the logged-in clinic)
export const deleteTariffClass = async (req, res) => {
    try {
        if (!req.user || !req.user.id) {
            return res.status(401).json({ success: false, message: "Unauthorized" });
        }

        const { id } = req.params;
        const deletedTariffClass = await TariffClass.findOneAndDelete({ _id: id, clinicId: req.user.id });

        if (!deletedTariffClass) {
            return res.status(404).json({
                success: false,
                message: "Tariff class not found or unauthorized",
            });
        }

        res.status(200).json({
            success: true,
            message: "Tariff class deleted successfully",
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Error deleting tariff class",
        });
    }
};