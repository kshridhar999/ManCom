'use client';

import { Cancel, Edit } from '@mui/icons-material';
import { useState } from 'react';
import './profileInputs.css';

export default function ProfileUpdateComponent({ userInfo }) {
  const [edit, setEdit] = useState([]);
  const [updateValues, setUpdateValues] = useState([]);

  const addToEdit = (key) => {
    setEdit((pv) => [...pv, key]);
  };

  const removeFromEdit = (key) => {
    setEdit((pv) => pv.filter((existing) => existing !== key));
  };

  const cancelEdit = () => {
    setEdit([]);
  };

  const isEditing = (key) => {
    return edit.length > 0 && edit.includes(key);
  };

  return (
    <div className='relative grid flex-auto grid-cols-3 grid-rows-3 items-start gap-x-2 rounded-md border-[1px] border-violet-800'>
      {userInfo.map((field) => {
        return (
          <div
            className='relative border-slate-400 p-2 shadow-md'
            key={field.key}
          >
            <div className='flex items-center justify-between space-x-2'>
              <p className='text-md font-light text-black'>{field.label}</p>
              <div className='flex space-x-1'>
                <button
                  className={`${isEditing(field.key) ? 'visible hover:bg-red-500' : 'hidden'} flex size-6 items-center justify-center overflow-hidden rounded-md p-0.5 transition-colors`}
                  onClick={() => removeFromEdit(field.key)}
                >
                  <Cancel className='object-cover' />
                </button>
                <button
                  className={`rounded-md p-0.5 ${isEditing(field.key) ? 'bg-green-300' : 'hover:bg-green-300'} flex size-6 items-center justify-center overflow-hidden transition-colors`}
                  onClick={() => addToEdit(field.key)}
                >
                  <Edit className='object-cover' />
                </button>
              </div>
            </div>
            <input
              className={`${isEditing(field.key) ? 'input-container' : 'input-container-disabled'}`}
              value={field.value}
              disabled={!isEditing(field.key)}
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
          <button className='rounded-md bg-emerald-500 px-2 py-1 shadow-lg transition-all hover:bg-emerald-700 hover:text-gray-200  hover:shadow-none'>
            Update
          </button>
        </div>
      )}
    </div>
  );
}
