import React, { useState } from 'react'
import { Eye, EyeOff, Loader2 } from 'lucide-react'
import { useDispatch } from 'react-redux'
import toast from 'react-hot-toast'
import api from '../configs/api.js'
import { login } from '../app/features/authSlice.js'
import Logo from '../components/Logo.jsx'

const highlights = [
  'Live preview while you write',
  'Import an existing PDF resume',
  'Export a clean, ATS-ready copy',
]

const Login = () => {
  const dispatch = useDispatch()

  const query = new URLSearchParams(window.location.search)
  const urlState = query.get('state')

  const [state, setState] = useState(urlState === 'register' ? 'register' : 'login')
  const [showPassword, setShowPassword] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState({ name: '', email: '', password: '' })

  const isRegister = state === 'register'

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const { data } = await api.post(`/api/users/${state}`, formData)
      dispatch(login(data))
      localStorage.setItem('token', data.token)
      toast.success(data.message)
    } catch (error) {
      toast.error(error?.response?.data?.message || error.message)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const toggleState = () => setState(prev => (prev === 'login' ? 'register' : 'login'))

  return (
    <div className='min-h-screen bg-paper lg:grid lg:grid-cols-[1.05fr_1fr]'>
      {/* Brand panel */}
      <aside className='relative hidden flex-col justify-between bg-ink p-12 lg:flex'>
        <Logo tone='light' />

        <div>
          <h2 className='max-w-md text-4xl leading-[1.15] font-medium text-paper'>
            One workspace for every version of your resume.
          </h2>

          <ul className='mt-10 max-w-md border-t border-white/10'>
            {highlights.map((item) => (
              <li key={item} className='border-b border-white/10 py-4 text-sm text-paper/60'>
                {item}
              </li>
            ))}
          </ul>
        </div>

        <p className='text-xs text-paper/35'>© 2026 Propel Resume</p>
      </aside>

      {/* Form panel */}
      <main className='flex min-h-screen items-center justify-center px-6 py-12 lg:min-h-0'>
        <div className='w-full max-w-sm'>
          <div className='lg:hidden'>
            <Logo />
          </div>

          <h1 className='mt-10 text-3xl font-medium text-ink lg:mt-0'>
            {isRegister ? 'Create your account' : 'Welcome back'}
          </h1>

          <form onSubmit={handleSubmit} className='mt-8 space-y-5'>
            {isRegister && (
              <div className='space-y-2'>
                <label htmlFor='name' className='label'>Name</label>
                <input
                  id='name'
                  type='text'
                  name='name'
                  autoComplete='name'
                  placeholder='Ada Lovelace'
                  className='field'
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>
            )}

            <div className='space-y-2'>
              <label htmlFor='email' className='label'>Email</label>
              <input
                id='email'
                type='email'
                name='email'
                autoComplete='email'
                placeholder='you@example.com'
                className='field'
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className='space-y-2'>
              <label htmlFor='password' className='label'>Password</label>
              <div className='relative'>
                <input
                  id='password'
                  type={showPassword ? 'text' : 'password'}
                  name='password'
                  autoComplete={isRegister ? 'new-password' : 'current-password'}
                  placeholder='••••••••'
                  className='field pr-11'
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
                <button
                  type='button'
                  onClick={() => setShowPassword(prev => !prev)}
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                  className='absolute inset-y-0 right-0 flex items-center px-3.5 text-faint transition hover:text-ink'
                >
                  {showPassword ? <EyeOff className='size-4' /> : <Eye className='size-4' />}
                </button>
              </div>
            </div>

            <button type='submit' disabled={isSubmitting} className='btn btn-primary w-full'>
              {isSubmitting && <Loader2 className='size-4 animate-spin' />}
              {isRegister ? 'Create account' : 'Sign in'}
            </button>
          </form>

          <p className='mt-8 text-sm text-muted'>
            {isRegister ? 'Already have an account?' : "Don't have an account?"}
            <button
              type='button'
              onClick={toggleState}
              className='ml-1.5 font-medium text-ink underline underline-offset-4 decoration-line-strong transition hover:decoration-ink'
            >
              {isRegister ? 'Sign in' : 'Create one'}
            </button>
          </p>
        </div>
      </main>
    </div>
  )
}

export default Login
