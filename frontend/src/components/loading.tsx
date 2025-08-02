import { Loader } from 'lucide-react'

const Loading = () => {
  return (
    <div className='flex h-40 items-center justify-center'>
      <Loader className='h-6 w-6 animate-spin' />
    </div>
  )
}

export default Loading
