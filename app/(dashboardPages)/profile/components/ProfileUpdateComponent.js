'use client';

import { Cancel, Edit } from '@mui/icons-material';
import { useEffect, useState } from 'react';
import './profileInputs.css';
import { updateUser } from '../actions/uploadProfile';
import toast from 'react-hot-toast';
import { udpateUserSchema } from '@/app/inputConfigs';

export default function ProfileUpdateComponent({ userInfo }) {
  const [edit, setEdit] = useState([]);
  const [isUpdating, setIsUpdating] = useState(false);

  const addToEdit = (field) => {
    setEdit((pv) => [...pv, { key: field.key, prev: field.value }]);
  };

  const removeFromEdit = (field) => {
    setEdit((pv) => pv.filter((existing) => existing.key !== field.key));
  };

  const cancelEdit = () => {
    setEdit([]);
  };

  const isEditing = (field) => {
    return (
      edit.length > 0 && edit.find((editField) => editField.key === field.key)
    );
  };

  const getValue = (field) => {
    const editField = edit?.find((editField) => editField.key === field.key);
    if (typeof editField?.value === 'string') {
      return editField.value;
    }
    return editField?.prev || field.value;
  };

  const setValue = (field, value) => {
    const otherFields = edit.filter((existing) => existing.key !== field.key);
    const editField = edit.find((editField) => editField.key === field.key);
    const newEditFields = [...otherFields, { ...editField, value: value }];
    setEdit(newEditFields);
  };

  const onUpdateUser = async () => {
    setIsUpdating(true);
    const userEmail = userInfo.find((info) => info.key === 'email').value;
    if (!userEmail) {
      setIsUpdating(false);
      toast.error('No user identification for updation');
      return;
    }

    const changes = {};
    edit
      .filter((change) => change.prev !== change.value)
      .forEach((change) => (changes[change.key] = change.value));

    if (Object.keys(changes).length === 0) {
      setIsUpdating(false);
      toast.error('No changes to update');
      return;
    }

    const result = udpateUserSchema.safeParse(changes);
    if (!result.success) {
      setIsUpdating(false);
      let errStr = Object.values(result.error.flatten().fieldErrors).join(', ');
      toast.error(errStr);
      return;
    }
    const response = await updateUser({ email: userEmail, changes });

    if ('error' in response) {
      toast.error(response.error);
    } else {
      toast.success('Update Successful!!');
    }
    setIsUpdating(false);
    setEdit([]);
  };

  return (
    <div className='relative grid flex-auto grid-cols-3 grid-rows-3 items-start gap-x-2 rounded-md border-[1px] border-violet-800'>
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
                  </>
                )}
              </div>
            </div>
            <input
              className={`${isEditing(field) ? 'input-container' : 'input-container-disabled'}`}
              value={getValue(field)}
              disabled={!isEditing(field)}
              onChange={(e) => setValue(field, e.target.value)}
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
