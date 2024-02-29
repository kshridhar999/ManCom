'use server';

import { revalidateTag } from 'next/cache';
import { cookies } from 'next/headers';

export const logout = async () => {
  cookies().delete('session_id');
  cookies().delete('session_created');

  revalidateTag('user');
};
