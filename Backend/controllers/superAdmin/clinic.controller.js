// const bcrypt = require("bcrypt");
import bcrypt from "bcrypt";
import mongoose from "mongoose";
import validator from "validator";
import Clinic from "../../models/superAdmin/clinic.model.js";
import Counter from "../../models/superAdmin/counter.model.js";
import InvoiceNumber from "../../models/superAdmin/invoiceNumber.model.js";

const generateRandomPassword = () => {
    const randomNumbers = Math.floor(1000 + Math.random() * 9000); // Generate 4-digit number
    return `ClinicAdmin${randomNumbers}`;
};

const addClinic = async (req, res) => {
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
        const {
            clinicName,
            email,
            phone_number,
            address,
            city,
            state,
            pinCode,
            subdomain,
            modulePermissions,
            activationDate,
            usersAllowed,
            salesBy_name,
            salesBy_email,
            globalLabel1,
            globalLabel2,
        } = req.body;

        if (
            !clinicName ||
            !email ||
            !phone_number ||
            !subdomain ||
            !modulePermissions ||
            !usersAllowed
        ) {
            return res
                .status(400)
                .json({ message: "All required fields must be filled." });
        }

        if (!validator.isEmail(email)) {
            return res
                .status(400)
                .json({ success: false, message: "Enter a valid email." });
        }

        // Get the next clinic ID from the counter collection
        const counter = await Counter.findOneAndUpdate(
            { name: "clinicID" },
            { $inc: { seq: 1 } },
            { new: true, upsert: true, session } // Include session for transaction
        );

        // Generate and encrypt password
        const rawPassword = generateRandomPassword();
        const hashedPassword = await bcrypt.hash(rawPassword, 10);

        // Create new clinic object
        const newClinic = new Clinic({
            CID: counter.seq, // Assign the incremented CID
            clinicName,
            email,
            phone_number,
            address,
            city,
            state,
            pinCode,
            subdomain,
            modulePermissions,
            activationDate,
            usersAllowed,
            salesBy_name,
            salesBy_email,
            globalLabel1,
            globalLabel2,
            password: hashedPassword, // Store encrypted password
        });

        // Save clinic inside the transaction
        await newClinic.save({ session });

        // Commit the transaction if clinic saved successfully
        await session.commitTransaction();
        session.endSession();
        const invoiceNumber = new InvoiceNumber({ clinicId: newClinic._id, invoiceNumber: 1 });
        await invoiceNumber.save();
        return res.status(201).json({
            message: "Clinic registered successfully.",
            clinic: newClinic,
            rawPassword, // Send plain password to the response (Remove in production)
        });
    } catch (error) {
        await session.abortTransaction(); // Abort if error occurs
        session.endSession();

        if (error.code === 11000) {
            return res.status(409).json({
                message:
                    "A clinic with this email, phone number, or subdomain already exists.",
                duplicateKey: error.keyValue,
            });
        }

        return res.status(500).json({
            message: "An error occurred while registering the clinic.",
            error: error.message,
        });
    }
};




const listClinic = async (req, res) => {
    try {
        const { clinicName, city, page = 1, limit = 10 } = req.query;

        // Ensure valid pagination numbers
        const pageNumber = Math.max(parseInt(page, 10) || 1, 1);
        const limitNumber = Math.max(parseInt(limit, 10) || 10, 1);
        const skip = (pageNumber - 1) * limitNumber;

        // Filtering criteria
        let filter = { softDeleted: false }; // Ensuring only active clinics
        if (clinicName)
            filter.clinicName = { $regex: clinicName, $options: "i" };
        if (city) filter.city = { $regex: city, $options: "i" };

        // Fetching clinics with pagination
        const clinics = await Clinic.find(filter)
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limitNumber);

        // Total count of active clinics matching the filter
        const totalClinics = await Clinic.countDocuments(filter);

        if (!clinics.length) {
            return res.status(404).json({
                success: false,
                message: "No active clinics found.",
            });
        }

        res.status(200).json({
            success: true,
            message: "Clinics retrieved successfully",
            clinics,
            totalPages: Math.ceil(totalClinics / limitNumber),
            currentPage: pageNumber,
            totalClinics,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: `An error occurred while retrieving clinics: ${error.message}`,
        });
    }
};

const getClinic = async (req, res) => {
    try {
        const clinic = await Clinic.findById(req.body.id);

        if (clinic.length === 0) {
            return res.status(404).json({
                success: false,
                message: "No clinics found.",
            });
        }

        res.status(200).json({
            success: true,
            message: "Clinics retrieved successfully",
            clinics: clinic,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: `An error occurred while retrieving clinics: ${error.message}`,
        });
    }
};



const deleteClinic = async (req, res) => {
    try {
        const clinic = await Clinic.findById(req.body.id);

        if (!clinic) {
            return res.status(404).json({
                success: false,
                message: "Clinic not found.",
            });
        }

        // Mark the clinic as "soft deleted" by setting semiDeleted to true
        clinic.softDeleted = true;

        // Save the updated clinic
        await clinic.save();

        res.status(200).json({
            success: true,
            message: "Clinic successfully marked as deleted.",
            clinic,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: `An error occurred while deleting the clinic: ${error.message}`,
        });
    }
};

const deleteBackupClinic = async (req, res) => {
    try {
        const clinic = await Clinic.findById(req.body.id);

        if (!clinic) {
            return res.status(404).json({
                success: false,
                message: "Clinic not found.",
            });
        }

        const fileName = `${clinic.clinicName}.data.csv`;
        const csvStream = format({ headers: true });
        const writableStream = fs.createWriteStream(fileName);

        writableStream.on("finish", async () => {
            res.download(fileName, async (err) => {
                if (err) {
                    console.error("Error sending file:", err);
                    return res.status(500).json({
                        success: false,
                        message: "Error sending file",
                    });
                }

                await Clinic.findByIdAndDelete(req.body.id);

                fs.unlink(fileName, (unlinkErr) => {
                    if (unlinkErr) {
                        console.error(
                            "Error deleting temporary file:",
                            unlinkErr
                        );
                    }
                });
            });
        });

        csvStream.pipe(writableStream);
        csvStream.write(clinic.toObject());
        csvStream.end();
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: `An error occurred while deleting the clinic: ${error.message}`,
        });
    }
};

const updateClinic = async (req, res) => {
    try {
        const { id, address, activationDate } = req.body;

        if (!id) {
            return res.status(400).json({
                success: false,
                message: "Clinic ID is required.",
            });
        }

        const updateFields = {};
        if (address) updateFields.address = address;
        if (activationDate) updateFields.activationDate = activationDate;

        // Check if at least one field is provided to update
        // if (Object.keys(updateFields).length === 0) {
        //     return res.status(400).json({
        //         success: false,
        //         message: "Provide at least one field to update.",
        //     });
        // }

        const updatedClinic = await Clinic.findByIdAndUpdate(
            id,
            { $set: updateFields },
            { new: true, runValidators: true }
        );

        if (!updatedClinic) {
            return res.status(404).json({
                success: false,
                message: "Clinic not found.",
            });
        }

        res.status(200).json({
            success: true,
            message: "Clinic updated successfully.",
            updatedClinic,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: `An error occurred while updating the clinic: ${error.message}`,
        });
    }
};

//To be called only once to initialize the unique id with which we will uniquely identify the clinics
const setupCounter = async (req, res) => {
    try {
        // Check if the counter already exists
        const existingCounter = await Counter.findOne({ name: "clinicID" });

        if (existingCounter) {
            return res.status(200).json({
                message: "Counter already initialized.",
                counter: existingCounter,
            });
        }

        // If the counter does not exist, create a new one starting from 1000
        const newCounter = new Counter({
            name: "clinicID",
            seq: 1000, // Starting CID from 1000
        });

        await newCounter.save();

        return res.status(201).json({
            message: "Counter initialized successfully.",
            counter: newCounter,
        });
    } catch (error) {
        return res.status(500).json({
            message: "An error occurred while setting up the counter.",
            error: error.message,
        });
    }
};

export {
    addClinic,
    listClinic,
    getClinic,
    deleteClinic,
    deleteBackupClinic,
    updateClinic,
    setupCounter,
};
