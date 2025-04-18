import ClinicUser from "../../../models/clinicAdmin/userManagement/clinicUser.model.js";
import Clinic from "../../../models/superAdmin/clinic.model.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";    

const loginClinicAdmin = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({ message: "Name, email, and password are required." });
        }

        // Find the clinic admin by name and email
        const clinicAdmin = await Clinic.findOne({ clinicName: name, email: email });

        if (!clinicAdmin) {
            return res.status(404).json({ message: "Clinic Admin not found." });
        }

        // Compare provided password with stored hashed password
        const isPasswordValid = await bcrypt.compare(password, clinicAdmin.password);

        if (!isPasswordValid) {
            return res.status(401).json({ message: "Invalid credentials. Please try again." });
        }

        // Generate token upon successful login
        const token = await generateToken(clinicAdmin._id);
        
        res.status(200).json({ message: "Login successful", token });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

const generateRandomPassword = () => {
    const randomNumbers = Math.floor(1000 + Math.random() * 9000); // Generate 4-digit number
    return `ClinicUser${randomNumbers}`;
}; 

const generateToken = async (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "1h" });
};

const addClinicUser = async (req, res) => {
    try {
        const {
            firstName,
            lastName,
            email,
            phoneNumber,
            address,
            city,
            state,
            pinCode,
            userName,
            department,
            role,
        } = req.body;

        if (
            !firstName ||
            !lastName ||
            !email ||
            !phoneNumber ||
            !address ||
            !userName ||
            !department ||
            !role
        ) {
            return res
                .status(400)
                .json({ message: "All required fields must be provided." });
        }

        const existingUser = await ClinicUser.findOne({
            $or: [{ email }, { phoneNumber }, { userName }],
        });

        if (existingUser) {
            return res.status(400).json({
                message:
                    "User with provided email, phone number, or username already exists.",
            });
        }
        const clinicId = req.user.id;
        const access =role;
        if (!clinicId) {
            return res.status(403).json({
                success: false,
                message: "Unauthorized: Clinic ID not found in user data.",
            });
        }
        const rawPassword = generateRandomPassword();
        const hashedPassword = await bcrypt.hash(rawPassword, 10);
        const clinic = await Clinic.findOne({ _id: clinicId });
        if (clinic.usersAllowed > 0) {
            const newUser = new ClinicUser({
                firstName,
                lastName,
                email,
                phoneNumber,
                address,
                city,
                state,
                pinCode,
                userName,
                department,
                role,
                clinicId,
                password: hashedPassword,
            });

            await newUser.save();

            clinic.usersAllowed -= 1;
            await clinic.save();
            res.status(201).json({
                message: "User created successfully",
                user: newUser,
                rawPassword,
                access  
            });
        } else {
            res.status(400).json({ message: "User limit reached" });
        }

        // Create new user
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error", error: error.message });
        console.log("Received Data:", req.body);
    }
};

const listClinicUsers = async (req, res) => {
    try {
        let { firstName, department, role, page, limit } = req.query;

        // Default pagination values
        page = parseInt(page) || 1;
        limit = parseInt(limit) || 10;
        const skip = (page - 1) * limit;

        let filter = { clinicId: req.user.id }; // Ensure clinicId is part of the filter
        if (firstName) {
            filter.$or = [
                { firstName: { $regex: firstName, $options: "i" } },
                // { lastName: { $regex: lastName, $options: "i" } }
            ];
        }
        if (department) {
            filter.department = { $regex: department, $options: "i" };
        }
        if (role) {
            filter.role = { $regex: role, $options: "i" };
        }

        const users = await ClinicUser.find(filter) // Filter is passed directly here
            .skip(skip)
            .limit(limit);

        // Count total documents matching the filter (with clinicId applied as well)
        const totalUsers = await ClinicUser.countDocuments(filter);

        res.status(200).json({
            totalUsers,
            totalPages: Math.ceil(totalUsers / limit),
            currentPage: page,
            users,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

const editClinicUser = async (req, res) => {
    try {
        const { id } = req.params; // Extract ID from params
        const {
            firstName,
            lastName,
            email,
            phoneNumber,
            address,
            city,
            state,
            pinCode,
            userName,
            department,
            role,
        } = req.body;

        if (!id) {
            return res.status(400).json({ message: "User ID is required" });
        }

        // Ensure id is a valid MongoDB ObjectId
        if (!id.match(/^[0-9a-fA-F]{24}$/)) {
            return res.status(400).json({ message: "Invalid User ID format" });
        }

        const update = {};
        if (firstName) update.firstName = firstName;
        if (lastName) update.lastName = lastName;
        if (email) update.email = email;
        if (phoneNumber) update.phoneNumber = phoneNumber;
        if (address) update.address = address;
        if (city) update.city = city;
        if (state) update.state = state;
        if (pinCode) update.pinCode = pinCode;
        if (userName) update.userName = userName;
        if (department) update.department = department;
        if (role) update.role = role;

        const updatedClinicUser = await ClinicUser.findByIdAndUpdate(
            id,
            { $set: update },
            { new: true, runValidators: true }
        );

        if (!updatedClinicUser) {
            return res
                .status(404)
                .json({ success: false, message: "Clinic user not found" });
        }

        return res.status(200).json({
            success: true,
            message: "Clinic user updated successfully",
            updatedClinicUser,
        });
    } catch (error) {
        console.error("Error updating clinic user:", error);
        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
            error: error.message,
        });
    }
};

const getClinicUser = async (req, res) => {
    try {
        const { id } = req.params;

        // Check if ID is provided
        if (!id) {
            return res.status(400).json({ success: false, message: "User ID is required" });
        }

        // Validate MongoDB ObjectId format
        if (!id.match(/^[0-9a-fA-F]{24}$/)) {
            return res.status(400).json({ success: false, message: "Invalid User ID format" });
        }

        // Find the user in the database
        const user = await ClinicUser.findById(id);

        // Check if user exists
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        // Return user data
        return res.status(200).json({ success: true, message: "User found", user });
    } catch (error) {
        console.error("Error fetching clinic user:", error);
        return res.status(500).json({ success: false, message: "Internal server error" });
    }
};


export { addClinicUser, loginClinicAdmin, listClinicUsers, editClinicUser,getClinicUser };
