import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import Clinic from "../models/superAdmin/clinic.model.js";
import ClinicUser from "../models/clinicAdmin/userManagement/clinicUser.model.js";

const generateToken = (id, role) => {
    return jwt.sign({ id, role }, process.env.JWT_SECRET, { expiresIn: "1h" });
};

const login = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({ message: "Name, email, and password are required." });
        }

        let user = await Clinic.findOne({ clinicName: name, email });
        let tokenPayload = null;
        let userRole = "clinicAdmin"; // Default role for Clinic

        if (!user) {
            user = await ClinicUser.findOne({ userName: name, email });
            if (user) {
                tokenPayload = user.clinicId; // Use clinicId for ClinicUser
                userRole = user.role || "clinicUser"; // Assign role, defaulting to clinicUser
            }
        }

        if (!user) {
            return res.status(404).json({ message: "User not found." });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return res.status(401).json({ message: "Invalid credentials." });
        }

        // Generate token with (id, role)
        const token = generateToken(tokenPayload || user._id, userRole);

        res.status(200).json({ message: "Login successful", token });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error", error: error.message });
    }
};


export default login;
