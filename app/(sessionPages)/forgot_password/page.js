'use client';
import Link from 'next/link';
import ForgotPasswordForm from './forgotPasswordForm';
import { Divider } from '@mui/material';

const SignIn = () => {
  return (
    <div className='flex h-screen w-screen flex-col items-center justify-center bg-gradient-to-br from-zinc-300 to-zinc-700'>
      <div className='flex w-96 flex-col space-y-4 rounded-md bg-slate-100 p-4 shadow-md'>
        <text className='bg-gradient-to-br from-stone-300 to-stone-800 bg-clip-text text-center text-2xl font-black text-transparent'>
          Forgot Password
        </text>
        <Divider variant='middle' />
        <ForgotPasswordForm />
      </div>
      <Link
        href='/sign_in'
        className='mt-4 rounded bg-gray-400 px-4 py-2 text-gray-900 transition hover:bg-gray-600 hover:text-gray-100'
      >
        Home
      </Link>
    </div>
  );
};

export default SignIn;
