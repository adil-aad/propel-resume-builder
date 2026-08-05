import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../app/features/authSlice'
import Logo from './Logo'

const NavBar = () => {
    const { user } = useSelector(state => state.auth)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const logoutUser = () => {
        dispatch(logout())
        navigate('/')
    }

    const initial = user?.name?.trim()?.charAt(0)?.toUpperCase() || '?'

    return (
        <header className='sticky top-0 z-40 border-b border-line bg-paper/85 backdrop-blur-md'>
            <nav className='mx-auto flex max-w-6xl items-center justify-between px-6 py-4 lg:px-8'>
                <Link to='/app'>
                    <Logo />
                </Link>

                <div className='flex items-center gap-3'>
                    <div className='hidden items-center gap-2.5 sm:flex'>
                        <span className='flex size-7 items-center justify-center rounded-full bg-ink text-xs font-medium text-paper'>
                            {initial}
                        </span>
                        <span className='text-sm text-ink-soft capitalize'>{user?.name}</span>
                    </div>

                    <button onClick={logoutUser} className='btn btn-secondary btn-sm'>
                        Sign out
                    </button>
                </div>
            </nav>
        </header>
    )
}

export default NavBar
