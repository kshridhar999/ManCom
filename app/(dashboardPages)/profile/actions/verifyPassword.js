'use server';

import { getError, isErrorful } from '@/utils/responseFunctions';
import { cookies } from 'next/headers';

const verifyPassword = async (formData) => {
  const formObj = Object.fromEntries(formData.entries());
  const auth = (cookies().get('session_id') || {}).value;

  const res = await fetch(process.env.BACKEND_HOST + '/verify_password', {
    method: 'POST',
    body: JSON.stringify(formObj),
    headers: {
      ...(auth && { auth }),
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
