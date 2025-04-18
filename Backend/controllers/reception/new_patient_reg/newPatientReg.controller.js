import Patient from "../../../models/reception/new_patient_reg/newPatient.model.js";
import Referral from "../../../models/reception/referral/referral.model.js";
import Clinic from "../../../models/superAdmin/clinic.model.js";

const searchReferral = async (req, res) => {
    try {
        const { referredType, referredName } = req.query;

        if (!referredType || !referredName) {
            return res.status(400).json({ message: "Referred type and name are required" });
        }

        // Case-insensitive search for referrals matching type and partial name
        const referrals = await Referral.find({
            referredType,
            referredName: { $regex: new RegExp(referredName, "i") } // Case-insensitive search
        });

        if (referrals.length === 0) {
            return res.status(200).json({ message: "No matches found. Do you want to add a new referral?" });
        }

        return res.status(200).json({success:true,referrals});
    } catch (error) {
        console.error("Error fetching referrals:", error);
        return res.status(500).json({ message: "Internal server error", error });
    }
};


const addPatient = async (req, res) => {
    try {
        const {
            mrn,
            iquma,
            patientCategory,
            // image,
            title,
            givenName,
            middleName,
            familyName,
            grandfatherName,
            dateOfBirth,
            age,
            gender,
            maritalStatus,
            email,
            phone,
            homePhone,
            address,
            city,
            state,
            pinCode,
            nationality,
            ethnicity,
            religion,
            bloodGroup,
            occupation,
            idProfType,
            idNo,
            passportNumber,
            language,
            referredBy,
        } = req.body;

        const image = req.file ? req.file.path : null;
        // Ensure required fields are provided
        if (!givenName || !familyName || !gender || !patientCategory || !phone) {
            return res.status(400).json({ message: "Missing required fields" });
        }
        if (referredBy) {
            const { referredType, referredName } = referredBy;

            const existingReferral = await Referral.findOne({ referredType, referredName });

            if (!existingReferral) {
                return res.status(400).json({
                    message: "Referral does not exist. Please add it first."
                });
            }
        }
        const clinicId= req.user.id;
        const clinicExists = await Clinic.findById(clinicId);
        if (!clinicExists) {
            return res.status(404).json({ message: "Clinic not found." });
        }

        // Create a new patient document
        const newPatient = new Patient({
            mrn,
            iquma,
            patientCategory,
            image,
            title,
            givenName,
            middleName,
            familyName,
            grandfatherName,
            dateOfBirth,
            age,
            gender,
            maritalStatus,
            email,
            phone,
            homePhone,
            address,
            city,
            state,
            pinCode,
            nationality,
            ethnicity,
            religion,
            bloodGroup,
            occupation,
            idProfType,
            idNo,
            passportNumber,
            language,
            referredBy,
            clinicId
        });

        // Save the patient to the database
        const savedPatient = await newPatient.save();

        return res.status(201).json({
            message: "Patient added successfully",
            patient: savedPatient,
        });
    } catch (error) {
        console.error("Error adding patient:", error);
        
        if (error.code === 11000) {
            return res.status(400).json({ message: "Duplicate field value exists", error });
        }

        return res.status(500).json({ message: "Internal server error", error });
    }
};

 const getPatient = async (req, res) => {
    try {
        const { id } = req.params;

        const patient = await Patient.findById(id);
        if (!patient) {
            return res.status(404).json({ message: "Patient not found" });
        }

            res.status(200).json({success:"true",patient});
    } catch (error) {
        console.error("Error fetching patient by ID:", error);
        res.status(500).json({ message: "Internal server error", error });
    }
};

const allPatients = async (req, res) => {
    try {
        const { page = 1, limit = 10, search, gender, category, referredBy } = req.query;

        // Create a filter object based on query parameters
        let filter = {};

        if (search) {
            filter.$or = [
                { givenName: { $regex: search, $options: "i" } },
                { familyName: { $regex: search, $options: "i" } },
                { phone: { $regex: search, $options: "i" } }
            ];
        }

        if (gender) {
            filter.gender = gender;
        }

        if (category) {
            filter.patientCategory = category;
        }

        if (referredBy) {
            filter["referredBy.referredName"] = { $regex: referredBy, $options: "i" };
        }

        // Pagination settings
        const pageNumber = parseInt(page);
        const pageSize = parseInt(limit);
        const skip = (pageNumber - 1) * pageSize;

        // Fetch patients based on filters
        const patients = await Patient.find(filter)
            .skip(skip)
            .limit(pageSize)
            .sort({ createdAt: -1 }); // Sorting by newest first

        // Get total count of patients matching the filters
        const totalPatients = await Patient.countDocuments(filter);

        res.status(200).json({
            success:"true",
            page: pageNumber,
            totalPages: Math.ceil(totalPatients / pageSize),
            totalPatients,
            patients,
        });
    } catch (error) {
        console.error("Error fetching patients:", error);
        res.status(500).json({ message: "Internal server error", error });
    }
};

const getPatientByMRN = async (req, res) => {
    try {
        const { mrn } = req.query;

        if (!mrn) {
            return res.status(400).json({ message: "MRN is required" });
        }

        const patient = await Patient.findOne({ mrn });

        if (!patient) {
            return res.status(404).json({ message: "Patient not found" });
        }

        res.status(200).json({message:"success",patient});
    } catch (error) {
        console.error("Error fetching patient by MRN:", error);
        res.status(500).json({ message: "Internal server error", error });
    }
};

export {addPatient,searchReferral,getPatient,allPatients,getPatientByMRN}
