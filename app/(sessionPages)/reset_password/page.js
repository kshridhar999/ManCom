import { Divider } from '@mui/material';
import ResetPasswordForm from './resetPasswordForm';

const ResetPassword = ({ searchParams }) => {
  const { token = '' } = searchParams;

  return (
    <div className='flex h-screen w-screen flex-col items-center justify-center bg-gradient-to-br from-zinc-300 to-zinc-700'>
      <div className='flex w-96 flex-col space-y-4 rounded-md bg-slate-100 p-4 shadow-md'>
        <text className='bg-gradient-to-br from-stone-300 to-stone-800 bg-clip-text text-center text-2xl font-black text-transparent'>
          Reset Password
        </text>
        <Divider variant='middle' />
        <ResetPasswordForm token={token} />
      </div>
    </div>
  );
};

export default ResetPassword;
