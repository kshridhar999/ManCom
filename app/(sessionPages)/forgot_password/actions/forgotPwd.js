'use server';
import { getError, isErrorful } from '@/utils/responseFunctions';
import { startCase } from '@/utils/stringFunctions';

export const onClickForgotPwd = async (formData) => {
  const reqObj = Object.fromEntries(formData.entries());

  try {
    const res = await fetch(
      process.env.NEXT_PUBLIC_BACKEND_HOST + '/forgot_password',
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
      return { message: 'success' };
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
