import toast from 'react-hot-toast';
import verifyPassword from '../actions/verifyPassword';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
} from '@mui/material';

const VerifyPasswordDialogue = ({
  open = false,
  handleClose = () => {},
  setPasswordVerified = () => {},
  userEmail = '',
}) => {
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      PaperProps={{
        component: 'form',
        onSubmit: async (event) => {
          event.preventDefault();
          const formData = new FormData(event.currentTarget);
          const response = await verifyPassword(formData);

          if ('errors' in response) {
            toast.error(() => {
              return (
                <ul>
                  {response.errors?.map((err, ind) => (
                    <li key={ind}>{err.message}</li>
                  ))}
                </ul>
              );
            });
          } else {
            toast.success('Verified successfully');
            setPasswordVerified(true);
            handleClose();
          }
        },
      }}
    >
      <DialogTitle>Verify Password</DialogTitle>
      <DialogContent>
        <DialogContentText>
          To change the password, please enter your current password.
        </DialogContentText>
        <TextField
          required
          margin='dense'
          id='password'
          name='password'
          label='Current Password'
          type='password'
          fullWidth
          variant='standard'
        />
        <input type='hidden' name='email' value={userEmail} />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button type='submit'>Verify</Button>
      </DialogActions>
    </Dialog>
  );
};

export default VerifyPasswordDialogue;
