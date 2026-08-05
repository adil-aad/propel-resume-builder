import React, { useEffect } from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Layout from './pages/Layout'
import Dashboard from './pages/DashboardPage.jsx'
import Resume from './pages/Resume'
import Preview from './pages/Preview'
import Login from './pages/Login'
import { useDispatch } from 'react-redux'
import api from './configs/api.js'
import { login, setLoading } from './app/features/authSlice.js'
import { Toaster } from 'react-hot-toast'

const App = () => {

  const dispatch = useDispatch()

  const getUserData = async () => {
    const token = localStorage.getItem('token')

    try {
      if(token){
        const { data } = await api.get('/api/users/data', {headers: {Authorization: token}})

        if(data.user){
          dispatch(login({token, user: data.user}))
        }

        dispatch(setLoading(false))
      }else{
        dispatch(setLoading(false))
      }
    } catch (error) {
      dispatch(setLoading(false))
      console.log(error.message)
    }
  }

  useEffect(()=>{
    getUserData()
  }, [])
  return (
    <>
      <Toaster
        position='top-center'
        toastOptions={{
          duration: 3000,
          style: {
            background: 'var(--color-ink)',
            color: 'var(--color-paper)',
            border: 'none',
            borderRadius: '10px',
            fontSize: '14px',
            padding: '10px 14px',
            boxShadow: '0 18px 40px -20px rgb(22 21 15 / 0.6)',
          },
          success: { iconTheme: { primary: 'var(--color-paper)', secondary: 'var(--color-ink)' } },
          error: { iconTheme: { primary: 'var(--color-accent)', secondary: 'var(--color-paper)' } },
        }}
      />
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='app' element={<Layout />}>
          <Route index element={<Dashboard/>}/>
          <Route path='builder/:resumeId' element={<Resume/>}/>
        </Route>
        <Route path='view/:resumeId' element={<Preview/>} />
      </Routes>
    </>
  )
}

export default App
