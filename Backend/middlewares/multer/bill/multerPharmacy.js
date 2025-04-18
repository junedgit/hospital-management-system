import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "../../../config/cloudinary.js";

// Cloudinary storage setup
const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: "pharmacy_bills",
        allowedFormats: ["jpg", "jpeg", "png"],
    },
});

const upload = multer({ storage });

export default upload;
