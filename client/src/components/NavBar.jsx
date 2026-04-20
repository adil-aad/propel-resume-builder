import { Link, Navigate, useNavigate } from 'react-router-dom'
import React from 'react'

const NavBar = () => {
    const user = {name: 'john doe'}
    const navigate = useNavigate()
    const logoutUser = ()=>{
        navigate('/')
    }
  return (
    <div className='bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 border-b border-white/10'>
        <nav className='flex items-center justify-between max-w-7xl mx-auto px-4 py-3.5 transition-all'>
            <Link to='/' className='flex items-center gap-2'>
                <div className='w-8 h-8 bg-gradient-to-r from-cyan-400 to-purple-500 rounded-lg rotate-45'></div>
                <span className='font-bold text-xl bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent'>ResumeForge</span>
            </Link>
            <div className='flex items-center gap-4 text-sm'>
                <p className='max-sm:hidden text-gray-300'>Hi, {user?.name}</p>
                <button onClick={logoutUser} className='bg-gradient-to-r from-cyan-500 to-purple-600 hover:shadow-lg hover:shadow-purple-500/25 text-white px-7 py-1.5 rounded-full active:scale-95 transition-all duration-300'>
                    Logout
                </button>
            </div>
        </nav>
        
        <style>{`
            @import url('https://fonts.googleapis.com/css2?family=Inter:opsz,wght@14..32,300;14..32,400;14..32,500;14..32,600;14..32,700;14..32,800&display=swap');
            * {
                font-family: 'Inter', sans-serif;
            }
        `}</style>
    </div>
  )
}

export default NavBar