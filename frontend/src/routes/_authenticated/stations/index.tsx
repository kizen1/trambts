import { createFileRoute } from '@tanstack/react-router'
import Stations from '@/features/stations'

export const Route = createFileRoute('/_authenticated/stations/')({
  component: Stations,
})
