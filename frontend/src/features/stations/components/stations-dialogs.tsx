import { useStationContext } from '../context/stations-context'
import { StationsActionDialog } from './stations-action-dialog'
import { StationsDeleteDialog } from './stations-delete-dialog'

export function StationsDialogs() {
  const { open, setOpen, currentRow, setCurrentRow } = useStationContext()
  return (
    <>
      <StationsActionDialog
        key='station-add'
        open={open === 'add'}
        onOpenChange={() => setOpen('add')}
      />

      {currentRow && (
        <>
          <StationsActionDialog
            key={`station-edit-${currentRow.id}`}
            open={open === 'edit'}
            onOpenChange={() => {
              setOpen('edit')
              setTimeout(() => {
                setCurrentRow(null)
              }, 500)
            }}
            currentRow={currentRow}
          />

          <StationsDeleteDialog
            key={`station-delete-${currentRow.id}`}
            open={open === 'delete'}
            onOpenChange={() => {
              setOpen('delete')
              setTimeout(() => {
                setCurrentRow(null)
              }, 500)
            }}
            currentRow={currentRow}
          />
        </>
      )}
    </>
  )
}
