'use server';
import { getError, isErrorful } from '@/utils/responseFunctions';
import { startCase } from '@/utils/stringFunctions';
import { cookies } from 'next/headers';

export const onSignUp = async (formData) => {
  const reqObj = Object.fromEntries(formData.entries());
  try {
    const res = await fetch(
      process.env.NEXT_PUBLIC_BACKEND_HOST + '/sign_up_user',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(reqObj),
      }
    );
    const result = await res.json();

    if (!isErrorful(result)) {
      cookies().set('session_id', result.token, {
        expires: new Date(result.expires_at),
      });
      cookies().set('session_created', result.issued_at);
    } else {
      return getError(result);
    }
  } catch (e) {
    return {
      errors: [
        {
          message: `${startCase(e.message)}: Server Down, please try again later`,
        },
      ],
    };
  }
};
