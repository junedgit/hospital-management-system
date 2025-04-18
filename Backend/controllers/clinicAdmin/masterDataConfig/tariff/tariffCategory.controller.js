import TariffCategory from "../../../../models/clinicAdmin/masterDataConfig/tariff/tariffCategory.model.js";

export const addTariffCategory = async (req, res) => {
    try {
        const { name, description, status } = req.body;

        if (!name || !status) {
            return res.status(400).json({ success: false, message: "Name and status are required" });
        }

        const newCategory = new TariffCategory({
            name,
            description,
            status,
            clinicId: req.user.id, // Fetching clinicId from authenticated user
        });

        await newCategory.save();
        res.status(201).json({ success: true, message: "Tariff category created successfully", tariffCategory: newCategory });

    } catch (error) {
        console.error("Error creating tariff category:", error);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
};

export const getTariffCategories = async (req, res) => {
    try {
        const tariffCategories = await TariffCategory.find({ clinicId: req.user.id });

        res.status(200).json({ success: true, tariffCategories });

    } catch (error) {
        console.error("Error fetching tariff categories:", error);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
};

export const getTariffCategoryById = async (req, res) => {
    try {
        const category = await TariffCategory.findOne({ _id: req.params.id, clinicId: req.user.id });

        if (!category) {
            return res.status(404).json({ success: false, message: "Tariff category not found or unauthorized" });
        }

        res.status(200).json({ success: true, tariffCategory: category });

    } catch (error) {
        console.error("Error fetching tariff category:", error);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
};

export const updateTariffCategory = async (req, res) => {
    try {
        const { name, description, status } = req.body;

        const category = await TariffCategory.findOneAndUpdate(
            { _id: req.params.id, clinicId: req.user.id },
            { name, description, status },
            { new: true }
        );

        if (!category) {
            return res.status(404).json({ success: false, message: "Tariff category not found or unauthorized" });
        }

        res.status(200).json({ success: true, message: "Tariff category updated successfully", updatedCategory: category });

    } catch (error) {
        console.error("Error updating tariff category:", error);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
};

export const deleteTariffCategory = async (req, res) => {
    try {
        const category = await TariffCategory.findOneAndDelete({ _id: req.params.id, clinicId: req.user.id });

        if (!category) {
            return res.status(404).json({ success: false, message: "Tariff category not found or unauthorized" });
        }

        res.status(200).json({ success: true, message: "Tariff category deleted successfully" });

    } catch (error) {
        console.error("Error deleting tariff category:", error);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
};