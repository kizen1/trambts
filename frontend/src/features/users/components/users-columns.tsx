import { ColumnDef } from '@tanstack/react-table'
import { cn } from '@/lib/utils'
import { Checkbox } from '@/components/ui/checkbox'
import LongText from '@/components/long-text'
import { userTypes } from '../data/data'
import { User } from '../data/schema'
import { DataTableColumnHeader } from './data-table-column-header'
import { DataTableRowActions } from './data-table-row-actions'

export const columns: ColumnDef<User>[] = [
  {
    id: 'select',
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && 'indeterminate')
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label='Select all'
        className='translate-y-[2px]'
      />
    ),
    meta: {
      className: cn(
        'sticky md:table-cell left-0 z-10 rounded-tl',
        'bg-background transition-colors duration-200 group-hover/row:bg-muted group-data-[state=selected]/row:bg-muted'
      ),
    },
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label='Select row'
        className='translate-y-[2px]'
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'hoTen',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Họ tên' />
    ),
    cell: ({ row }) => (
      <LongText className='max-w-36'>{row.getValue('hoTen')}</LongText>
    ),
    meta: {
      className: cn(
        'drop-shadow-[0_1px_2px_rgb(0_0_0_/_0.1)] dark:drop-shadow-[0_1px_2px_rgb(255_255_255_/_0.1)] lg:drop-shadow-none',
        'bg-background transition-colors duration-200 group-hover/row:bg-muted group-data-[state=selected]/row:bg-muted',
        'sticky left-6 md:table-cell'
      ),
    },
    enableHiding: false,
  },
  // {
  //   id: 'hoTen',
  //   header: ({ column }) => (
  //     <DataTableColumnHeader column={column} title='Họ tên' />
  //   ),
  //   cell: ({ row }) => {
  //     const { firstName, lastName } = row.original
  //     const fullName = `${firstName} ${lastName}`
  //     return <LongText className='max-w-36'>{fullName}</LongText>
  //   },
  //   meta: { className: 'w-36' },
  // },
  {
    accessorKey: 'email',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Email' />
    ),
    cell: ({ row }) => (
      <div className='w-fit text-nowrap'>{row.getValue('email')}</div>
    ),
  },
  {
    accessorKey: 'sdt',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Số điện thoại' />
    ),
    cell: ({ row }) => <div>{row.getValue('sdt')}</div>,
    enableSorting: false,
  },
  {
    accessorKey: 'diaChi',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Địa chỉ' />
    ),
    cell: ({ row }) => <div>{row.getValue('diaChi')}</div>,
    enableSorting: false,
  },
  // {
  //   accessorKey: 'status',
  //   header: ({ column }) => (
  //     <DataTableColumnHeader column={column} title='Status' />
  //   ),
  //   cell: ({ row }) => {
  //     const { status } = row.original
  //     const badgeColor = callTypes.get(status)
  //     return (
  //       <div className='flex space-x-2'>
  //         <Badge variant='outline' className={cn('capitalize', badgeColor)}>
  //           {row.getValue('status')}
  //         </Badge>
  //       </div>
  //     )
  //   },
  //   filterFn: (row, id, value) => {
  //     return value.includes(row.getValue(id))
  //   },
  //   enableHiding: false,
  //   enableSorting: false,
  // },
  {
    accessorKey: 'vaiTro',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Vai trò' />
    ),
    cell: ({ row }) => {
      const { vaiTro } = row.original
      const userType = userTypes.find(({ value }) => value === vaiTro)

      if (!userType) {
        return null
      }

      return (
        <div className='flex items-center gap-x-2'>
          {userType.icon && (
            <userType.icon size={16} className='text-muted-foreground' />
          )}
          <span className='text-sm capitalize'>{row.getValue('vaiTro')}</span>
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
    accessorKey: 'ghiChu',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Ghi chú' />
    ),
    cell: ({ row }) => <div>{row.getValue('ghiChu')}</div>,
    enableSorting: false,
  },
  {
    id: 'actions',
    cell: DataTableRowActions,
  },
]
