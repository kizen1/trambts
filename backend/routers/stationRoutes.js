import express from "express";
import {
  getAllStations,
  getStationById,
  createStation,
  updateStation,
  deleteStation,
  deleteStationImage,
} from "../controllers/stationController.js";
import { uploadMiddleware } from "../middleware/uploadMiddleware.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

// Station routes
router.get("/", authMiddleware, getAllStations);
router.get("/:id", authMiddleware, getStationById);
router.post("/", authMiddleware, uploadMiddleware, createStation);
router.put("/:id", authMiddleware, uploadMiddleware, updateStation);
router.delete("/:id", authMiddleware, deleteStation);
router.delete("/:id/images/:filename", authMiddleware, deleteStationImage);

export default router;
