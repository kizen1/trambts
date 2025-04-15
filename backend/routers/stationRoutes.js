import express from 'express';
import { 
  getAllStations, 
  getStationById, 
  createStation, 
  updateStation, 
  deleteStation,
  deleteStationImage
} from '../controllers/stationController.js';
import { uploadMiddleware } from '../middleware/uploadMiddleware.js';

const router = express.Router();

// Station routes
router.get('/stations', getAllStations);
router.get('/stations/:id', getStationById);
router.post('/stations', uploadMiddleware, createStation);
router.put('/stations/:id', uploadMiddleware, updateStation);
router.delete('/stations/:id', deleteStation);
router.delete('/stations/:id/images/:filename', deleteStationImage);

export default router;