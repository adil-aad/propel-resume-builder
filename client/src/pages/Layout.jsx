import React from 'react'
import { Outlet } from 'react-router-dom'
import NavBar from '../components/NavBar'
import { useSelector } from 'react-redux'
import Loading from '../components/Loading'
import Login from './Login'

const Layout = () => {
  const { user, loading } = useSelector(state => state.auth)

  if (loading) return <Loading />
  if (!user) return <Login />

  return (
    <div className='min-h-screen bg-paper'>
      <NavBar />
      <Outlet />
    </div>
  )
}

export default Layout
