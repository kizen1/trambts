import multer from "multer";
import { existsSync, mkdirSync } from "fs";
import config from "../config.js";

// Ensure uploads directory exists
if (!existsSync(config.uploadsDir)) {
  mkdirSync(config.uploadsDir, { recursive: true });
}

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, config.uploadsDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const extension = file.originalname.split(".").pop();
    cb(null, `${uniqueSuffix}.${extension}`);
  },
});

// File filter to validate uploads
const fileFilter = (req, file, cb) => {
  // Accept images only
  if (file.mimetype.startsWith("image/")) {
    cb(null, true);
  } else {
    cb(new Error("Only image files are allowed!"), false);
  }
};

// Create the multer middleware
export const uploadMiddleware = multer({
  storage,
  fileFilter,
  limits: { fileSize: 15 * 1024 * 1024 }, // 5MB limit
}).array("hinhAnh", config.maxFileUploads);
