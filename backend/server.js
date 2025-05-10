import express from "express";
import cors from "cors";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
import { existsSync, mkdirSync } from "fs";

// Import routes and middleware
import stationRoutes from "./routers/stationRoutes.js";
import { errorHandler } from "./middleware/errorMiddleware.js";
import config from "./config.js";

// Get current directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Create necessary directories if they don't exist
if (!existsSync(config.dataDir)) {
  mkdirSync(config.dataDir, { recursive: true });
}

if (!existsSync(config.uploadsDir)) {
  mkdirSync(config.uploadsDir, { recursive: true });
}

// Initialize Express app
const app = express();
app.use(cors());
app.use(express.json());

// Serve static files from the uploads directory
// This makes files accessible at /uploads/{maTram}/{filename}
app.use("/uploads", express.static(config.uploadsDir));

// Use routes
app.use("/api", stationRoutes);

// Error handling middleware (must be after routes)
app.use(errorHandler);

// Start the server
const PORT = process.env.PORT || 3000;

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(`Data directory: ${config.dataDir}`);
  console.log(`Uploads directory: ${config.uploadsDir}`);
});
