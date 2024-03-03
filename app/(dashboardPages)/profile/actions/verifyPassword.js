'use server';

import { getError, isErrorful } from '@/utils/responseFunctions';
import { cookies } from 'next/headers';

const verifyPassword = async (formData) => {
  const formObj = Object.fromEntries(formData.entries());

  formObj.create_session = false;

  const res = await fetch(process.env.BACKEND_HOST + '/verify_password', {
    method: 'POST',
    body: JSON.stringify(formObj),
    headers: {
      auth: (cookies().get('session_id') || {}).value,
      'Content-Type': 'application/json',
    },
  });

  const data = await res.json();
  if (isErrorful(data)) {
    return getError(data);
  }

  return data;
};

export default verifyPassword;
