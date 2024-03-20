'use client';

import { Cancel, Edit } from '@mui/icons-material';
import useUpdateProfile from '../hooks/useUpdateProfile';
import VerifyPasswordDialogue from './VerifyPasswordDialogue';
import './profileInputs.css';

export default function ProfileUpdateComponent({ user = {} }) {
  const {
    userInfo,
    edit,
    isEditing,
    removeFromEdit,
    addToEdit,
    cancelEdit,
    openPasswordModal,
    setOpenPasswordModal,
    setPasswordVerified,
    getValue,
    setValue,
    onUpdateUser,
    isUpdating,
  } = useUpdateProfile({ user });

  return (
    <div className='relative grid flex-auto grid-cols-3 grid-rows-3 items-start gap-x-2 rounded-md border-DEFAULT border-violet-800'>
      {userInfo.map((field) => {
        const isEditPossible = !['email', 'created_at'].includes(field.key);
        return (
          <div
            className='relative border-slate-400 p-2 shadow-md'
            key={field.key}
          >
            <div className='flex items-center justify-between space-x-2'>
              <p className='text-md font-light text-black'>{field.label}</p>
              <div className='flex space-x-1'>
                {isEditPossible && (
                  <>
                    <button
                      className={`${isEditing(field) ? 'visible hover:bg-red-500' : 'hidden'} flex size-6 items-center justify-center overflow-hidden rounded-md p-0.5 transition-colors`}
                      onClick={() => removeFromEdit(field)}
                    >
                      <Cancel className='object-cover' />
                    </button>
                    <button
                      className={`rounded-md p-0.5 ${isEditing(field) ? 'bg-green-300' : 'hover:bg-green-300'} flex size-6 items-center justify-center overflow-hidden transition-colors`}
                      onClick={() => addToEdit(field)}
                    >
                      <Edit className='object-cover' />
                    </button>
                    <VerifyPasswordDialogue
                      open={openPasswordModal}
                      handleClose={() => setOpenPasswordModal(false)}
                      setPasswordVerified={setPasswordVerified}
                      userEmail={user.email}
                    />
                  </>
                )}
              </div>
            </div>
            <input
              className={`${isEditing(field) ? 'input-container' : 'input-container-disabled'}`}
              value={getValue(field)}
              disabled={!isEditing(field)}
              onChange={(e) => setValue(field, e.target.value)}
              placeholder={field.key === 'password_present' ? field.value : ''}
              type={field.type || 'text'}
            />
          </div>
        );
      })}
      {edit.length > 0 && (
        <div className='absolute bottom-0 right-0 flex space-x-2 p-2 text-gray-900'>
          <button
            className='rounded-md bg-red-500 px-2 py-1 shadow-lg transition-all hover:bg-red-700 hover:text-gray-200 hover:shadow-none'
            onClick={cancelEdit}
          >
            Cancel
          </button>
          <button
            className='rounded-md bg-emerald-500 px-2 py-1 shadow-lg transition-all hover:bg-emerald-700 hover:text-gray-200 hover:shadow-none disabled:bg-gray-500'
            onClick={onUpdateUser}
            disabled={isUpdating}
          >
            Update
          </button>
        </div>
      )}
    </div>
  );
}
