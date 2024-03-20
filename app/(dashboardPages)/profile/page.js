import getUser from '@/api/get_user';
import { Paper } from '@mui/material';
import ProfileUpdateComponent from './components/ProfileUpdateComponent';
import NoUserFound from './components/noUserFound';
import ProfileUploadComponent from './components/profilePicForm';

const Profile = async () => {
  const { user = {} } = (await getUser()) || {};

  const userFound = !!user.id;

  return (
    <>
      {userFound ? (
        <div className='flex-auto p-4'>
          <p className='max-w-fit bg-gradient-to-r from-orange-600 to-indigo-600 bg-clip-text text-5xl font-black text-transparent'>
            YOUR PROFILE
          </p>
          <Paper
            className='mt-8 flex space-x-2 rounded-lg border-2 p-2'
            elevation={3}
          >
            <ProfileUploadComponent userId={user.id} imgUrl={user.image_url} />
            <ProfileUpdateComponent user={user} />
          </Paper>
        </div>
      ) : (
        <NoUserFound />
      )}
    </>
  );
};

export default Profile;
