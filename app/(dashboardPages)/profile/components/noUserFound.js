import Link from 'next/link';

export default function NoUserFound() {
  return (
    <div className='flex flex-auto flex-col items-center justify-center space-y-2'>
      <div className=' text-4xl font-extrabold'>No User Found</div>
      <div className='text-2xl font-extralight'>
        Return to Home or Sign in/Sign Up
      </div>
      <div className='flex space-x-4 pt-4'>
        <Link
          href='/'
          className='w-20 rounded-md bg-emerald-400 p-2 text-center align-middle text-white hover:shadow-md'
        >
          Home
        </Link>
        <Link
          href='/sign_in'
          className='w-20 rounded-md bg-emerald-400 p-2 text-center align-middle text-white hover:shadow-md'
        >
          Sign In
        </Link>
        <Link
          href='/sign_up'
          className='w-20 rounded-md bg-emerald-400 p-2 text-center align-middle text-white hover:shadow-md'
        >
          Sign Up
        </Link>
      </div>
    </div>
  );
}
