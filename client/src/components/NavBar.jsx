import { Link, useNavigate } from 'react-router-dom'
import React from 'react'

const NavBar = () => {
    const user = { name: 'john doe' }
    const navigate = useNavigate()

    const logoutUser = () => {
        navigate('/')
    }

    return (
        <div className='border-b border-slate-900/10 bg-[#f3efe7]/90 backdrop-blur-md'>
            <nav className='mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8'>
                <Link to='/' className='flex items-center gap-3'>
                    <div className='h-8 w-8 rotate-12 rounded-lg bg-slate-950'></div>
                    <div>
                        <p className='text-[10px] font-medium uppercase tracking-[0.24em] text-slate-400'>Workspace</p>
                        <span className='text-xl font-bold tracking-tight text-slate-950'>ResumeForge</span>
                    </div>
                </Link>

                <div className='flex items-center gap-3 text-sm'>
                    <div className='hidden rounded-full border border-slate-200 bg-white/70 px-4 py-2 text-slate-600 sm:block'>
                        Hi, <span className='font-semibold capitalize text-slate-900'>{user?.name}</span>
                    </div>
                    <button
                        onClick={logoutUser}
                        className='rounded-full bg-slate-950 px-5 py-2 text-sm font-semibold text-white transition hover:bg-slate-800 active:scale-95'
                    >
                        Logout
                    </button>
                </div>
            </nav>

            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;700&display=swap');
                * {
                    font-family: 'Space Grotesk', sans-serif;
                }
            `}</style>
        </div>
    )
}

export default NavBar
