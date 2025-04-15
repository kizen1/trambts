import express from "express";
import cors from "cors";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
import { existsSync, mkdirSync } from "fs";

// Import routes
import stationRoutes from "./routers/stationRoutes.js";

// Get current directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Create necessary directories if they don't exist
const dataDir = join(__dirname, "data");
const uploadsDir = join(__dirname, "public", "uploads");

if (!existsSync(dataDir)) {
  mkdirSync(dataDir, { recursive: true });
}

if (!existsSync(uploadsDir)) {
  mkdirSync(uploadsDir, { recursive: true });
}

// Initialize Express app
const app = express();
app.use(cors());
app.use(express.json());
app.use("/uploads", express.static(uploadsDir));

// Use routes
app.use("/api", stationRoutes);

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(`Data directory: ${dataDir}`);
  console.log(`Uploads directory: ${uploadsDir}`);
});

console.log("Server initialized successfully");
