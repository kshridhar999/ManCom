'use server';

import { revalidateTag } from 'next/cache';
import { cookies } from 'next/headers';

export const logout = async () => {
  const auth = (cookies().get('session_id') || {}).value;
  const res = await fetch(process.env.NEXT_PUBLIC_BACKEND_HOST + '/logout', {
    method: 'POST',
    headers: {
      ...(auth && { auth }),
    },
  });
  const result = await res.json();

  if (result?.error) {
    console.log('error::', result.error);
  }
  cookies().delete('session_id');
  cookies().delete('session_created');

  revalidateTag('user');
};
