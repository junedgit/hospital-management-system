import Template from "../../../../models/clinicAdmin/masterDataConfig/template/template.model.js";

export const addTemplate = async (req, res) => {
    try {
        const { name, description, type, sections, logo, timestamp } = req.body;

        // Ensure uniqueness of fields
        const selectedFields = new Set();
        for (const section of sections) {
            for (const field of section.selectedFields) {
                if (selectedFields.has(field)) {
                    return res.status(400).json({ success: false, message: `Field '${field}' is already selected in another section.` });
                }
                selectedFields.add(field);
            }
        }

        const newTemplate = new Template({
            name,
            description,
            type,
            sections,
            logo,
            timestamp,
            clinicId: req.user.id,
        });

        await newTemplate.save();
        res.status(201).json({ success: true, message: "Template created successfully", template: newTemplate });

    } catch (error) {
        console.error("Error creating template:", error);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
};

export const getTemplates = async (req, res) => {
    try {
        const templates = await Template.find({ clinicId: req.user.id });
        res.status(200).json({ success: true, templates });
    } catch (error) {
        console.error("Error fetching templates:", error);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
};

export const getTemplateById = async (req, res) => {
    try {
        const template = await Template.findOne({ _id: req.params.id, clinicId: req.user.id });

        if (!template) {
            return res.status(404).json({ success: false, message: "Template not found or unauthorized" });
        }

        res.status(200).json({ success: true, template });
    } catch (error) {
        console.error("Error fetching template:", error);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
};

//This update function can be used if we are editing all fields of template which we are not
// export const updateTemplate = async (req, res) => {
//     try {
//         const { sections } = req.body;

//         // Ensure uniqueness of fields
//         const selectedFields = new Set();
//         for (const section of sections) {
//             for (const field of section.selectedFields) {
//                 if (selectedFields.has(field)) {
//                     return res.status(400).json({ success: false, message: `Field '${field}' is already selected in another section.` });
//                 }
//                 selectedFields.add(field);
//             }
//         }

//         const existingTemplate = await Template.findOne({ _id: req.params.id, clinicId: req.user.id });
//         if (!existingTemplate) {
//             return res.status(404).json({ success: false, message: "Template not found or unauthorized" });
//         }

//         existingTemplate.sections = sections;
//         await existingTemplate.save();

//         res.status(200).json({ success: true, message: "Template updated successfully", template: existingTemplate });

//     } catch (error) {
//         console.error("Error updating template:", error);
//         res.status(500).json({ success: false, message: "Internal Server Error" });
//     }
// };

export const updateTemplate = async (req, res) => {
    try {
        const { status } = req.body; // Only allow status update

        // Validate status input
        if (typeof status !== "string" || !["Published", "Unpublished"].includes(status)) {
            return res.status(400).json({ success: false, message: "Invalid status value" });
        }

        const existingTemplate = await Template.findOne({ _id: req.params.id, clinicId: req.user.id });
        if (!existingTemplate) {
            return res.status(404).json({ success: false, message: "Template not found or unauthorized" });
        }

        existingTemplate.status = status;
        await existingTemplate.save();

        res.status(200).json({ success: true, message: "Template status updated successfully", template: existingTemplate });

    } catch (error) {
        console.error("Error updating template status:", error);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
};


export const deleteTemplate = async (req, res) => {
    try {
        const existingTemplate = await Template.findOne({ _id: req.params.id, clinicId: req.user.id });

        if (!existingTemplate) {
            return res.status(404).json({ success: false, message: "Template not found or unauthorized" });
        }

        await Template.deleteOne({ _id: req.params.id });
        res.status(200).json({ success: true, message: "Template deleted successfully" });

    } catch (error) {
        console.error("Error deleting template:", error);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
};
