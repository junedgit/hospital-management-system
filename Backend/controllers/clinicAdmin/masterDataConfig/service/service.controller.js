import Service from "../../../../models/clinicAdmin/masterDataConfig/service/service.model.js";
import ServiceCategory from "../../../../models/clinicAdmin/masterDataConfig/service/serviceCategory.model.js";

//Add a new service
export const addService = async (req, res) => {
    try {
        const { name, serviceCategory, subCategory, serviceType, price } =
            req.body;
        const clinicId = req.user.id;

        // Check if the category exists and belongs to the clinic
        const category = await ServiceCategory.findOne({
            name: serviceCategory,
            clinicId,
        });

        if (!category) {
            return res.status(400).json({
                success: false,
                message:
                    "Invalid service category or category does not belong to your clinic.",
            });
        }
        // console.log(category);
        // Validate subcategory (since it is now a string)
        if (subCategory && !category.subCategories.includes(subCategory)) {
            return res.status(400).json({
                success: false,
                message:
                    "Invalid subcategory for the selected service category.",
            });
        }

        // Create the service
        const newService = new Service({
            name,
            serviceCategory: category._id,
            subCategory,
            serviceType,
            clinicId,
            price,
        });

        await newService.save();
        
        res.status(201).json({
            success: true,
            message: "Service added successfully.",
            service: newService,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Error adding service.",
        });
    }
};

// Get all Services for a Clinic
export const getServices = async (req, res) => {
    try {
        const clinicId = req.user.id;

        const services = await Service.find({ clinicId }).populate(
            "serviceCategory",
            "name serviceType"
        );

        if (services.length === 0) {
            return res.status(404).json({
                success: false,
                message: "No services found for this clinic.",
            });
        }

        res.status(200).json({
            success: true,
            message: "Services retrieved successfully.",
            services,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Error retrieving services.",
        });
    }
};

// Get a Specific Service by ID
export const getServiceById = async (req, res) => {
    try {
        const { id } = req.params;
        const clinicId = req.user.id;

        const service = await Service.findOne({ _id: id, clinicId }).populate(
            "serviceCategory",
            "name serviceType"
        );

        if (!service) {
            return res.status(404).json({
                success: false,
                message: "Service not found.",
            });
        }

        res.status(200).json({
            success: true,
            message: "Service retrieved successfully.",
            service,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Error retrieving service.",
        });
    }
};

// Update a Service
export const editService = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, serviceCategory, subCategory, serviceType, price } =
            req.body;
        const clinicId = req.user.id;

        // Find the existing service
        const service = await Service.findOne({ _id: id, clinicId });

        if (!service) {
            return res.status(404).json({
                success: false,
                message: "Service not found.",
            });
        }
        
        // Validate and update service category if changed
        if (serviceCategory && serviceCategory !== service.serviceCategory) {
            const category = await ServiceCategory.findOne({
                name: serviceCategory,
                clinicId,
            });
    
            if (!category) {
                return res.status(400).json({
                    success: false,
                    message:"Invalid service category or category does not belong to your clinic.",
                })
            }

            service.serviceCategory = serviceCategory;
        }

        // Validate subcategory (since it's now a string)
        if (subCategory) {
            const category = await ServiceCategory.findById(
                service.serviceCategory
            );

            if (!category || !category.subCategories.includes(subCategory)) {
                return res.status(400).json({
                    success: false,
                    message:
                        "Invalid subcategory for the selected service category.",
                });
            }

            service.subCategory = subCategory;
        }

        // Update other service fields
        if (name) service.name = name;
        if (serviceType) service.serviceType = serviceType;
        if (price) service.price = price;

        await service.save();

        res.status(200).json({
            success: true,
            message: "Service updated successfully.",
            service,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Error updating service.",
        });
    }
};

// Delete a Service
export const deleteService = async (req, res) => {
    try {
        const { id } = req.params;
        const clinicId = req.user.id;

        const service = await Service.findOneAndDelete({ _id: id, clinicId });

        if (!service) {
            return res.status(404).json({
                success: false,
                message: "Service not found.",
            });
        }

        res.status(200).json({
            success: true,
            message: "Service deleted successfully.",
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Error deleting service.",
        });
    }
};
