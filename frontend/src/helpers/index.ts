export const getLastTwoInitials = (name?: string) => {
  if (!name) return 'VĐ'

  const parts = name.trim().split(/\s+/)
  const lastTwo = parts.slice(-2)
  return lastTwo.map((word) => word[0].toUpperCase()).join('')
}
