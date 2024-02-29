import Image from 'next/image';
import ProfileBar from './ProfileBar';
import getUser from '@/api/get_user';

async function TopBar() {
  let user = (await getUser()) || {};

  return (
    <nav className='sticky top-0 flex h-12 items-center justify-between border-b-[1px] border-slate-500 p-4 shadow'>
      <Image src='/logo.png' alt='~' height={32} width={32} />
      <ProfileBar user={user} />
    </nav>
  );
}

export default TopBar;
