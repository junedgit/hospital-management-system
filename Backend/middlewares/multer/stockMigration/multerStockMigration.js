import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "../../../config/cloudinary.js";

// Cloudinary storage setup
const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: async (req, file) => {
      return {
        folder: "stock-migrations",
        resource_type: "raw", // <-- this is IMPORTANT for non-image files
        public_id: `${Date.now()}-${file.originalname.split(".")[0]}`,
        format: file.mimetype === "text/csv" ? "csv" : "xlsx",
      };
    },
  });

const upload = multer({ storage });

export default upload;
