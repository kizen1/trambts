import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { userService } from '@/services/userService'
import { toast } from 'sonner'
import { UserForm } from '@/features/users/components/users-action-dialog'

// Query keys for caching
export const userKeys = {
  all: ['users'] as const,
  details: (id: string) => [...userKeys.all, id] as const,
}

// Hook to fetch all users
export function useUsers() {
  return useQuery({
    queryKey: userKeys.all,
    queryFn: userService.getAll,
  })
}

// Hook to fetch a single user
export function useUser(id: string) {
  return useQuery({
    queryKey: userKeys.details(id),
    queryFn: () => userService.getById(id),
    enabled: !!id, // Only run if id is provided
  })
}

// Hook to create a new user
export function useCreateUser() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: UserForm) => userService.create(data),
    onSuccess: (newUser) => {
      // Invalidate the users list query to refetch
      queryClient.invalidateQueries({ queryKey: userKeys.all })

      // Optionally add the new user to the cache
      queryClient.setQueryData(userKeys.details(newUser.id), newUser)

      toast.success('Tạo mới người dùng thành công!')
    },
    onError: (_error, _variables, _context) => {
      toast.error('Tạo mới người dùng thất bại!')
    },
  })
}

// Hook to update a user
export function useUpdateUser(id?: string) {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: Partial<UserForm>) => {
      if (!id) throw new Error('Missing user ID')
      return userService.update(id, data)
    },
    onSuccess: (updatedUser) => {
      if (!id) throw new Error('Missing user ID')
      // Update both the list and the individual user in the cache
      queryClient.invalidateQueries({ queryKey: userKeys.all })
      queryClient.setQueryData(userKeys.details(id), updatedUser)

      toast.success('Cập nhật người dùng thành công!')
    },
    onError: (_error, _variables, _context) => {
      toast.error('Cập nhật người dùng thất bại!')
    },
  })
}

// Hook to delete a user
export function useDeleteUser() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (id: string) => userService.delete(id),
    onSuccess: (_, id) => {
      // Remove the user from the cache and invalidate the list
      queryClient.removeQueries({ queryKey: userKeys.details(id) })
      queryClient.invalidateQueries({ queryKey: userKeys.all })

      toast.success('Xóa người dùng thành công!')
    },
    onError: (_error, _variables, _context) => {
      toast.error('Xóa người dùng thất bại!')
    },
  })
}
