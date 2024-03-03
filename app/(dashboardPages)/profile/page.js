import moment from 'moment-timezone';
import { Paper } from '@mui/material';
import getUser from '@/api/get_user';
import NoUserFound from './components/noUserFound';
import ProfileUploadComponent from './components/profilePicForm';
import { startCase } from '@/utils/stringFunctions';
import ProfileUpdateComponent from './components/ProfileUpdateComponent';

const showOrder = [
  { key: 'first_name', label: 'First Name', value: (val) => startCase(val) },
  { key: 'middle_name', label: 'Middle Name', value: (val) => startCase(val) },
  { key: 'last_name', label: 'Last Name', value: (val) => startCase(val) },
  { key: 'email', label: 'Email' },
  {
    key: 'password_present',
    label: 'Password',
    value: (val) => (val ? 'xxxxxx' : 'Not present'),
  },
  {
    key: 'created_at',
    label: 'Joining Date',
    value: (val) => moment.utc(val).format('DD MMM YYYY, hh:mm A'),
  },
];

const getProfileInfo = (user = {}) => {
  const fieldArr = [];

  if (typeof user === 'object') {
    showOrder.forEach((field) => {
      if (field.key in user) {
        fieldArr.push({
          key: field.key,
          label: field.label,
          value: field.value?.(user[field.key]) || user[field.key],
        });
      }
    });
  }

  return fieldArr;
};

const Profile = async () => {
  const user = (await getUser()) || {};
  console.log('user', user);
  const userFound = !!user.id;
  const userInfo = getProfileInfo(user);

  return (
    <>
      {userFound ? (
        <div className='flex-auto p-4'>
          <p className='max-w-[fit-content] bg-gradient-to-r from-orange-600 to-indigo-600 bg-clip-text text-5xl font-black text-transparent'>
            YOUR PROFILE
          </p>
          <Paper
            className='mt-8 flex space-x-2 rounded-lg border-2 p-2'
            elevation={3}
          >
            <ProfileUploadComponent userId={user.id} imgUrl={user.image_url} />
            <ProfileUpdateComponent userInfo={userInfo} />
          </Paper>
        </div>
      ) : (
        <NoUserFound />
      )}
    </>
  );
};

export default Profile;
