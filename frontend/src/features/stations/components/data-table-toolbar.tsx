import { Cross2Icon } from '@radix-ui/react-icons'
import { Table } from '@tanstack/react-table'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { chuDauTuTypes, loaiTruTypes, phongMayTypes } from '../data/data'
import { DataTableFacetedFilter } from './data-table-faceted-filter'
import { DataTableViewOptions } from './data-table-view-options'

interface DataTableToolbarProps<TData> {
  table: Table<TData>
}

export function DataTableToolbar<TData>({
  table,
}: DataTableToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0

  return (
    <div className='flex items-center justify-between'>
      <div className='flex flex-1 flex-col-reverse items-start gap-y-2 sm:flex-row sm:items-center sm:space-x-2'>
        <div className='grid gap-2'>
          <Input
            placeholder='Tìm trạm...'
            value={
              (table.getColumn('maTram')?.getFilterValue() as string) ?? ''
            }
            onChange={(event) =>
              table.getColumn('maTram')?.setFilterValue(event.target.value)
            }
            className='h-8 w-full lg:w-[250px]'
          />
          <Input
            placeholder='Tìm thông tin cáp...'
            value={
              (table.getColumn('thongTinCap')?.getFilterValue() as string) ??
              ''
            }
            onChange={(event) =>
              table
                .getColumn('thongTinCap')
                ?.setFilterValue(event.target.value)
            }
            className='h-8 w-full lg:w-[250px]'
          />
        </div>
        <div className='flex flex-wrap gap-3'>
          {table.getColumn('loaiTru') && (
            <DataTableFacetedFilter
              column={table.getColumn('loaiTru')}
              title='Loại trụ'
              options={loaiTruTypes.map((t) => ({ ...t }))}
            />
          )}
          {table.getColumn('chuDauTu') && (
            <DataTableFacetedFilter
              column={table.getColumn('chuDauTu')}
              title='Chủ đầu tư'
              options={chuDauTuTypes.map((t) => ({ ...t }))}
            />
          )}
          {table.getColumn('phongMay') && (
            <DataTableFacetedFilter
              column={table.getColumn('phongMay')}
              title='Phòng máy'
              options={phongMayTypes.map((t) => ({ ...t }))}
            />
          )}
        </div>
        {isFiltered && (
          <Button
            variant='ghost'
            onClick={() => table.resetColumnFilters()}
            className='h-8 px-2 lg:px-3'
          >
            Reset
            <Cross2Icon className='ml-2 h-4 w-4' />
          </Button>
        )}
      </div>
      <DataTableViewOptions table={table} />
    </div>
  )
}
