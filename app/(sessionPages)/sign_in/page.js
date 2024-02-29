'use client';
import Link from 'next/link';
import SignInForm from './signInForm';
import { Divider } from '@mui/material';

const SignIn = () => {
  return (
    <div className='flex h-screen w-screen items-center justify-center bg-gradient-to-br from-zinc-300 to-zinc-700'>
      <div className='flex w-96 flex-col space-y-4 rounded-md bg-slate-100 p-4 shadow-md'>
        <text className='bg-gradient-to-br from-stone-300 to-stone-800 bg-clip-text text-center text-2xl font-black text-transparent'>
          Sign In
        </text>
        <Divider variant='middle' />
        <SignInForm />
        <div className='flex items-center justify-between space-x-2 self-end'>
          <p>Don&apos;t have an account?</p>
          <Link
            href='/sign_up'
            className='text-indigo-500 underline hover:text-indigo-700'
          >
            Sign Up
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
