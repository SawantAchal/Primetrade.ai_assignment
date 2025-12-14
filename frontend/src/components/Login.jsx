import React from 'react'
import { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const Login = () => {
  const [state, setState] = useState('Login')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name , setName] = useState('')
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      if (state === 'Sign Up') {
        if (!name || !email || !password) {
          alert('All fields are required')
          return
        }
        await axios.post('http://localhost:5000/api/user/signup', {name,email,password,})
        alert('Signup successful. Please login.')
        setState('Login')
        setName('')
        setEmail('')
        setPassword('')
        return
      }
      //logib
      if (state === 'Login') {
        if (!email || !password) {
          alert('Email and password are required')
          return
        }
        const res = await axios.post(
          'http://localhost:5000/api/user/login',{ email, password })
        localStorage.setItem('token', res.data.token)
        navigate('/dashboard')
      }
    } catch (error) {
      alert('Something went wrong')
    }
  }

  return (
    <>
      <div className="flex items-center justify-center min-h-screen px-6 sm:px-0 ">
        <div className="bg-white p-10 rounded-2xl shadow-xl w-full sm:w-96 text-sm">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-2">{state === 'Sign Up' ? 'Create Account' : 'Welcome Back'}</h2>
          <p className="text-center text-gray-500 mb-8">{state === 'Sign Up'? 'Create your account to get started': 'Login to your account'}</p>
          <form  onSubmit={handleSubmit}>
            {state === 'Sign Up' && (
              <div className="mb-4 flex items-center gap-3 w-full px-5 py-3 rounded-full border border-gray-200 focus-within:border-indigo-500 transition">
                <input spellCheck={true} type="text" name='name' value={name} onChange={(e)=>setName(e.target.value)} placeholder="Full Name" className="bg-transparent outline-none w-full text-gray-700 placeholder-gray-400" required/>
              </div>
            )}
            <div className="mb-4 flex items-center gap-3 w-full px-5 py-3 rounded-full border border-gray-200 focus-within:border-indigo-500 transition">
              <input spellCheck={true} type="email" name='email' value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email address" className="bg-transparent outline-none w-full text-gray-700 placeholder-gray-400" required/>
            </div>
            <div className="mb-4 flex items-center gap-3 w-full px-5 py-3 rounded-full border border-gray-200 focus-within:border-indigo-500 transition">
              <input spellCheck={true} type="password" name='password' value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" className="bg-transparent outline-none w-full text-gray-700 placeholder-gray-400" required />
            </div>
            <p className="mb-6 text-right text-sm text-indigo-500 cursor-pointer hover:underline">Forgot Password?</p>
            <button type='submit' className="cursor-pointer  px-4 py-3 rounded-full w-full font-medium shadow-md">{state}</button>
          </form>
          {state === 'Sign Up' ? (
            <p className="text-gray-500 text-center text-xs mt-6"> Already have an account?{' '}<span onClick={() => setState('Login')} className="text-indigo-600 cursor-pointer font-medium hover:underline"> Login here </span> </p>
          ) : (
            <p className="text-gray-500 text-center text-xs mt-6">Don't have an account?{' '}
              <span onClick={() => setState('Sign Up')} className="text-indigo-600 cursor-pointer font-medium hover:underline">
                Sign Up
              </span>
            </p>
          )}
        </div>
      </div>
    </>
  )
}

export default Login
