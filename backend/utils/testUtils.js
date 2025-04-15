import fetch from "node-fetch";
import FormData from "form-data";
import fs from "fs";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

// Get current directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const API_URL = "http://localhost:3000/api";

// Function to create a test station
export async function createTestStation() {
  try {
    const formData = new FormData();

    // Add text fields
    formData.append("maTram", "TEST001");
    formData.append("diaChi", "123 Test Street, Test City");
    formData.append("maKhoa", "MK001");
    formData.append("sdt", "0987654321");
    formData.append("thongTinCap", "Test supply information");
    formData.append("ghiChu", "This is a test station");
    formData.append("tramCo", JSON.stringify(["Test1", "Test2"]));
    formData.append("loaiTru", "Exclude1");
    formData.append("chuDauTu", "Investor A");
    formData.append("phongMay", "Room X");
    formData.append("maPE", "PE123");
    formData.append("toaDo", "10.123,106.789");

    // Create a test image file
    const testImagePath = join(__dirname, "test-image.txt");
    fs.writeFileSync(
      testImagePath,
      "This is a test file representing an image"
    );

    // Add the test image
    formData.append("hinhAnh", fs.createReadStream(testImagePath));

    // Send the request
    const response = await fetch(`${API_URL}/stations`, {
      method: "POST",
      body: formData,
    });

    const result = await response.json();
    console.log("Created test station:", result);

    // Clean up the test image file
    fs.unlinkSync(testImagePath);

    return result;
  } catch (error) {
    console.error("Error creating test station:", error);
  }
}

// Function to get all stations
export async function getAllStations() {
  try {
    const response = await fetch(`${API_URL}/stations`);
    const stations = await response.json();
    console.log("All stations:", stations);
    return stations;
  } catch (error) {
    console.error("Error getting stations:", error);
  }
}

// Function to update a station
export async function updateStation(id) {
  try {
    const formData = new FormData();

    // Update some fields
    formData.append("maTram", "UPDATED001");
    formData.append("ghiChu", "This station has been updated");
    formData.append(
      "tramCo",
      JSON.stringify(["Updated1", "Updated2", "Updated3"])
    );

    // Send the request
    const response = await fetch(`${API_URL}/stations/${id}`, {
      method: "PUT",
      body: formData,
    });

    const result = await response.json();
    console.log("Updated station:", result);
    return result;
  } catch (error) {
    console.error("Error updating station:", error);
  }
}

// Function to delete a station
export async function deleteStation(id) {
  try {
    const response = await fetch(`${API_URL}/stations/${id}`, {
      method: "DELETE",
    });

    const result = await response.json();
    console.log("Delete result:", result);
    return result;
  } catch (error) {
    console.error("Error deleting station:", error);
  }
}
