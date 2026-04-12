import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { toast } from 'react-toastify'
import { ShopContext } from '../context/ShopContext'

const Login = () => {
  const [currentState, setCurrentState] = useState('Login')
  const { token, setToken, backendUrl } = useContext(ShopContext)
  const navigate = useNavigate()
  const [name, setName] = useState('')
  const [password, setPassword] = useState('')
  const [email, setEmail] = useState('')

  const onSubmitHandler = async (event) => {
    event.preventDefault()

    try {
      if (currentState === 'Sign Up') {
        const response = await axios.post(`${backendUrl}/api/user/register`, {
          name,
          email,
          password,
        })

        if (response.data.success) {
          toast.success('Registration successful! Please log in.')
          setCurrentState('Login')
        } else {
          toast.error(response.data.message)
        }
      } else {
        const response = await axios.post(`${backendUrl}/api/user/login`, {
          email,
          password,
        })

        if (response.data.success) {
          setToken(response.data.token)
          localStorage.setItem('token', response.data.token)
          navigate('/')
        } else {
          toast.error(response.data.message)
        }
      }
    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }
  }

  useEffect(() => {
    if (token && currentState === 'Login') {
      navigate('/')
    }
  }, [token])

  return (
    <div className='min-h-screen flex items-center justify-center bg-gradient-to-br from-[#4B2E05] via-[#6B3E14] to-[#8C5A2E]'>
      <div className='bg-[#fff9f5] shadow-2xl rounded-3xl p-10 w-[90%] sm:max-w-md'>
        <div className='text-center mb-6'>
          <h2 className='text-4xl font-semibold text-[#3E2723] tracking-wide'>
            {currentState === 'Login' ? 'Welcome Back' : 'Join Our Chocolate Club'}
          </h2>
          <p className='text-sm text-[#6B4F3A] mt-2'>
            {currentState === 'Login'
              ? 'Log in to continue your sweet journey.'
              : 'Create an account and indulge in the world of craft chocolate.'}
          </p>
        </div>

        <form onSubmit={onSubmitHandler} className='flex flex-col gap-4 text-[#3E2723]'>
          {currentState === 'Sign Up' && (
            <input
              onChange={(e) => setName(e.target.value)}
              value={name}
              type='text'
              className='w-full px-4 py-3 bg-[#fffaf7] border border-[#d3bfa6] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#8C5A2E] placeholder:text-[#a78c7a]'
              placeholder='Name'
              required
            />
          )}

          <input
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            type='email'
            className='w-full px-4 py-3 bg-[#fffaf7] border border-[#d3bfa6] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#8C5A2E] placeholder:text-[#a78c7a]'
            placeholder='Email'
            required
          />

          <input
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            type='password'
            className='w-full px-4 py-3 bg-[#fffaf7] border border-[#d3bfa6] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#8C5A2E] placeholder:text-[#a78c7a]'
            placeholder='Password'
            required
          />

          <button className='bg-[#6B3E14] text-white py-3 rounded-xl mt-2 font-semibold tracking-wide hover:bg-[#4B2E05] transition-all shadow-md'>
            {currentState === 'Login' ? 'Sign In' : 'Sign Up'}
          </button>
        </form>

        <div className='flex justify-center items-center mt-6'>
          <p
            onClick={() =>
              setCurrentState(currentState === 'Login' ? 'Sign Up' : 'Login')
            }
            className='text-sm text-[#6B3E14] cursor-pointer hover:underline'
          >
            {currentState === 'Login'
              ? 'New here? Create an account'
              : 'Already have an account? Log in'}
          </p>
        </div>

        <div className='mt-8 text-center'>
          <p className='text-xs text-[#a78c7a]'>
            Crafted with ❤️ and cocoa — your gateway to artisan chocolate.
          </p>
        </div>
      </div>
    </div>
  )
}

export default Login
