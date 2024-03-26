'use client';
import { forgotPwdSchema } from '@/app/inputConfigs';
import Link from 'next/link';
import { useState } from 'react';
import { useFormStatus } from 'react-dom';
import toast from 'react-hot-toast';
import { onClickForgotPwd } from './actions/forgotPwd';

const ForgotPwdButton = () => {
  const { pending } = useFormStatus();
  return (
    <button
      className='mt-4 w-full rounded-md bg-emerald-500 p-2 text-white transition-all hover:bg-emerald-700 hover:shadow-md'
      type='submit'
      disabled={pending}
      variant='contained'
    >
      {pending ? 'Verifying...' : 'Verify'}
    </button>
  );
};

const EmailInput = () => {
  return (
    <>
      <input
        type='email'
        name='email'
        className='h-10 rounded-lg border-2 p-2 focus:outline-none'
        autoComplete=''
        placeholder='Email'
      />
      <ForgotPwdButton />
    </>
  );
};

const ForgotLinkSuccess = () => {
  return (
    <>
      <p className='text-center text-lg'>
        Reset password link sent successfully to the given email.
      </p>
      <Link
        href='/sign_in'
        className='mt-4 flex w-full justify-center rounded-md bg-emerald-500 p-2 text-white transition-all hover:bg-emerald-700 hover:shadow-md'
      >
        Back to sign in
      </Link>
    </>
  );
};

const formStates = [
  { key: 0, Component: EmailInput },
  { key: 1, Component: ForgotLinkSuccess },
];

const ForgotPasswordForm = () => {
  const [formState, setFormState] = useState(0);

  const handleForgot = async (formData) => {
    const rawData = Object.fromEntries(formData.entries());
    const validatedFields = forgotPwdSchema.safeParse(rawData);

    if (!validatedFields.success) {
      let errStr = Object.values(
        validatedFields.error.flatten().fieldErrors
      ).join(', ');
      toast.error(errStr);
      return;
    }
    const res = (await onClickForgotPwd(formData)) || {};

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
      setFormState(1);
    }
  };

  const Component = formStates[formState].Component;
  return (
    <form className='flex flex-col space-y-4' action={handleForgot}>
      <Component />
    </form>
  );
};
export default ForgotPasswordForm;
