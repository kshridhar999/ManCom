'use server';

import { revalidateTag } from 'next/cache';
import { cookies } from 'next/headers';

export const updateUser = async ({ id = '', email = '', changes }) => {
  if (!(email || id)) {
    return { error: 'No user provided for update' };
  }
  const response = await fetch(process.env.BACKEND_HOST + '/update_user', {
    method: 'POST',
    headers: {
      auth: (cookies().get('session_id') || {}).value,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      find: { ...(id && { id }), ...(email && { email }) },
      changes,
    }),
  });

  const data = await response.json();

  if ('error' in data) {
    return data;
  }

  revalidateTag('user');

  return data;
};

export async function onFileUpload(formData) {
  const file = formData.get('file');
  const id = formData.get('id');

  if (file) {
    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('upload_preset', process.env.CLOUDINARY_PRESET);

      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${process.env.CLOUDINARY_CLOUD_NAME}/image/upload`,
        {
          method: 'POST',
          body: formData,
        }
      );

      const data = await response.json();
      const res = await updateUser({
        id,
        changes: { image_url: data.secure_url },
      });

      if ('error' in res) {
        return res;
      }
    } catch (error) {
      return { error: 'Error uploading image:' + error.message };
    }
  }
}
