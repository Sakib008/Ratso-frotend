import Button from '@/components/myUi/button'
import FormInput from '@/components/myUi/FormInput'
import React from 'react'
import { Link } from 'react-router-dom'

const Login : React.FC = () => {
  return (
    <div className='flex flex-col items-center justify-center h-screen'>
    <div className='flex flex-col items-center justify-center bg-white rounded-2xl border-2 border-blue-400 w-xs md:w-xl px-5 h-2/3'>

      <h1 className='text-3xl font-bold text-center py-3'>Login</h1>
      <div className='w-xs py-3'>

      <FormInput name='email' label='Email' type='email' />
      </div>
      <div className='py-3 w-xs'>

      <FormInput name='password' label='Password' type='password' />
      </div>
      <div className='py-3'>

      <Button nameOfTheButton='Login' functionOnClick={() => {}} buttonClassName='bg-blue-500 text-white py-2 px-4 rounded-md' />
      </div>
      <div>
      <p className='text-sm text-gray-500 dark:text-gray-400'>
      Don't have an account?{" "}
      <Link
        to='/register'
        className='text-blue-600 hover:underline dark:text-blue-400'
      >
        Register
      </Link>
      </p>
      </div>
    </div>
    </div>
  )
}

export default Login