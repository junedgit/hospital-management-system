import Admin from "../../models/superAdmin/admin.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const signup = async (req, res) => {
    const { name, password } = req.body;
    try {
        const existing = await Admin.findOne({ name });

        if (existing) {
            await res.status().json({
                success: false,
                message: "admin credential already exist",
            });
        }
        if (password.length < 8) {
            res.status().json({
                success: false,
                message: "password length should be atleast 8",
            });
        }
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(password, salt);

        const newAdmin = await new Admin({
            name: name,
            password: hash,
        });
        const admin = await newAdmin.save();
        const token = await generateToken(admin._id);
        res.json({
            success: true,
            message: "new admin created",
            token: token,
        });
    } catch (error) {
        console.log(error);
        res.status().json({ success: false, message: error.message });
    }
};

const generateToken = async (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "1h" });
};

const loginUser = async (req, res) => {
    const { name, password } = req.body;
    try {
        const admin = await Admin.findOne({ name });
        if (!admin) {
            return res.json({ success: false, message: "user doesn't exist" });
        }

        const isMatch = await bcrypt.compare(password, admin.password);
        if (!isMatch) {
            return res.json({
                success: false,
                message: "enter correct password",
            });
        }
        const token = await generateToken(admin._id);
        res.json({ success: true, token: token });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "error" });
    }
};

const passwordChange = async (req, res) => {
    try {
        const { name, newPassword } = req.body;

        if (!name || !newPassword) {
            return res.status(400).json({
                success: false,
                message: "Name,  and new password are required.",
            });
        }

        const admin = await Admin.findOne({ name });
        if (!admin) {
            return res.status(404).json({
                success: false,
                message: "No admin with this name exists.",
            });
        }

        // Hash the new password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(newPassword, salt);

        // Update admin's password
        admin.password = hashedPassword;
        await admin.save();

        res.status(200).json({
            success: true,
            message: "Password updated successfully.",
            admin,
        });
    } catch (error) {
        console.error("Error changing password:", error);
        res.status(500).json({
            success: false,
            message: `An error occurred: ${error.message}`,
        });
    }
};

export { loginUser, signup, passwordChange };
