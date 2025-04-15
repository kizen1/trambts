import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default {
  dataDir: join(__dirname, "data"),
  uploadsDir: join(__dirname, "public", "uploads"),
  stationsFile: join(__dirname, "data", "stations.json"),
  maxFileUploads: 10,
  port: process.env.PORT || 3000,
};
