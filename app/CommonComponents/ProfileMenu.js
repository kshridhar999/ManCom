'use client';
import { IconButton } from '@mui/material';
import { getCookie } from 'cookies-next';
import { getURL } from 'next/dist/shared/lib/utils';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { logout } from './actions/logout';

const ProfileBar = ({ user = {} }) => {
  const router = useRouter();
  const currentUrl = getURL();
  const onProfilePage = (currentUrl || '').includes('profile');

  const [popoverVisible, setPopoverVisible] = useState(false);

  const [counter, setCounter] = useState(0);

  useEffect(() => {
    if (user?.id) {
      const inter = setInterval(() => {
        setCounter((pv) => (pv += 1));
      }, 1000);
      return () => clearInterval(inter);
    }
  }, [user?.id]);

  useEffect(() => {
    setCounter(() => {
      const sessionStart = new Date(getCookie('session_created'));
      const curTime = new Date();
      return Math.floor((curTime.getTime() - sessionStart.getTime()) / 1000);
    });
  }, []);

  const onLogOut = () => {
    logout();

    togglePopover();
    if (onProfilePage) {
      router.push('/');
    } else {
      router.refresh();
    }
  };

  const togglePopover = () => {
    setPopoverVisible((prevVisible) => !prevVisible);
  };

  return (
    <div className='relative text-sm'>
      <IconButton
        onClick={togglePopover}
        className='size-10 shadow-lg transition-all hover:shadow-none hover:ring-0'
        size='small'
        sx={{ borderRadius: '50%', overflow: 'hidden' }}
      >
        <Image
          src={user?.image_url || '/account.svg'}
          alt='No Profile'
          fill
          style={{ objectFit: 'cover' }}
        />
      </IconButton>

      <div
        className={`${
          popoverVisible ? 'scale-100 opacity-100' : 'scale-95 opacity-0'
        } absolute right-0 top-6 mt-4 w-60 overflow-hidden rounded-md border border-gray-200 bg-white shadow-lg transition-transform duration-300 ease-in-out`}
      >
        <div className='p-4'>
          {user?.id ? (
            <div className='flex flex-col justify-between'>
              <div className='flex items-center justify-between pb-2 text-gray-700'>
                <p className='font-bold text-gray-700'>Time Active:</p>
                <p className='font-bold text-gray-700'>
                  {counter > 1000 ? '> 1000' : counter}{' '}
                  <span className='text-sm font-normal text-gray-700'>
                    second{counter > 1 && 's'}
                  </span>
                </p>
              </div>
              <div className='flex items-center justify-between'>
                <Link
                  href={!onProfilePage ? '/profile' : '/'}
                  className='w-20 rounded-md bg-emerald-500 p-2 text-center align-middle text-white transition-all hover:bg-emerald-600 hover:shadow-md'
                >
                  {!onProfilePage ? 'Profile' : 'Home'}
                </Link>

                <button
                  className='w-20 rounded-md bg-yellow-500 p-2 text-white transition-all hover:shadow-md'
                  onClick={onLogOut}
                >
                  Log Out
                </button>
              </div>
            </div>
          ) : (
            <>
              <div className='mb-4 flex items-center justify-between'>
                <p className='text-gray-700'>Existing User?</p>
                <Link
                  href='/sign_in'
                  className='w-20 rounded-md bg-emerald-400 p-2 text-center text-white transition-all hover:bg-emerald-600 hover:shadow-md'
                >
                  Sign In
                </Link>
              </div>
              <div className='flex items-center justify-between'>
                <p className='text-gray-700 '>New User?</p>
                <Link
                  href='/sign_up'
                  className='w-20 rounded-md bg-emerald-400 p-2 text-center text-white transition-all hover:bg-emerald-600 hover:shadow-md'
                >
                  Sign Up
                </Link>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfileBar;
