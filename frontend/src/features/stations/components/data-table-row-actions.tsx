import { Row } from '@tanstack/react-table'
import { IconTrash } from '@tabler/icons-react'
import { Button } from '@/components/ui/button'
import { useStationContext } from '../context/stations-context'
import { Station } from '../data/schema'

interface DataTableRowActionsProps {
  row: Row<Station>
}

export function DataTableRowActions({ row }: DataTableRowActionsProps) {
  const { setOpen, setCurrentRow } = useStationContext()
  return (
    <>
      <Button
        onClick={() => {
          setCurrentRow(row.original)
          setOpen('delete')
        }}
        className='bg-destructive/10 dark:bg-destructive/50 text-destructive dark:text-primary'
      >
        Delete
        <IconTrash size={16} className='text-destructive dark:text-primary' />
      </Button>
    </>
  )
}
