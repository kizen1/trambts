import { IconDatabasePlus } from '@tabler/icons-react'
import { Button } from '@/components/ui/button'
import { useStationContext } from '../context/stations-context'

export function StationsPrimaryButtons() {
  const { setOpen } = useStationContext()
  return (
    <div className='flex gap-2'>
      {/* <Button
        variant='outline'
        className='space-x-1'
        onClick={() => setOpen('invite')}
      >
        <span>Invite Station</span> <IconMailPlus size={18} />
      </Button> */}
      <Button className='space-x-1' onClick={() => setOpen('add')}>
        <span>Thêm trạm</span> <IconDatabasePlus size={18} />
      </Button>
    </div>
  )
}
