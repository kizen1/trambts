import { redirect } from '@tanstack/react-router'

export const parseJwt = (token: string) => {
  try {
    const base64Url = token.split('.')[1]
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/')
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map((c) => '%' + c.charCodeAt(0).toString(16).padStart(2, '0'))
        .join('')
    )
    return JSON.parse(jsonPayload)
  } catch (error) {
    console.log('Invalid JWT token:', error)
    return null
  }
}

export const getCurrentUser = () => {
  const token = localStorage.getItem('token')
  if (!token) return null
  try {
    return parseJwt(token)
  } catch {
    return null
  }
}

export const requireAuth = () => {
  const token = localStorage.getItem('token')
  if (!token) {
    throw redirect({ to: '/sign-in', replace: true })
  }
}
