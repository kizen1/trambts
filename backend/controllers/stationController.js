import { v4 as uuidv4 } from "uuid";
import fs from "fs/promises";
import { join } from "path";
import config from "../config.js";
import { getStations, saveStations } from "../utils/dataUtils.js";
import { existsSync } from "fs";

function getImagePath(maTram, filename) {
  return `/uploads/${maTram}/${filename}`;
}

// Get all stations
export const getAllStations = async (req, res) => {
  try {
    const stations = await getStations();

    const sortedStations = stations.sort(
      (a, b) => new Date(b.updatedAt) - new Date(a.updatedAt)
    );

    res.json(sortedStations);
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

    // Get uploaded files info with maTram-specific paths
    const uploadedFiles = req.files
      ? req.files.map((file) => {
          const filename = file.filename;
          return {
            filename,
            path: getImagePath(req.body.maTram, filename),
          };
        })
      : [];

    const newStation = {
      id: uuidv4(),
      maTram: req.body.maTram || "",
      nhanVienQuanLy: req.body.nhanVienQuanLy || "",
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

    const oldStation = stations[stationIndex];
    const newMaTram = req.body.maTram || oldStation.maTram;
    const maTramChanged = newMaTram !== oldStation.maTram;

    // Get uploaded files info with maTram-specific paths
    const uploadedFiles = req.files
      ? req.files.map((file) => {
          const filename = file.filename;
          return {
            filename,
            path: getImagePath(newMaTram, filename),
          };
        })
      : [];

    // Handle existing images
    let hinhAnh = oldStation.hinhAnh || [];

    // If maTram changed, we need to move existing images to the new directory
    if (maTramChanged && hinhAnh.length > 0) {
      const newUploadDir = join(config.uploadsDir, newMaTram);

      // Create the new directory if it doesn't exist
      if (!existsSync(newUploadDir)) {
        await fs.mkdir(newUploadDir, { recursive: true });
      }

      // Move each image to the new directory and update paths
      for (const img of hinhAnh) {
        const oldFilePath = join(
          config.uploadsDir,
          oldStation.maTram,
          img.filename
        );
        const newFilePath = join(newUploadDir, img.filename);

        try {
          await fs.copyFile(oldFilePath, newFilePath);
          await fs.unlink(oldFilePath);

          // Update the path in the image object
          img.path = getImagePath(newMaTram, img.filename);
        } catch (err) {
          console.error(`Failed to move image ${img.filename}:`, err);
        }
      }

      // Try to remove the old directory if it's empty
      try {
        const oldUploadDir = join(config.uploadsDir, oldStation.maTram);
        const files = await fs.readdir(oldUploadDir);
        if (files.length === 0) {
          await fs.rmdir(oldUploadDir);
        }
      } catch (err) {
        console.error("Failed to remove old directory:", err);
      }
    }

    // Combine existing images with new uploads if needed
    if (uploadedFiles.length > 0) {
      if (req.body.keepExistingImages === "false") {
        // Delete old image files
        for (const img of hinhAnh) {
          try {
            const oldFilePath = join(
              config.uploadsDir,
              oldStation.maTram,
              img.filename
            );
            await fs.unlink(oldFilePath);
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
      ...oldStation,
      maTram: newMaTram,
      nhanVienQuanLy: req.body.nhanVienQuanLy || oldStation.nhanVienQuanLy,
      diaChi: req.body.diaChi || oldStation.diaChi,
      maKhoa: req.body.maKhoa || oldStation.maKhoa,
      sdt: req.body.sdt || oldStation.sdt,
      thongTinCap: req.body.thongTinCap || oldStation.thongTinCap,
      ghiChu: req.body.ghiChu || oldStation.ghiChu,
      tramCo: req.body.tramCo ? JSON.parse(req.body.tramCo) : oldStation.tramCo,
      loaiTru: req.body.loaiTru || oldStation.loaiTru,
      chuDauTu: req.body.chuDauTu || oldStation.chuDauTu,
      phongMay: req.body.phongMay || oldStation.phongMay,
      maPE: req.body.maPE || oldStation.maPE,
      toaDo: req.body.toaDo || oldStation.toaDo,
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
      const stationUploadDir = join(config.uploadsDir, station.maTram);

      for (const img of station.hinhAnh) {
        try {
          await fs.unlink(join(stationUploadDir, img.filename));
        } catch (err) {
          console.error("Failed to delete image:", err);
        }
      }

      // Try to remove the directory if it's empty
      try {
        const files = await fs.readdir(stationUploadDir);
        if (files.length === 0) {
          await fs.rmdir(stationUploadDir);
        }
      } catch (err) {
        console.error("Failed to remove directory:", err);
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
        join(
          config.uploadsDir,
          station.maTram,
          station.hinhAnh[imageIndex].filename
        )
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
