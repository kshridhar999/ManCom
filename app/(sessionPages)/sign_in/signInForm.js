'use client';
import { useRouter } from 'next/navigation';
import { onSignIn } from './actions/signIn';
import toast from 'react-hot-toast';
import { useFormStatus } from 'react-dom';
import { signInSchema } from '@/app/inputConfigs';

const SignInButton = () => {
  const { pending } = useFormStatus();
  return (
    <button
      className='mt-4 w-full rounded-md bg-emerald-500 p-2 text-white transition-all hover:bg-emerald-700 hover:shadow-md'
      type='submit'
      disabled={pending}
      variant='contained'
    >
      {pending ? 'Signing In...' : 'Sign In'}
    </button>
  );
};

const SignInForm = () => {
  const router = useRouter();

  const handleSignIn = async (formData) => {
    const rawData = Object.fromEntries(formData.entries());
    const validatedFields = signInSchema.safeParse(rawData);

    if (!validatedFields.success) {
      let errStr = Object.values(
        validatedFields.error.flatten().fieldErrors
      ).join(', ');
      toast.error(errStr);
      return;
    }
    const res = (await onSignIn(formData)) || {};

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
      router.push('/dashboard');
    }
  };
  return (
    <form className='flex flex-col space-y-4' action={handleSignIn}>
      <input
        type='email'
        name='email'
        className='h-10 rounded-lg border-2 p-2 focus:outline-none'
        autoComplete=''
        placeholder='Email'
      />
      <input
        type='password'
        name='password'
        className='h-10 rounded-lg border-2 p-2 focus:outline-none'
        autoComplete=''
        placeholder='Password'
      />
      <SignInButton />
    </form>
  );
};
export default SignInForm;
