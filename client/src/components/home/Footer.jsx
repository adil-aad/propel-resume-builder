import React from 'react'
import Logo from '../Logo'

const Footer = () => (
  <footer className='border-t border-line px-6 py-10 lg:px-8'>
    <div className='mx-auto flex max-w-6xl flex-col gap-6 sm:flex-row sm:items-center sm:justify-between'>
      <Logo markClassName='size-7' />

      <div className='flex items-center gap-6 text-sm text-muted'>
        <a href='#features' className='transition hover:text-ink'>Features</a>
        <a href='#how' className='transition hover:text-ink'>How it works</a>
        <span className='text-faint'>© 2026 Propel Resume</span>
      </div>
    </div>
  </footer>
)

export default Footer
