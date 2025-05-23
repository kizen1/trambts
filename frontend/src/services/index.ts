import axios from 'axios'

// Create an axios instance with base configuration
export const api = axios.create({
  // baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3000/api',
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json',
  },
})

// Add request interceptor to include auth token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('auth-token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})
