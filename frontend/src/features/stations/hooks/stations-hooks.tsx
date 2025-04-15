import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { stationService } from '@/services/stationService'
import { toast } from 'sonner'
import { StationForm } from '../components/stations-action-dialog'

// Query keys for caching
export const stationKeys = {
  all: ['stations'] as const,
  details: (id: string) => [...stationKeys.all, id] as const,
}

// Hook to fetch all stations
export function useStations() {
  return useQuery({
    queryKey: stationKeys.all,
    queryFn: stationService.getAll,
  })
}

// Hook to fetch a single station
export function useStation(id: string) {
  return useQuery({
    queryKey: stationKeys.details(id),
    queryFn: () => stationService.getById(id),
    enabled: !!id, // Only run if id is provided
  })
}

// Hook to create a new station
export function useCreateStation() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: StationForm) => stationService.create(data),
    onSuccess: (newStation) => {
      // Invalidate the stations list query to refetch
      queryClient.invalidateQueries({ queryKey: stationKeys.all })

      // Optionally add the new station to the cache
      queryClient.setQueryData(stationKeys.details(newStation.id), newStation)

      toast.success('Station created successfully!')
    },
  })
}

// Hook to update a station
export function useUpdateStation(id: string) {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: Partial<StationForm>) => stationService.update(id, data),
    onSuccess: (updatedStation) => {
      // Update both the list and the individual station in the cache
      queryClient.invalidateQueries({ queryKey: stationKeys.all })
      queryClient.setQueryData(stationKeys.details(id), updatedStation)

      toast.success('Station updated successfully!')
    },
  })
}

// Hook to delete a station
export function useDeleteStation() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (id: string) => stationService.delete(id),
    onSuccess: (_, id) => {
      // Remove the station from the cache and invalidate the list
      queryClient.removeQueries({ queryKey: stationKeys.details(id) })
      queryClient.invalidateQueries({ queryKey: stationKeys.all })

      toast.success('Station deleted successfully!')
    },
  })
}

// Hook to delete a station image
export function useDeleteStationImage(stationId: string) {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (filename: string) =>
      stationService.deleteImage(stationId, filename),
    onSuccess: (updatedStation) => {
      // Invalidate the specific station to refetch with updated images
      queryClient.invalidateQueries({ queryKey: stationKeys.all })
      queryClient.setQueryData(stationKeys.details(stationId), updatedStation)
      queryClient.invalidateQueries({
        queryKey: stationKeys.details(stationId),
      })
      toast.success('Image deleted successfully!')
    },
  })
}
