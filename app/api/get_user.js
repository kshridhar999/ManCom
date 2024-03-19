import { cookies } from 'next/headers';

const getUser = async () => {
  const auth = (cookies().get('session_id') || {}).value;
  try {
    const res = await fetch(process.env.BACKEND_HOST + '/get_user', {
      method: 'GET',
      headers: {
        ...(auth && { auth }),
        'Content-Type': 'application/json',
      },
      next: { tags: ['user'] },
    });
    const data = await res.json();

    if (!(data || {}).error) {
      return { user: data.item };
    } else {
      return { error: data.error };
    }
  } catch (e) {
    return { error: e.message };
  }
};

export default getUser;
