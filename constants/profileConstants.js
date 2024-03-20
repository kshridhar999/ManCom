import { startCase } from '@/utils/stringFunctions';
import moment from 'moment-timezone';

export const profileShowOrder = [
  {
    key: 'first_name',
    label: 'First Name',
    getValue: (val) => startCase(val),
  },
  {
    key: 'middle_name',
    label: 'Middle Name',
    getValue: (val) => startCase(val),
  },
  {
    key: 'last_name',
    label: 'Last Name',
    getValue: (val) => startCase(val),
  },
  { key: 'email', label: 'Email', getValue: (val) => val },
  {
    key: 'password_present',
    label: 'Password',
    getValue: (val) => (val ? 'xxxxxx' : 'Not present'),
  },
  {
    key: 'created_at',
    label: 'Joining Date',
    getValue: (val) => moment.utc(val).format('DD MMM YYYY, hh:mm A'),
  },
];
