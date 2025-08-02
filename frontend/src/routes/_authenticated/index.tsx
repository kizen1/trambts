import { createFileRoute } from '@tanstack/react-router'
import { requireAuth } from '@/features/auth/helpers/auth'
import Dashboard from '@/features/dashboard'

export const Route = createFileRoute('/_authenticated/')({
  component: Dashboard,
  beforeLoad: requireAuth,
})
