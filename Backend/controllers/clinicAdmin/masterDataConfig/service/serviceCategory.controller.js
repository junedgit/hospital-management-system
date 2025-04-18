import mongoose from "mongoose";
import ServiceCategory from "../../../../models/clinicAdmin/masterDataConfig/service/serviceCategory.model.js";
import Service from "../../../../models/clinicAdmin/masterDataConfig/service/service.model.js";
// import Service from "../../models/service.model.js";

export const addServiceCategory = async (req, res) => {
    try {
        const { serviceType, name, subCategories } = req.body;
        const clinicId = req.user.id; // Extract clinicId from authenticated user
        console.log(clinicId);

        // Ensure required fields are provided
        if (!serviceType || !name || !subCategories || subCategories.length === 0) {
            return res.status(400).json({
                success: false,
                message: "All fields (serviceType, name, subCategories) are required.",
            });
        }

        const newCategory = new ServiceCategory({
            serviceType,
            name,
            subCategories,
            clinicId,
        });

        await newCategory.save();

        res.status(201).json({
            success: true,
            message: "Service category added successfully.",
            category: newCategory,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Error adding service category.",
        });
    }
};

export const editServiceCategory = async (req, res) => {
    const session = await mongoose.startSession();
    session.startTransaction();
    
    try {
        const { id } = req.params; // Get category ID from URL
        const { serviceType, name, subCategories } = req.body;
        const clinicId = req.user.id; // Ensure clinic-specific changes

        // Find the category to update
        const category = await ServiceCategory.findOne({ _id: id, clinicId });

        if (!category) {
            await session.abortTransaction();
            session.endSession();
            return res.status(404).json({
                success: false,
                message: "Service category not found.",
            });
        }

        // Store old values before updating
        const oldSubCategories = [...category.subCategories];

        // If subCategories are being changed
        if (subCategories && subCategories.length > 0) {
            const changedSubCategories = subCategories.filter(sub => !oldSubCategories.includes(sub));

            // If more than one subcategory is changed, send an error
            if (changedSubCategories.length > 1) {
                await session.abortTransaction();
                session.endSession();
                return res.status(400).json({
                    success: false,
                    message: "You can only change one subcategory at a time.",
                });
            }

            // Identify which subcategory is being changed
            if (changedSubCategories.length === 1) {
                const oldSubCategory = oldSubCategories.find(sub => !subCategories.includes(sub));
                const newSubCategory = changedSubCategories[0];

                // Update all services with the old subcategory
                await Service.updateMany(
                    { serviceCategory: id, subCategory: oldSubCategory },
                    { $set: { subCategory: newSubCategory } },
                    { session }
                );
            }

            category.subCategories = subCategories;
        }

        // Update only the fields provided
        if (serviceType) category.serviceType = serviceType;
        if (name) category.name = name;

        await category.save({ session });

        await session.commitTransaction();
        session.endSession();

        res.status(200).json({
            success: true,
            message: "Service category updated successfully, and related services were updated.",
            category,
        });

    } catch (error) {
        await session.abortTransaction();
        session.endSession();
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Error updating service category and services.",
        });
    }
};

export const getServiceCategories = async (req, res) => {
    try {
        const clinicId = req.user.id;

        const categories = await ServiceCategory.find({ clinicId });

        if (categories.length === 0) {
            return res.status(404).json({
                success: false,
                message: "No service categories found.",
            });
        }

        res.status(200).json({
            success: true,
            message: "Service categories retrieved successfully.",
            categories,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Error retrieving service categories.",
        });
    }
};

export const getServiceCategory = async (req, res) => {
    try {
        const { id } = req.params;

        // Validate if id is a valid MongoDB ObjectId
        if (!id.match(/^[0-9a-fA-F]{24}$/)) {
            return res.status(400).json({
                success: false,
                message: "Invalid service category ID.",
            });
        }

        // Fetch the service category
        const serviceCategory = await ServiceCategory.findById(id).populate("clinicId", "name");

        if (!serviceCategory) {
            return res.status(404).json({
                success: false,
                message: "Service category not found.",
            });
        }

        res.status(200).json({
            success: true,
            serviceCategory,
        });

    } catch (error) {
        console.error("Error fetching service category:", error);
        res.status(500).json({
            success: false,
            message: "Error fetching service category.",
        });
    }
};

export const deleteServiceCategory = async (req, res) => {
    try {
        const { id } = req.params;
        const clinicId = req.user.id;

        const category = await ServiceCategory.findOneAndDelete({ _id: id, clinicId });

        if (!category) {
            return res.status(404).json({
                success: false,
                message: "Service category not found.",
            });
        }

        res.status(200).json({
            success: true,
            message: "Service category deleted successfully.",
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Error deleting service category.",
        });
    }
};
