import {
  IconCash,
  IconShield,
  IconUsersGroup,
  IconUserShield,
} from '@tabler/icons-react'
import { TramCoStatus } from './schema'

export const tramCoBadge = new Map<TramCoStatus, string>([
  ['2G', 'bg-teal-100/30 text-teal-900 dark:text-teal-200 border-teal-200'],
  ['3G', 'bg-neutral-300/40 border-neutral-300'],
  ['4G', 'bg-sky-200/40 text-sky-900 dark:text-sky-100 border-sky-300'],
  [
    '5G',
    'bg-destructive/10 dark:bg-destructive/50 text-destructive dark:text-primary border-destructive/10',
  ],
])

export const tramCoTypes = ['2G', '3G', '4G', '5G'] as const

export const loaiTruTypes = [
  {
    label: 'Monopol',
    value: 'monopol',
    icon: IconShield,
  },
  {
    label: 'Dây co',
    value: 'dayCo',
    icon: IconUserShield,
  },
  {
    label: 'Tam diện',
    value: 'tamDien',
    icon: IconUsersGroup,
  },
  {
    label: 'Tứ diện',
    value: 'tuDien',
    icon: IconCash,
  },
  {
    label: 'Tự đứng',
    value: 'tuDung',
    icon: IconCash,
  },
] as const

export const chuDauTuTypes = [
  {
    label: 'VNPT',
    value: 'vnpt',
    icon: IconShield,
  },
  {
    label: 'Viettel',
    value: 'viettel',
    icon: IconUserShield,
  },
  {
    label: 'VMS',
    value: 'vms',
    icon: IconUsersGroup,
  },
  {
    label: 'Xã Hội Hóa',
    value: 'xaHoiHoa',
    icon: IconCash,
  },
] as const

export const phongMayTypes = [
  {
    label: 'Shelter',
    value: 'shelter',
    icon: IconShield,
  },
  {
    label: 'Phòng cải tạo',
    value: 'phongCaiTao',
    icon: IconUserShield,
  },
  {
    label: 'Tủ Cabinet',
    value: 'tuCabinet',
    icon: IconUsersGroup,
  },
] as const
