import { UserForm } from '@/features/users/components/users-action-dialog'
import { User } from '@/features/users/data/schema'
import { api } from '.'

export const userService = {
  // Get all users
  getAll: async (): Promise<User[]> => {
    const response = await api.get('/users')
    return response.data
  },

  // Get user by ID
  getById: async (id: string): Promise<User> => {
    const response = await api.get(`/users/${id}`)
    return response.data
  },

  // Create a new user
  create: async (data: UserForm): Promise<User> => {
    const response = await api.post('/users', data)

    return response.data
  },

  // Update a user
  update: async (id: string, data: Partial<UserForm>): Promise<User> => {
    const response = await api.put(`/users/${id}`, data)

    return response.data
  },

  // Delete a user
  delete: async (id: string): Promise<void> => {
    await api.delete(`/users/${id}`)
  },
}
