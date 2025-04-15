import { z } from 'zod'

const tramCoSchema = z.union([
  z.literal('2G'),
  z.literal('3G'),
  z.literal('4G'),
  z.literal('5G'),
])
export type TramCoStatus = z.infer<typeof tramCoSchema>

const loaiTruSchema = z.union([
  z.literal('monopol'),
  z.literal('dayCo'),
  z.literal('tamDien'),
  z.literal('tuDien'),
  z.literal('tuDung'),
])

const chuDauTuSchema = z.union([
  z.literal('vnpt'),
  z.literal('viettel'),
  z.literal('vms'),
  z.literal('xaHoiHoa'),
])

const phongMaySchema = z.union([
  z.literal('shelter'),
  z.literal('phongCaiTao'),
  z.literal('tuCabinet'),
])

const stationSchema = z.object({
  id: z.string(),
  maTram: z.string(),
  diaChi: z.string(),
  maKhoa: z.string(),
  sdt: z.string(),
  thongTinCap: z.string(),
  ghiChu: z.string(),
  tramCo: z.array(tramCoSchema),
  loaiTru: loaiTruSchema,
  chuDauTu: chuDauTuSchema,
  phongMay: phongMaySchema,
  maPE: z.string(),
  toaDo: z.string(),
  hinhAnh: z.array(z.instanceof(File)),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
})
export type Station = z.infer<typeof stationSchema>

export const stationListSchema = z.array(stationSchema)
