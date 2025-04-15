import React, { useState } from 'react'
import useDialogState from '@/hooks/use-dialog-state'
import { Station } from '../data/schema'

type StationsDialogType = 'invite' | 'add' | 'edit' | 'delete'

interface StationsContextType {
  open: StationsDialogType | null
  setOpen: (str: StationsDialogType | null) => void
  currentRow: Station | null
  setCurrentRow: React.Dispatch<React.SetStateAction<Station | null>>
}

const StationsContext = React.createContext<StationsContextType | null>(null)

interface Props {
  children: React.ReactNode
}

export default function StationsProvider({ children }: Props) {
  const [open, setOpen] = useDialogState<StationsDialogType>(null)
  const [currentRow, setCurrentRow] = useState<Station | null>(null)

  return (
    <StationsContext value={{ open, setOpen, currentRow, setCurrentRow }}>
      {children}
    </StationsContext>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export const useStationContext = () => {
  const stationsContext = React.useContext(StationsContext)

  if (!stationsContext) {
    throw new Error('useStations has to be used within <StationsContext>')
  }

  return stationsContext
}
