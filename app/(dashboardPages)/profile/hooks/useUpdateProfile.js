'use client';
import { udpateUserSchema } from '@/app/inputConfigs';
import { profileShowOrder } from '@/constants/profileConstants';
import { useMemo, useState } from 'react';
import { updateUser } from '../actions/uploadProfile';
import toast from 'react-hot-toast';

const useUpdateProfile = ({ user }) => {
  const [edit, setEdit] = useState([]);
  const [isUpdating, setIsUpdating] = useState(false);
  const [openPasswordModal, setOpenPasswordModal] = useState(false);
  const [passwordVerified, setPasswordVerified] = useState(false);

  const userInfo = useMemo(() => {
    const fieldArr = [];

    if (typeof user === 'object') {
      profileShowOrder.forEach((field) => {
        if (field.key in user) {
          fieldArr.push({
            ...field,
            value: field.getValue(user[field.key]),
            type:
              field.key === 'password_present' && user[field.key]
                ? 'password'
                : 'text',
          });
        }
      });
    }

    return fieldArr;
  }, [user.id]);

  const addToEdit = (field, passwordVerified) => {
    if (field.key === 'password_present') {
      if (field.value === 'Not present' || passwordVerified) {
        setEdit((pv) => [...pv, { key: field.key, prev: field.value }]);
      } else {
        setOpenPasswordModal(true);
      }
      return;
    }
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
    const userEmail = user.email;
    if (!userEmail) {
      setIsUpdating(false);
      toast.error('No user identification for updation');
      return;
    }

    const changes = {};
    edit
      .filter((change) => change.prev !== change.value)
      .forEach((change) => {
        if (change.key === 'password_present') {
          changes.password = change.value;
        } else {
          changes[change.key] = change.value;
        }
      });

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

    const response = await updateUser({
      email: userEmail,
      changes: result.data,
    });

    if ('error' in response) {
      toast.error(response.error);
    } else {
      toast.success('Update Successful!!');
    }
    setIsUpdating(false);
    setEdit([]);
  };

  return {
    userInfo,
    edit,
    setEdit,
    isUpdating,
    setIsUpdating,
    passwordVerified,
    setPasswordVerified,
    openPasswordModal,
    setOpenPasswordModal,
    onUpdateUser,
    addToEdit,
    removeFromEdit,
    cancelEdit,
    isEditing,
    getValue,
    setValue,
  };
};

export default useUpdateProfile;
