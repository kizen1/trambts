import { IconLoader } from '@tabler/icons-react'
import { Header } from '@/components/layout/header'
import { Main } from '@/components/layout/main'
import { ProfileDropdown } from '@/components/profile-dropdown'
import { Search } from '@/components/search'
import { ThemeSwitch } from '@/components/theme-switch'
import { columns } from './components/stations-columns'
import { StationsDialogs } from './components/stations-dialogs'
import { StationsPrimaryButtons } from './components/stations-primary-buttons'
import { StationsTable } from './components/stations-table'
import StationsProvider from './context/stations-context'
import { useStations } from './hooks/stations-hooks'

export default function Stations() {
  const { data: stationList, isLoading } = useStations()

  return (
    <StationsProvider>
      <Header fixed>
        <Search />
        <div className='ml-auto flex items-center space-x-4'>
          <ThemeSwitch />
          <ProfileDropdown />
        </div>
      </Header>

      <Main>
        <div className='mb-2 flex flex-wrap items-center justify-between space-y-2'>
          <div>
            <h2 className='text-2xl font-bold tracking-tight'>Trạm BTS</h2>
            <p className='text-muted-foreground'>Quản lý các Trạm BTS.</p>
          </div>
          <StationsPrimaryButtons />
        </div>
        <div className='-mx-4 flex-1 overflow-auto px-4 py-1 lg:flex-row lg:space-y-0 lg:space-x-12'>
          {isLoading ? (
            <div className='flex items-center justify-center gap-2'>
              <IconLoader className='h-5 w-5 animate-spin' />
              {'  '}
              Loading...
            </div>
          ) : (
            <StationsTable data={stationList || []} columns={columns} />
          )}
        </div>
      </Main>

      <StationsDialogs />
    </StationsProvider>
  )
}
