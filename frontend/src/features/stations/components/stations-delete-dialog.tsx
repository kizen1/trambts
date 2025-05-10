'use client'

import { IconAlertTriangle } from '@tabler/icons-react'
import { ConfirmDialog } from '@/components/confirm-dialog'
import { Station } from '../data/schema'
import { useDeleteStation } from '../hooks/stations-hooks'

interface Props {
  open: boolean
  onOpenChange: (open: boolean) => void
  currentRow: Station
}

export function StationsDeleteDialog({
  open,
  onOpenChange,
  currentRow,
}: Props) {
  const deleteStation = useDeleteStation()

  const handleDelete = () => {
    onOpenChange(false)
    deleteStation.mutate(currentRow.id)
  }

  return (
    <ConfirmDialog
      open={open}
      onOpenChange={onOpenChange}
      handleConfirm={handleDelete}
      title={
        <span className='text-destructive'>
          <IconAlertTriangle
            className='stroke-destructive mr-1 inline-block'
            size={18}
          />{' '}
          Xóa trạm
        </span>
      }
      desc={<p>Bạn có muốn xóa trạm không?</p>}
      confirmText='Delete'
      destructive
    />
  )
}
