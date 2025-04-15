import fs from 'fs/promises';
import { existsSync } from 'fs';
import config from '../config.js';

// Helper function to read stations data
export async function getStations() {
  try {
    if (!existsSync(config.stationsFile)) {
      await saveStations([]);
      return [];
    }
    
    const data = await fs.readFile(config.stationsFile, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error reading stations data:', error);
    // If file doesn't exist or is empty, return empty array
    return [];
  }
}

// Helper function to write stations data
export async function saveStations(stations) {
  try {
    await fs.writeFile(config.stationsFile, JSON.stringify(stations, null, 2), 'utf8');
    return true;
  } catch (error) {
    console.error('Error saving stations data:', error);
    throw error;
  }
}

// Initialize data file if it doesn't exist
export async function initializeDataFile() {
  try {
    if (!existsSync(config.stationsFile)) {
      await saveStations([]);
      console.log('Initialized empty stations data file');
    }
  } catch (error) {
    console.error('Failed to initialize data file:', error);
  }
}