import Link from 'next/link';
import SignUpForm from './signUpForm';
import { Divider } from '@mui/material';

const SignUp = () => {
  return (
    <div className='flex h-screen w-screen items-center justify-center bg-gradient-to-br from-zinc-300 to-zinc-700'>
      <div className='flex flex-col space-y-4 rounded-md bg-slate-100 p-4 shadow-md'>
        <text className='bg-gradient-to-br from-stone-300 to-stone-800 bg-clip-text text-center text-2xl font-black text-transparent'>
          Sign Up
        </text>
        <Divider variant='middle' />
        <SignUpForm />

        <div className='flex items-center justify-between space-x-2 self-end'>
          <p>Already have an account?</p>
          <Link
            href='/sign_in'
            className=' text-indigo-500 underline hover:text-indigo-700'
          >
            Sign In
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
