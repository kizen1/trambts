import multer from "multer";
import { existsSync, mkdirSync } from "fs";
import path from "path";
import config from "../config.js";

// Ensure uploads directory exists
if (!existsSync(config.uploadsDir)) {
  mkdirSync(config.uploadsDir, { recursive: true });
}

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const maTram = req.body.maTram;

    if (!maTram) {
      return cb(
        new Error("Station code (maTram) is required for file uploads"),
        null
      );
    }

    const stationUploadDir = path.join(config.uploadsDir, maTram);

    if (!existsSync(stationUploadDir)) {
      mkdirSync(stationUploadDir, { recursive: true });
    }

    cb(null, stationUploadDir);
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
  limits: { fileSize: config.maxFileSize }, // 5MB limit
}).array("hinhAnh", config.maxFileUploads);
