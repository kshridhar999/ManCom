'use client';

import { useRouter } from 'next/navigation';
import { onSignUp } from './actions/signUp';
import toast from 'react-hot-toast';
import { useFormStatus } from 'react-dom';
import { signUpSchema } from '@/app/inputConfigs';
import { Button } from '@mui/material';
import { useState } from 'react';
import { useForm, Form } from 'react-hook-form';

import { zodResolver } from '@hookform/resolvers/zod';
import { GeneralFields, UserType, PasswordFields } from './FormStateComponents';

const formStateComponent = [
  { Component: UserType, fields: ['user_type'] },
  {
    Component: GeneralFields,
    fields: ['first_name', 'middle_name', 'last_name', 'email'],
  },
  { Component: PasswordFields },
];

const SignUpBotton = () => {
  const { pending } = useFormStatus();

  return (
    <Button
      className=' bg-green-500 text-white transition-all hover:bg-green-700'
      type='submit'
      disabled={pending}
    >
      Sign Up
    </Button>
  );
};

const SignUpForm = () => {
  const router = useRouter();

  const [formState, setFormState] = useState(0);
  const prevPossible = formState > 0;
  const nextPossible = formState < formStateComponent.length - 1;
  const {
    trigger,
    formState: { errors },
    register,
    handleSubmit,
    control,
    setValue,
    clearErrors,
  } = useForm({ resolver: zodResolver(signUpSchema) });
  const { Component: FormStateComponent } = formStateComponent[formState];

  const goBack = () => {
    clearErrors();
    setFormState(formState - 1);
  };

  const goForward = async () => {
    const checkField = await trigger(formStateComponent[formState].fields, {
      shouldFocus: true,
    });
    if (!checkField) return;

    setFormState(formState + 1);
  };

  const handleSignUp = async (data) => {
    const formData = new FormData();

    Object.entries(data).forEach(([key, value]) => {
      formData.append(key, value);
    });

    const res = (await onSignUp(formData)) || {};

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
    <Form
      className='flex size-80 flex-col justify-between space-y-4'
      onSubmit={handleSubmit(handleSignUp)}
      control={control}
    >
      <FormStateComponent
        register={register}
        errors={errors}
        control={control}
        setValue={setValue}
      />
      <div className='flex w-full flex-row-reverse justify-between space-x-2'>
        {nextPossible ? (
          <Button
            type='button'
            onClick={() => goForward()}
            className='bg-emerald-600 text-white hover:bg-emerald-800'
          >
            Next
          </Button>
        ) : (
          <SignUpBotton />
        )}
        {prevPossible && (
          <Button
            type='button'
            onClick={() => goBack()}
            className='bg-amber-400 text-white hover:bg-amber-700'
          >
            Back
          </Button>
        )}
      </div>
    </Form>
  );
};

export default SignUpForm;
