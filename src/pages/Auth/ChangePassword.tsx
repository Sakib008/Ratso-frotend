import Button from '@/components/myUi/button'
import FormInput from '@/components/myUi/FormInput'
import { Link } from 'react-router-dom'

const ChangePassword : React.FC = () => {
  return (
    <div className='flex flex-col items-center justify-center h-screen'>
    <div className='flex flex-col items-center justify-center bg-violet-200 rounded-2xl border-2 border-violet-400 w-xs md:w-xl px-5 h-2/3'>

      <h1 className='text-3xl font-bold text-center py-3'>Login</h1>
      <div className='py-3 w-xs'>
      <FormInput name='oldPassword' label='Old Password' type='password' />
      </div>
      <div className='py-3 w-xs'>
      <FormInput name='newPassword' label='New Password' type='password' />
      </div>
      <div className='py-3 w-xs'>
      <FormInput name='confirmPassword' label='Confirm Password' type='password' />
      </div>
      <div className='py-3'>

      <Button nameOfTheButton='Login' functionOnClick={() => {}} buttonClassName='bg-blue-500 text-white py-2 px-4 rounded-md' />
      </div>
      <div>
      <p className='text-sm text-gray-500 dark:text-gray-400'>
      Don't want to change your password?{" "}
      <Link
        to='/profile'
        className='text-violet-600 hover:underline dark:text-violet-400'
      >
        Go back
      </Link>
      </p>
      </div>
    </div>
    </div>
  )
}

export default ChangePassword