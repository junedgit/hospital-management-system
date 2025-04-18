import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "../config/cloudinary.js";

const storage = new CloudinaryStorage({
    cloudinary,
    params: {
        folder: "patients", // Cloudinary folder name
        allowed_formats: ["jpg", "jpeg", "png", "webp"], // Allowed image types
        transformation: [{ width: 500, height: 500, crop: "limit" }], // Optional resizing
    },
});

const upload = multer({ storage });

export default upload;
