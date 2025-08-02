import { z } from 'zod'

const userStatusSchema = z.union([
  z.literal('active'),
  z.literal('inactive'),
  z.literal('invited'),
  z.literal('suspended'),
])
export type UserStatus = z.infer<typeof userStatusSchema>

const userRoleSchema = z.union([
  z.literal('admin'),
  z.literal('leader'),
  z.literal('member'),
])

const userSchema = z.object({
  id: z.string(),
  hoTen: z.string(),
  matKhau: z.string(),
  email: z.string(),
  sdt: z.string(),
  diaChi: z.string(),
  vaiTro: userRoleSchema,
  ghiChu: z.string(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
})
export type User = z.infer<typeof userSchema>

export const userListSchema = z.array(userSchema)
