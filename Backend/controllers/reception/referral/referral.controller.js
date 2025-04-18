import Referral from "../../../models/reception/referral/referral.model.js";
import Clinic from "../../../models/superAdmin/clinic.model.js";

const addReferral = async (req, res) => {
    try {
        const {
            firstName,
            middleName,
            lastName,
            referralType,
            referralCode,
            speciality,
            qualification,
            clinicName,
            address,
            city,
            state,
            pinCode,
            email,
            phone,
        } = req.body;

        // Validate required fields
        if (
            !firstName ||
            !lastName ||
            !referralType ||
            !referralCode ||
            !address ||
            !email ||
            !phone
        ) {
            return res
                .status(400)
                .json({ message: "All required fields must be filled." });
        }

        // Check if clinicId exists
        const clinicId = req.user.id;
        const clinicExists = await Clinic.findById(clinicId);
        if (!clinicExists) {
            return res.status(404).json({ message: "Clinic not found." });
        }

        // Check if email or phone already exists
        const existingReferral = await Referral.findOne({
            firstName,
            lastName,
            referralCode,
            email,
            phone,
            clinicId,
        });

        if (existingReferral) {
            return res
                .status(409)
                .json({
                    message: "Referral with these details already exists.",
                });
        }

        // Create new referral object
        const newReferral = new Referral({
            firstName,
            middleName,
            lastName,
            referralType,
            referralCode,
            speciality,
            qualification,
            clinicName,
            address,
            city,
            state,
            pinCode,
            email,
            phone,
            clinicId,
        });

        // Save referral to DB
        await newReferral.save();

        return res.status(201).json({
            message: "Referral added successfully.",
            referral: newReferral,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "An error occurred while adding the referral.",
            error: error.message,
        });
    }
};

const getReferral = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) {
            return res
                .status(400)
                .json({ success: false, message: "id is required" });
        }

        const referral = await Referral.findOne({ _id: id ,clinicId:req.user.id});
        if (!referral) {
            return res.status(404).json({ message: "Referral not found." });
        }

        return res
            .status(200)
            .json({ success: true, message: "Referral found", referral });
    } catch (error) {
        console.error(error);
        return res
            .status(500)
            .json({ success: false, message: "Internal server error" });
    }
};
const allReferrals = async (req, res) => {
    try {
        const { firstName, lastName, referralType, city, state, referralCode, page, limit } = req.query;

        if (!req.user.id) {
            return res.status(403).json({
                success: false,
                message: "Unauthorized: Clinic ID not found in user data.",
            });
        }

        // Create a filter object
        let filter = { clinicId: req.user.id };

        if (firstName) filter.firstName = new RegExp(firstName, "i"); // Case-insensitive match
        if (lastName) filter.lastName = new RegExp(lastName, "i");
        if (referralType) filter.referralType = referralType;
        if (city) filter.city = new RegExp(city, "i");
        if (state) filter.state = new RegExp(state, "i");
        if (referralCode) filter.referralCode = new RegExp(referralCode, "i");

        // Convert page and limit to numbers
        const pageNumber = Number(page) || 1;
        const limitNumber = Number(limit) || 10;
        const skip = (pageNumber - 1) * limitNumber;

        // Fetch referrals with filtering, pagination, and sorting (latest first)
        const referrals = await Referral.find(filter)
            .skip(skip)
            .limit(limitNumber)
            .sort({ createdAt: -1 });

        // Get total count for pagination info
        const totalReferrals = await Referral.countDocuments(filter);

        return res.status(200).json({
            success: true,
            totalReferrals,
            totalPages: Math.ceil(totalReferrals / limitNumber),
            currentPage: pageNumber,
            referrals,
        });
    } catch (error) {
        console.error("Error fetching referrals:", error);
        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
            error: error.message,
        });
    }
};

const editReferral = async (req, res) => {
    try {
        const { referralId } = req.params; // Get referral ID from URL params
        const {
            firstName,
            middleName,
            lastName,
            referralType,
            referralCode,
            speciality,
            qualification,
            clinicName,
            address,
            city,
            state,
            pinCode,
            email,
            phone,
        } = req.body;

        if (!req.user.id) {
            return res.status(403).json({
                success: false,
                message: "Unauthorized: Clinic ID not found in user data.",
            });
        }

        // Find the referral under the same clinic
        let referral = await Referral.findOne({ _id: referralId, clinicId: req.user.id });

        if (!referral) {
            return res.status(404).json({ success: false, message: "Referral not found." });
        }

        // Update only provided fields
        const updateData = {};
        if (firstName) updateData.firstName = firstName;
        if (middleName) updateData.middleName = middleName;
        if (lastName) updateData.lastName = lastName;
        if (referralType) updateData.referralType = referralType;
        if (referralCode) updateData.referralCode = referralCode;
        if (speciality) updateData.speciality = speciality;
        if (qualification) updateData.qualification = qualification;
        if (clinicName) updateData.clinicName = clinicName;
        if (address) updateData.address = address;
        if (city) updateData.city = city;
        if (state) updateData.state = state;
        if (pinCode) updateData.pinCode = pinCode;
        if (email) updateData.email = email;
        if (phone) updateData.phone = phone;

        // Update the referral in the database
        referral = await Referral.findByIdAndUpdate(referralId, updateData, { new: true });

        return res.status(200).json({
            success: true,
            message: "Referral updated successfully.",
            referral,
        });
    } catch (error) {
        console.error("Error updating referral:", error);
        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
            error: error.message,
        });
    }
};

export { addReferral , getReferral,allReferrals, editReferral };
