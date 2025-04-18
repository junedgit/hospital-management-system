import DoctorPrescription from "../../../../../models/clinicAdmin/masterDataConfig/printSettings/doctorPrescription/doctorPrescription.model.js";

export const createDefaultPrintSettings = async (req, res) => {
    try {
        const { clinicId } = req.user.id; // Assuming user has clinicId

        // Check if settings already exist for the clinic
        const existingSettings = await DoctorPrescription.findOne({ clinicId });
        if (existingSettings) {
            return res.status(400).json({ message: "Print settings already exist for this clinic" });
        }

        // Create new settings with correct default values
        const newSettings = new DoctorPrescription({
            clinicId : req.user.id,
            basicSettings: {
                printEachDeptNewPage: false,
                linesPerPage: 20,
                fontSize: "12px",
                spaceBetweenLines: 1
            },
            bannerHeading: {
                letterHeadSpace: 5,
                headerBanner: { type: "None" },
                headingText: "",
                subHeadingText: ""
            },
            footerBanner: {
                footerSpaceForSignature: 20,
                footerBanner: { type: "None" },
                headingText: "",
                subHeadingText: ""
            }
        });

        await newSettings.save();
        res.status(201).json({ message: "Default print settings saved successfully", newSettings });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getPrintSettings = async (req, res) => {
    try {
        // Fetch the print settings based on the logged-in clinic's ID
        const printSettings = await DoctorPrescription.findOne({ clinicId: req.user.id });

        if (!printSettings) {
            return res.status(404).json({ message: "Print settings not found for this clinic" });
        }

        res.status(200).json({ printSettings });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const updateBasicSettings = async (req, res) => {
    try {
        const { printEachDeptNewPage, linesPerPage, fontSize, spaceBetweenLines } = req.body;

        // Update only basic settings fields
        const updatedSettings = await DoctorPrescription.findOneAndUpdate(
            { clinicId : req.user.id },
            {
                $set: {
                    "basicSettings.printEachDeptNewPage": printEachDeptNewPage,
                    "basicSettings.linesPerPage": linesPerPage,
                    "basicSettings.fontSize": fontSize,
                    "basicSettings.spaceBetweenLines": spaceBetweenLines
                }
            },
            { new: true }
        );

        if (!updatedSettings) {
            return res.status(404).json({ message: "Print settings not found for this clinic" });
        }

        res.status(200).json({ message: "Basic settings updated successfully", updatedSettings });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

//Without multer
// export const updateBannerSettings = async (req, res) => {
//     try {
//         const { bannerHeading, footerBanner } = req.body;

//         // Validate input banner types
//         const validBannerTypes = ["Text", "Image", "None"];
//         if (!validBannerTypes.includes(bannerHeading?.headerBanner?.type) ||
//             !validBannerTypes.includes(footerBanner?.footerBanner?.type)) {
//             return res.status(400).json({ message: "Invalid banner type" });
//         }

//         // Update banner and footer settings
//         const updatedSettings = await DoctorPrescription.findOneAndUpdate(
//             { clinicId : req.user.id },
//             {
//                 $set: {
//                     bannerHeading,
//                     footerBanner
//                 }
//             },
//             { new: true }
//         );

//         if (!updatedSettings) {
//             return res.status(404).json({ message: "Print settings not found for this clinic" });
//         }

//         res.status(200).json({ message: "Banner and footer settings updated successfully", updatedSettings });

//     } catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// };

export const updateBannerSettings = async (req, res) => {
    try {
        let { bannerHeading, footerBanner } = req.body;

        // Convert JSON strings to objects safely (if provided)
        const parsedBannerHeading = bannerHeading ? JSON.parse(bannerHeading) : {};
        const parsedFooterBanner = footerBanner ? JSON.parse(footerBanner) : {};

        // Fetch existing settings
        let existingSettings = await DoctorPrescription.findOne({ clinicId: req.user.id });
        if (!existingSettings) {
            return res.status(404).json({ message: "Print settings not found for this clinic" });
        }

        // Ensure default structure exists
        if (!existingSettings.bannerHeading) {
            existingSettings.bannerHeading = { headerBanner: { type: "None", imageUrl: "", text: "" } };
        }

        if (!existingSettings.footerBanner) {
            existingSettings.footerBanner = { footerBanner: { type: "None", imageUrl: "", text: "" } };
        }

        // Handle Header Banner Update
        if (parsedBannerHeading.headerBanner) {
            if (req.files?.headerImage) {
                // Case 1: User uploaded an image
                parsedBannerHeading.headerBanner = {
                    type: "Image",
                    imageUrl: req.files.headerImage[0].path,
                    text: "", // Ensure text is removed
                };
            } else {
                // Case 2: User changed to "Text" or "None"
                parsedBannerHeading.headerBanner = {
                    type: parsedBannerHeading.headerBanner.type || "None",
                    imageUrl: parsedBannerHeading.headerBanner.type === "Image" ? parsedBannerHeading.headerBanner.imageUrl || "" : "",
                    text: parsedBannerHeading.headerBanner.type === "Text" ? parsedBannerHeading.headerBanner.text || "Default Text" : "",
                };
            }
        } else {
            parsedBannerHeading.headerBanner = existingSettings.bannerHeading.headerBanner;
        }

        // Handle Footer Banner Update
        if (parsedFooterBanner.footerBanner) {
            if (req.files?.footerImage) {
                // Case 1: User uploaded an image
                parsedFooterBanner.footerBanner = {
                    type: "Image",
                    imageUrl: req.files.footerImage[0].path,
                    text: "", // Ensure text is removed
                };
            } else {
                // Case 2: User changed to "Text" or "None"
                parsedFooterBanner.footerBanner = {
                    type: parsedFooterBanner.footerBanner.type || "None",
                    imageUrl: parsedFooterBanner.footerBanner.type === "Image" ? parsedFooterBanner.footerBanner.imageUrl || "" : "",
                    text: parsedFooterBanner.footerBanner.type === "Text" ? parsedFooterBanner.footerBanner.text || "Default Text" : "",
                };
            }
        } else {
            parsedFooterBanner.footerBanner = existingSettings.footerBanner.footerBanner;
        }

        // Update the settings
        existingSettings.bannerHeading = parsedBannerHeading;
        existingSettings.footerBanner = parsedFooterBanner;

        await existingSettings.save();

        res.status(200).json({ message: "Banner settings updated successfully", updatedSettings: existingSettings });
    } catch (error) {
        console.error("Error in updateBannerSettings:", error);
        res.status(500).json({ message: error.message });
    }
};


export const addSignature = async (req, res) => {
    try {
        const { name, designation } = req.body;

        if (!name || !designation) {
            return res.status(400).json({ message: "Name and designation are required" });
        }

        // Check if an image is uploaded
        if (!req.file) {
            return res.status(400).json({ message: "Signature image is required" });
        }

        // Get the uploaded image URL from Cloudinary
        const signatureImageUrl = req.file.path;

        // Find the doctor's prescription settings
        const prescription = await DoctorPrescription.findOne({ clinicId : req.user.id });
        if (!prescription) {
            return res.status(404).json({ message: "Prescription settings not found" });
        }

        // Add new signature
        prescription.signature.push({ name, designation, signatureImage: signatureImageUrl });

        await prescription.save();
        res.status(200).json({ message: "Signature added successfully", updatedPrescription: prescription });
    } catch (error) {
        console.error("Error adding signature:", error);
        res.status(500).json({ message: error.message });
    }
};

export const editSignature = async (req, res) => {
    try {
        const {signatureId} = req.params;
        const { name, designation } = req.body;

        if (!signatureId) {
            return res.status(400).json({ message: "Signature ID is required" });
        }

        // Find the prescription settings
        const prescription = await DoctorPrescription.findOne({ clinicId : req.user.id });
        if (!prescription) {
            return res.status(404).json({ message: "Prescription settings not found" });
        }

        // Find the signature inside the array
        const signature = prescription.signature.id(signatureId);
        if (!signature) {
            return res.status(404).json({ message: "Signature not found" });
        }

        // Update fields if provided
        if (name) signature.name = name;
        if (designation) signature.designation = designation;

        // If a new image is uploaded, update it
        if (req.file) {
            signature.signatureImage = req.file.path;
        }

        await prescription.save();
        res.status(200).json({ message: "Signature updated successfully", updatedPrescription: prescription });
    } catch (error) {
        console.error("Error editing signature:", error);
        res.status(500).json({ message: error.message });
    }
};
