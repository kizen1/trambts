import { v4 as uuidv4 } from "uuid";
import fs from "fs/promises";
import { join } from "path";
import config from "../config.js";
import { getStations, saveStations } from "../utils/dataUtils.js";

// Get all stations
export const getAllStations = async (req, res) => {
  try {
    const stations = await getStations();
    res.json(stations);
  } catch (error) {
    console.error("Error fetching stations:", error);
    res.status(500).json({ error: "Failed to retrieve stations" });
  }
};

// Get a single station by ID
export const getStationById = async (req, res) => {
  try {
    const stations = await getStations();
    const station = stations.find((s) => s.id === req.params.id);

    if (!station) {
      return res.status(404).json({ error: "Station not found" });
    }

    res.json(station);
  } catch (error) {
    console.error("Error fetching station:", error);
    res.status(500).json({ error: "Failed to retrieve station" });
  }
};

// Create a new station
export const createStation = async (req, res) => {
  try {
    const stations = await getStations();

    // Get uploaded files info
    const uploadedFiles = req.files
      ? req.files.map((file) => ({
          filename: file.filename,
          path: `http://localhost:3000/uploads/${file.filename}`,
        }))
      : [];

    const newStation = {
      id: uuidv4(),
      maTram: req.body.maTram || "",
      diaChi: req.body.diaChi || "",
      maKhoa: req.body.maKhoa || "",
      sdt: req.body.sdt || "",
      thongTinCap: req.body.thongTinCap || "",
      ghiChu: req.body.ghiChu || "",
      tramCo: req.body.tramCo ? JSON.parse(req.body.tramCo) : [],
      loaiTru: req.body.loaiTru || "",
      chuDauTu: req.body.chuDauTu || "",
      phongMay: req.body.phongMay || "",
      maPE: req.body.maPE || "",
      toaDo: req.body.toaDo || "",
      hinhAnh: uploadedFiles,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    stations.push(newStation);
    await saveStations(stations);

    res.status(201).json(newStation);
  } catch (error) {
    console.error("Error creating station:", error);
    res.status(500).json({ error: "Failed to create station" });
  }
};

// Update a station
export const updateStation = async (req, res) => {
  try {
    const stations = await getStations();
    const stationIndex = stations.findIndex((s) => s.id === req.params.id);

    if (stationIndex === -1) {
      return res.status(404).json({ error: "Station not found" });
    }

    // Get uploaded files info
    const uploadedFiles = req.files
      ? req.files.map((file) => ({
          filename: file.filename,
          path: `http://localhost:3000/uploads/${file.filename}`,
        }))
      : [];

    // Combine existing images with new uploads if needed
    let hinhAnh = stations[stationIndex].hinhAnh || [];
    if (uploadedFiles.length > 0) {
      if (req.body.keepExistingImages === "false") {
        // Delete old image files
        for (const img of hinhAnh) {
          try {
            await fs.unlink(join(config.uploadsDir, img.filename));
          } catch (err) {
            console.error("Failed to delete image:", err);
          }
        }
        hinhAnh = uploadedFiles;
      } else {
        hinhAnh = [...hinhAnh, ...uploadedFiles];
      }
    }

    const updatedStation = {
      ...stations[stationIndex],
      maTram: req.body.maTram || stations[stationIndex].maTram,
      diaChi: req.body.diaChi || stations[stationIndex].diaChi,
      maKhoa: req.body.maKhoa || stations[stationIndex].maKhoa,
      sdt: req.body.sdt || stations[stationIndex].sdt,
      thongTinCap: req.body.thongTinCap || stations[stationIndex].thongTinCap,
      ghiChu: req.body.ghiChu || stations[stationIndex].ghiChu,
      tramCo: req.body.tramCo
        ? JSON.parse(req.body.tramCo)
        : stations[stationIndex].tramCo,
      loaiTru: req.body.loaiTru || stations[stationIndex].loaiTru,
      chuDauTu: req.body.chuDauTu || stations[stationIndex].chuDauTu,
      phongMay: req.body.phongMay || stations[stationIndex].phongMay,
      maPE: req.body.maPE || stations[stationIndex].maPE,
      toaDo: req.body.toaDo || stations[stationIndex].toaDo,
      hinhAnh,
      updatedAt: new Date().toISOString(),
    };

    stations[stationIndex] = updatedStation;
    await saveStations(stations);

    res.json(updatedStation);
  } catch (error) {
    console.error("Error updating station:", error);
    res.status(500).json({ error: "Failed to update station" });
  }
};

// Delete a station
export const deleteStation = async (req, res) => {
  try {
    const stations = await getStations();
    const stationIndex = stations.findIndex((s) => s.id === req.params.id);

    if (stationIndex === -1) {
      return res.status(404).json({ error: "Station not found" });
    }

    // Delete image files
    const station = stations[stationIndex];
    if (station.hinhAnh && station.hinhAnh.length > 0) {
      for (const img of station.hinhAnh) {
        try {
          await fs.unlink(join(config.uploadsDir, img.filename));
        } catch (err) {
          console.error("Failed to delete image:", err);
        }
      }
    }

    // Remove station from array
    stations.splice(stationIndex, 1);
    await saveStations(stations);

    res.json({ message: "Station deleted successfully" });
  } catch (error) {
    console.error("Error deleting station:", error);
    res.status(500).json({ error: "Failed to delete station" });
  }
};

// Delete an image from a station
export const deleteStationImage = async (req, res) => {
  try {
    const stations = await getStations();
    const stationIndex = stations.findIndex((s) => s.id === req.params.id);

    if (stationIndex === -1) {
      return res.status(404).json({ error: "Station not found" });
    }

    const station = stations[stationIndex];
    const imageIndex = station.hinhAnh.findIndex(
      (img) => img.filename === req.params.filename
    );

    if (imageIndex === -1) {
      return res.status(404).json({ error: "Image not found" });
    }

    // Delete the file
    try {
      await fs.unlink(
        join(config.uploadsDir, station.hinhAnh[imageIndex].filename)
      );
    } catch (err) {
      console.error("Failed to delete image file:", err);
    }

    // Remove from station's image array
    station.hinhAnh.splice(imageIndex, 1);
    station.updatedAt = new Date().toISOString();

    await saveStations(stations);

    res.json({ message: "Image deleted successfully" });
  } catch (error) {
    console.error("Error deleting image:", error);
    res.status(500).json({ error: "Failed to delete image" });
  }
};
