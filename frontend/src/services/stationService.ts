import { StationForm } from '@/features/stations/components/stations-action-dialog'
import { Station } from '@/features/stations/data/schema'
import { api } from '.'

export const stationService = {
  // Get all stations
  getAll: async (): Promise<Station[]> => {
    const response = await api.get('/stations')
    return response.data
  },

  // Get station by ID
  getById: async (id: string): Promise<Station> => {
    const response = await api.get(`/stations/${id}`)
    return response.data
  },

  // Create a new station
  create: async (data: StationForm): Promise<Station> => {
    // For FormData, we need to handle it differently
    const formData = new FormData()

    // Add text fields
    Object.entries(data).forEach(([key, value]) => {
      if (key === 'hinhAnh') return // Skip files, handle separately

      // Handle arrays by converting to JSON strings
      if (Array.isArray(value)) {
        formData.append(key, JSON.stringify(value))
      } else {
        formData.append(key, value as string)
      }
    })

    // Add files if present
    if (data.hinhAnh) {
      for (const file of data.hinhAnh) {
        formData.append('hinhAnh', file)
      }
    }

    const response = await api.post('/stations', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })

    return response.data
  },

  // Update a station
  update: async (id: string, data: Partial<StationForm>): Promise<Station> => {
    const formData = new FormData()

    // Add text fields
    Object.entries(data).forEach(([key, value]) => {
      if (key === 'hinhAnh') return // Skip files, handle separately

      // Handle arrays by converting to JSON strings
      if (Array.isArray(value)) {
        formData.append(key, JSON.stringify(value))
      } else if (value !== undefined) {
        formData.append(key, value as string)
      }
    })

    // Add files if present
    if (data.hinhAnh) {
      for (const file of data.hinhAnh) {
        formData.append('hinhAnh', file)
      }
    }

    const response = await api.put(`/stations/${id}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })

    return response.data
  },

  // Delete a station
  delete: async (id: string): Promise<void> => {
    await api.delete(`/stations/${id}`)
  },

  // Delete a station image
  deleteImage: async (stationId: string, filename: string): Promise<void> => {
    await api.delete(`/stations/${stationId}/images/${filename}`)
  },
}
