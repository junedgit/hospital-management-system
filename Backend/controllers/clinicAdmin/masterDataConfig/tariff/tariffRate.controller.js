import TariffClass from "../../../../models/clinicAdmin/masterDataConfig/tariff/tariffClass.model.js";
import TariffCategory from "../../../../models/clinicAdmin/masterDataConfig/tariff/tariffCategory.model.js";
import TariffRate from "../../../../models/clinicAdmin/masterDataConfig/tariff/tariffRate.model.js";

export const addTariffRate = async (req, res) => {
    try {
        const { name, service, type, tariffClass, tariffCategory, rate, remarks } = req.body;

        // Find the Tariff Class by name and clinicId
        const existingClass = await TariffClass.findOne({ className: tariffClass, clinicId: req.user.id });
        if (!existingClass) {
            return res.status(400).json({ success: false, message: "Invalid tariff class or unauthorized" });
        }

        // Find the Tariff Category by name and clinicId
        const existingCategory = await TariffCategory.findOne({ name: tariffCategory, clinicId: req.user.id });
        if (!existingCategory) {
            return res.status(400).json({ success: false, message: "Invalid tariff category or unauthorized" });
        }

        // Create the Tariff Rate using the found IDs
        const newTariffRate = new TariffRate({
            name,
            service,
            type,
            tariffClass: existingClass._id,  // Assign the found ID
            tariffCategory: existingCategory._id, // Assign the found ID
            rate,
            remarks,
            clinicId: req.user.id, // Clinic ID from authenticated user
        });

        await newTariffRate.save();
        res.status(201).json({ success: true, message: "Tariff rate created successfully", tariffRate: newTariffRate });

    } catch (error) {
        console.error("Error creating tariff rate:", error);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
};

export const getTariffRates = async (req, res) => {
    try {
        const tariffRates = await TariffRate.find({ clinicId: req.user.id })
            .populate("tariffClass", "className") // Populate class name
            .populate("tariffCategory", "name"); // Populate category name

        res.status(200).json({ success: true, tariffRates });

    } catch (error) {
        console.error("Error fetching tariff rates:", error);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
};


export const getTariffRateById = async (req, res) => {
    try {
        const tariffRate = await TariffRate.findOne({ _id: req.params.id, clinicId: req.user.id })
            .populate("tariffClass", "className")
            .populate("tariffCategory", "name");

        if (!tariffRate) {
            return res.status(404).json({ success: false, message: "Tariff rate not found or unauthorized" });
        }

        res.status(200).json({ success: true, tariffRate });

    } catch (error) {
        console.error("Error fetching tariff rate:", error);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
};


export const updateTariffRate = async (req, res) => {
    try {
        const { name, service, type, tariffClass, tariffCategory, rate, remarks } = req.body;

        const existingTariffRate = await TariffRate.findOne({ _id: req.params.id, clinicId: req.user.id });
        if (!existingTariffRate) {
            return res.status(404).json({ success: false, message: "Tariff rate not found or unauthorized" });
        }

        let updatedTariffClass = existingTariffRate.tariffClass;
        let updatedTariffCategory = existingTariffRate.tariffCategory;

        // Ensure tariffClass exists based on name
        if (tariffClass) {
            const existingClass = await TariffClass.findOne({ className: tariffClass, clinicId: req.user.id });
            if (!existingClass) {
                return res.status(400).json({ success: false, message: "Invalid tariff class or unauthorized" });
            }
            updatedTariffClass = existingClass._id;
        }

        // Ensure tariffCategory exists based on name
        if (tariffCategory) {
            const existingCategory = await TariffCategory.findOne({ name: tariffCategory, clinicId: req.user.id });
            if (!existingCategory) {
                return res.status(400).json({ success: false, message: "Invalid tariff category or unauthorized" });
            }
            updatedTariffCategory = existingCategory._id;
        }

        // Update the Tariff Rate fields
        existingTariffRate.name = name ?? existingTariffRate.name;
        existingTariffRate.service = service ?? existingTariffRate.service;
        existingTariffRate.type = type ?? existingTariffRate.type;
        existingTariffRate.tariffClass = updatedTariffClass;
        existingTariffRate.tariffCategory = updatedTariffCategory;
        existingTariffRate.rate = rate ?? existingTariffRate.rate;
        existingTariffRate.remarks = remarks ?? existingTariffRate.remarks;

        await existingTariffRate.save();
        res.status(200).json({ success: true, message: "Tariff rate updated successfully", tariffRate: existingTariffRate });

    } catch (error) {
        console.error("Error updating tariff rate:", error);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
};

export const deleteTariffRate = async (req, res) => {
    try {
        const tariffRate = await TariffRate.findOneAndDelete({ _id: req.params.id, clinicId: req.user.id });

        if (!tariffRate) {
            return res.status(404).json({ success: false, message: "Tariff rate not found or unauthorized" });
        }

        res.status(200).json({ success: true, message: "Tariff rate deleted successfully" });

    } catch (error) {
        console.error("Error deleting tariff rate:", error);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
};