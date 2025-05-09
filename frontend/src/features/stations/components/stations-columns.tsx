import { useState } from 'react'
import { VisuallyHidden } from '@radix-ui/react-visually-hidden'
import { Link } from '@tanstack/react-router'
import { ColumnDef } from '@tanstack/react-table'
import { cn } from '@/lib/utils'
import { Badge } from '@/components/ui/badge'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import LongText from '@/components/long-text'
import { useStationContext } from '../context/stations-context'
import {
  chuDauTuTypes,
  loaiTruTypes,
  phongMayTypes,
  tramCoBadge,
} from '../data/data'
import { Station } from '../types'
import { DataTableColumnHeader } from './data-table-column-header'
import { DataTableRowActions } from './data-table-row-actions'

export const columns: ColumnDef<Station>[] = [
  {
    accessorKey: 'maTram',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Mã Trạm' />
    ),
    cell: ({ row }) => {
      const { setOpen, setCurrentRow } = useStationContext()

      return (
        <div
          onClick={() => {
            setCurrentRow(row.original)
            setOpen('edit')
          }}
        >
          <LongText className='max-w-36'>{row.getValue('maTram')}</LongText>
        </div>
      )
    },
    meta: {
      className: cn(
        'drop-shadow-[0_1px_2px_rgb(0_0_0_/_0.1)] dark:drop-shadow-[0_1px_2px_rgb(255_255_255_/_0.1)] lg:drop-shadow-none',
        'bg-background transition-colors duration-200 group-hover/row:bg-muted group-data-[state=selected]/row:bg-muted',
        'sticky left-0 md:table-cell cursor-pointer'
      ),
    },
    enableHiding: false,
  },
  {
    id: 'nhanVienQuanLy',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Nhân viên quản lý' />
    ),
    cell: ({ row }) => {
      return (
        <LongText className='max-w-36'>
          {row.getValue('nhanVienQuanLy')}
        </LongText>
      )
    },
    meta: { className: 'w-36' },
    enableSorting: false,
  },
  {
    id: 'diaChi',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Địa chỉ' />
    ),
    cell: ({ row }) => {
      return <LongText className='max-w-36'>{row.original.diaChi}</LongText>
    },
    meta: { className: 'w-36' },
  },
  {
    id: 'maKhoa',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Mã khóa' />
    ),
    cell: ({ row }) => {
      return <LongText className='max-w-36'>{row.original.maKhoa}</LongText>
    },
    meta: { className: 'w-36' },
  },
  {
    accessorKey: 'sdt',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='SĐT liên hệ' />
    ),
    cell: ({ row }) => <div>{row.getValue('sdt')}</div>,
    enableSorting: false,
  },
  {
    accessorKey: 'thongTinCap',
    id: 'thongTinCap',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Thông tỉn cáp' />
    ),
    cell: ({ row }) => {
      return (
        <LongText className='max-w-36'>{row.original.thongTinCap}</LongText>
      )
    },
    meta: { className: 'w-36' },
  },
  {
    id: 'ghiChu',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Ghi chú' />
    ),
    cell: ({ row }) => {
      return <LongText className='max-w-36'>{row.original.ghiChu}</LongText>
    },
    meta: { className: 'w-36' },
  },
  {
    accessorKey: 'tramCo',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Trạm có' />
    ),
    cell: ({ row }) => {
      const { tramCo } = row.original

      return (
        <div className='grid w-18 grid-cols-2 gap-2'>
          {tramCo?.map((item) => (
            <Badge
              key={item}
              variant='outline'
              className={cn('capitalize', tramCoBadge.get(item))}
            >
              {item}
            </Badge>
          ))}
        </div>
      )
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id))
    },
    enableHiding: false,
    enableSorting: false,
  },
  {
    accessorKey: 'loaiTru',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Loại trụ' />
    ),
    cell: ({ row }) => {
      const { loaiTru } = row.original

      const loaiTruType = loaiTruTypes.find(({ value }) => value === loaiTru)

      if (!loaiTruType) {
        return null
      }

      return (
        <div className='flex items-center gap-x-2'>
          {loaiTruType.icon && (
            <loaiTruType.icon size={16} className='text-muted-foreground' />
          )}
          <span className='text-sm capitalize'>{loaiTruType.label}</span>
        </div>
      )
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id))
    },
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'chuDauTu',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Chủ đầu tư' />
    ),
    cell: ({ row }) => {
      const { chuDauTu } = row.original

      const chuDauTuType = chuDauTuTypes.find(({ value }) => value === chuDauTu)

      if (!chuDauTuType) {
        return null
      }

      return (
        <div className='flex items-center gap-x-2'>
          {chuDauTuType.icon && (
            <chuDauTuType.icon size={16} className='text-muted-foreground' />
          )}
          <span className='text-sm capitalize'>{chuDauTuType.label}</span>
        </div>
      )
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id))
    },
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'phongMay',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Chủ đầu tư' />
    ),
    cell: ({ row }) => {
      const { phongMay } = row.original

      const phongMayType = phongMayTypes.find(({ value }) => value === phongMay)

      if (!phongMayType) {
        return null
      }

      return (
        <div className='flex items-center gap-x-2'>
          {phongMayType.icon && (
            <phongMayType.icon size={16} className='text-muted-foreground' />
          )}
          <span className='text-sm capitalize'>{phongMayType.label}</span>
        </div>
      )
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id))
    },
    enableSorting: false,
    enableHiding: false,
  },
  {
    id: 'maPE',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Mã PE' />
    ),
    cell: ({ row }) => {
      return <LongText className='max-w-36'>{row.original.maPE}</LongText>
    },
    meta: { className: 'w-36' },
  },
  {
    id: 'toaDo',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Tọa độ' />
    ),
    cell: ({ row }) => {
      return (
        <LongText className='max-w-36'>
          <Link to={row.original.toaDo} target='_blank'>
            {row.original.toaDo}
          </Link>
        </LongText>
      )
    },
    meta: { className: 'w-36' },
  },
  {
    id: 'hinhAnh',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Hình ảnh' />
    ),
    cell: ({ row }) => {
      const { hinhAnh } = row.original
      const [selectedImage, setSelectedImage] = useState<string | null>(null)

      return (
        <Dialog onOpenChange={(open) => !open && setSelectedImage(null)}>
          <div className='grid w-48 grid-cols-3 gap-2'>
            {hinhAnh.map((item, index) => (
              <DialogTrigger asChild key={index}>
                <img
                  src={item.path}
                  alt={`Image ${index}`}
                  className='h-14 w-14 cursor-pointer rounded object-cover hover:opacity-50'
                  onClick={() => setSelectedImage(item.path)}
                />
              </DialogTrigger>
            ))}
          </div>
          <DialogContent className='w-max p-0'>
            <VisuallyHidden>
              <DialogTitle>Ảnh trạm</DialogTitle>
              <DialogDescription>
                {hinhAnh.find((item) => item.path === selectedImage)
                  ?.filename ?? ''}
              </DialogDescription>
            </VisuallyHidden>
            {selectedImage && (
              <img
                src={selectedImage}
                alt={selectedImage}
                className='max-h-screen rounded'
              />
            )}
          </DialogContent>
        </Dialog>
      )
    },
    meta: { className: 'min-w-36' },
  },
  {
    id: 'actions',
    cell: DataTableRowActions,
    meta: {
      className: cn(
        'drop-shadow-[0_1px_2px_rgb(0_0_0_/_0.1)] dark:drop-shadow-[0_1px_2px_rgb(255_255_255_/_0.1)] lg:drop-shadow-none',
        'bg-background transition-colors duration-200 group-hover/row:bg-muted group-data-[state=selected]/row:bg-muted',
        'sticky left-0 md:table-cell'
      ),
    },
  },
  // {
  //   id: 'actions',
  //   cell: DataTableRowActions,
  //   meta: {
  //     className: cn(
  //       'drop-shadow-[0_1px_2px_rgb(0_0_0_/_0.1)] dark:drop-shadow-[0_1px_2px_rgb(255_255_255_/_0.1)] lg:drop-shadow-none',
  //       'bg-background transition-colors duration-200 group-hover/row:bg-muted group-data-[state=selected]/row:bg-muted',
  //       'sticky left-0 md:table-cell'
  //     ),
  //   },
  // },
]
