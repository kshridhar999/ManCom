'use client';
import { resetPwdSchema } from '@/app/inputConfigs';
import { useRouter } from 'next/navigation';
import { useFormStatus } from 'react-dom';
import toast from 'react-hot-toast';
import { onResetPassword } from './actions/resetPassword';

const ResetButton = () => {
  const { pending } = useFormStatus();
  return (
    <button
      className='mt-4 w-full rounded-md bg-emerald-500 p-2 text-white transition-all hover:bg-emerald-700 hover:shadow-md'
      type='submit'
      disabled={pending}
    >
      {pending ? 'Updating...' : 'Update'}
    </button>
  );
};

const ResetPasswordForm = ({ token }) => {
  const router = useRouter();

  const handleReset = async (formData) => {
    const rawData = Object.fromEntries(formData.entries());
    const validatedFields = resetPwdSchema.safeParse(rawData);

    if (!validatedFields.success) {
      let errStr = Object.values(
        validatedFields.error.flatten().fieldErrors
      ).join(', ');
      toast.error(errStr);
      return;
    }
    const res = (await onResetPassword(formData)) || {};

    if ('errors' in res) {
      toast.error(() => {
        return (
          <ul>
            {res.errors?.map((err, ind) => (
              <li key={ind}>{err.message}</li>
            ))}
          </ul>
        );
      });
    } else {
      router.push('/sign_in');
    }
  };
  return (
    <form className='flex flex-col space-y-4' action={handleReset}>
      <input
        type='password'
        name='new_password'
        className='h-10 rounded-lg border-2 p-2 focus:outline-none'
        autoComplete=''
        placeholder='New Password'
      />
      <input
        type='password'
        name='confirm_password'
        className='h-10 rounded-lg border-2 p-2 focus:outline-none'
        autoComplete=''
        placeholder='Confirm Password'
      />
      <input type='hidden' name='token' value={token} />
      <ResetButton />
    </form>
  );
};
export default ResetPasswordForm;
