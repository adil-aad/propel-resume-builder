import React from 'react'
import { Loader2 } from 'lucide-react'

const Loading = ({ message = 'Loading' }) => (
  <div className='flex min-h-screen items-center justify-center bg-paper'>
    <div className='flex items-center gap-3 text-sm text-muted'>
      <Loader2 className='size-4 animate-spin' />
      {message}
    </div>
  </div>
)

export default Loading
