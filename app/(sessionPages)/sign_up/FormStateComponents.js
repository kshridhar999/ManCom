import { ButtonGroup, Button } from '@mui/material';
import { Controller } from 'react-hook-form';

const userTypes = {
  customer: { long_label: 'Friend In Need', short_label: '(Customer)' },
  service_provider: {
    long_label: 'Friend Indeed',
    short_label: '(Service Provider)',
  },
};

export const UserType = ({ control, setValue, errors }) => {
  return (
    <div className='flex flex-auto space-x-2'>
      <div className='flex flex-col justify-center self-center'>
        <Controller
          name='user_type'
          control={control}
          render={({ field }) => (
            <ButtonGroup>
              {Object.keys(userTypes).map((type) => {
                return (
                  <Button
                    key={type}
                    className={`flex-1 text-white ${field.value === type ? 'pointer-events-none bg-indigo-700' : 'bg-zinc-500 hover:bg-zinc-700'}`}
                    onClick={() => {
                      setValue('user_type', type);
                    }}
                  >
                    <div>
                      <strong>{userTypes[type].long_label}</strong>
                      <p>{userTypes[type].short_label}</p>
                    </div>
                  </Button>
                );
              })}
            </ButtonGroup>
          )}
        />
        <p
          className={`${errors?.user_type?.message ? 'visible' : 'hidden'} text-[10px] text-red-700`}
        >
          {errors?.user_type?.message}
        </p>
      </div>
    </div>
  );
};

export const GeneralFields = ({ register, errors }) => {
  return (
    <>
      <div className='flex items-center justify-between space-x-2'>
        <label htmlFor='first_name'>First Name</label>
        <div className='h-10'>
          <input
            type='text'
            className='h-10 rounded-lg border-2 p-2 focus:outline-none'
            {...register('first_name')}
          />
          <p
            className={`${errors?.first_name?.message ? 'visible' : 'hidden'} text-[10px] text-red-700`}
          >
            {errors?.first_name?.message}
          </p>
        </div>
      </div>
      <div className='flex items-center justify-between space-x-2'>
        <label htmlFor='middle_Name'>Middle Name</label>
        <div className='h-10'>
          <input
            type='text'
            className='h-10 rounded-lg border-2 p-2 focus:outline-none'
            {...register('middle_name')}
          />
          <p
            className={`${errors?.middle_name?.message ? 'visible' : 'hidden'} text-[10px] text-red-700`}
          >
            {errors?.middle_name?.message}
          </p>
        </div>
      </div>
      <div className='flex items-center justify-between space-x-2'>
        <label htmlFor='last_name'>Last Name</label>
        <div className='h-10'>
          <input
            type='text'
            className='h-10 rounded-lg border-2 p-2 focus:outline-none'
            {...register('last_name')}
          />
          <p
            className={`${errors?.last_name?.message ? 'visible' : 'hidden'} text-[10px] text-red-700`}
          >
            {errors?.last_name?.message}
          </p>
        </div>
      </div>
      <div className='flex items-center justify-between space-x-2'>
        <label htmlFor='email'>
          Email<span className='text-red-500'>*</span>
        </label>
        <div className='h-10'>
          <input
            type='email'
            className='h-10 rounded-lg border-2 p-2 focus:outline-none'
            {...register('email')}
          />
          <p
            className={`${errors?.email?.message ? 'visible' : 'hidden'} text-[10px] text-red-700`}
          >
            {errors?.email?.message}
          </p>
        </div>
      </div>
    </>
  );
};

export const PasswordFields = ({ register, errors = {} }) => {
  return (
    <div className='flex flex-auto flex-col justify-evenly'>
      <div className='flex items-center justify-between space-x-2'>
        <label htmlFor='password'>
          Password<span className='text-red-500'>*</span>
        </label>
        <div className='h-10'>
          <input
            type='password'
            className='h-10 rounded-lg border-2 p-2 focus:outline-none'
            {...register('password')}
          />
          <p
            className={`${errors?.password?.message ? 'visible' : 'hidden'} text-[10px] text-red-700`}
          >
            {errors?.password?.message}
          </p>
        </div>
      </div>
      <div className='flex items-center justify-between space-x-2'>
        <label htmlFor='confirm_password'>
          Confirm Password<span className='text-red-500'>*</span>
        </label>
        <div>
          <input
            type='password'
            className='h-10 rounded-lg border-2 p-2 focus:outline-none'
            {...register('confirm_password')}
          />
          <p
            className={`${errors?.confirm_password?.message ? 'visible' : 'hidden'} text-[10px] text-red-700`}
          >
            {errors?.confirm_password?.message}
          </p>
        </div>
      </div>
    </div>
  );
};
