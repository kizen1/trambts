'use client'

import { useState } from 'react'
import { IconAlertTriangle } from '@tabler/icons-react'
import { showSubmittedData } from '@/utils/show-submitted-data'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
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
  const [value, setValue] = useState('')
  const deleteStation = useDeleteStation()

  const handleDelete = () => {
    if (value.trim() !== currentRow.maTram) return

    onOpenChange(false)
    deleteStation.mutate(currentRow.id)
    // showSubmittedData(currentRow, 'The following station has been deleted:')
  }

  return (
    <ConfirmDialog
      open={open}
      onOpenChange={onOpenChange}
      handleConfirm={handleDelete}
      disabled={value.trim() !== currentRow.maTram}
      title={
        <span className='text-destructive'>
          <IconAlertTriangle
            className='stroke-destructive mr-1 inline-block'
            size={18}
          />{' '}
          Delete Station
        </span>
      }
      desc={
        <div className='space-y-4'>
          <p className='mb-2'>
            Are you sure you want to delete{' '}
            <span className='font-bold'>{currentRow.maTram}</span>?
            <br />
            This action will permanently remove the station with the chuDauTu of{' '}
            <span className='font-bold'>
              {currentRow.chuDauTu.toUpperCase()}
            </span>{' '}
            from the system. This cannot be undone.
          </p>

          <Label className='my-2'>
            Mã trạm:
            <Input
              value={value}
              onChange={(e) => setValue(e.target.value)}
              placeholder='Enter maTram to confirm deletion.'
            />
          </Label>

          <Alert variant='destructive'>
            <AlertTitle>Warning!</AlertTitle>
            <AlertDescription>
              Please be carefull, this operation can not be rolled back.
            </AlertDescription>
          </Alert>
        </div>
      }
      confirmText='Delete'
      destructive
    />
  )
}
