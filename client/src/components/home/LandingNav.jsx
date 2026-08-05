import React, { useState } from 'react'
import { Menu, X } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import Logo from '../Logo'

const links = [
  { href: '#features', label: 'Features' },
  { href: '#how', label: 'How it works' },
]

const LandingNav = () => {
  const { user, loading } = useSelector(state => state.auth)
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <header className='sticky top-0 z-50 border-b border-line bg-paper/85 backdrop-blur-md'>
      <nav className='mx-auto flex max-w-6xl items-center justify-between px-6 py-4 lg:px-8'>
        <Link to='/'>
          <Logo />
        </Link>

        <div className='hidden items-center gap-8 md:flex'>
          {links.map(link => (
            <a key={link.href} href={link.href} className='text-sm text-muted transition hover:text-ink'>
              {link.label}
            </a>
          ))}
        </div>

        <div className='hidden items-center gap-2 md:flex'>
          {!loading && (
            user ? (
              <Link to='/app' className='btn btn-primary btn-sm'>Dashboard</Link>
            ) : (
              <>
                <Link to='/app?state=login' className='btn btn-ghost btn-sm'>Sign in</Link>
                <Link to='/app?state=register' className='btn btn-primary btn-sm'>Get started</Link>
              </>
            )
          )}
        </div>

        <button
          onClick={() => setMenuOpen(true)}
          aria-label='Open menu'
          className='rounded-lg border border-line-strong p-2 text-ink md:hidden'
        >
          <Menu className='size-5' />
        </button>
      </nav>

      {menuOpen && (
        <div className='fixed inset-0 z-50 flex flex-col bg-paper px-6 py-4 md:hidden'>
          <div className='flex items-center justify-between'>
            <Logo />
            <button
              onClick={() => setMenuOpen(false)}
              aria-label='Close menu'
              className='rounded-lg border border-line-strong p-2 text-ink'
            >
              <X className='size-5' />
            </button>
          </div>

          <div className='mt-12 flex flex-col gap-6'>
            {links.map(link => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className='text-2xl font-medium text-ink'
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className='mt-auto flex flex-col gap-3'>
            {!loading && (
              user ? (
                <Link to='/app' className='btn btn-primary'>Dashboard</Link>
              ) : (
                <>
                  <Link to='/app?state=register' className='btn btn-primary'>Get started</Link>
                  <Link to='/app?state=login' className='btn btn-secondary'>Sign in</Link>
                </>
              )
            )}
          </div>
        </div>
      )}
    </header>
  )
}

export default LandingNav
