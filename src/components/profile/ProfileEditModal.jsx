import { useContext } from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, TextField, Button } from '@mui/material';
import { UserInfoContext } from '../../providers/UserInfoProvider';
import { useUniversalPost } from '../../api/UniversalPost';
import { SnackBarContext } from '../../providers/SnackBarProvider';
import Loading from '../utilities/Loading';

/**
 * ProfileEditModal Component
 *
 * @param {Object} props - Component props
 * @param {boolean} props.open - Determines if the modal is open or closed
 * @param {function} props.onClose - Function to call when the modal should close
 * @returns {JSX.Element} The rendered modal component
 */
const ProfileEditModal = ({ open, onClose }) => {
  const { userInfo, setUserInfo } = useContext(UserInfoContext);
  const { handleSnackbarOpen } = useContext(SnackBarContext);
  const [sendData, isLoading, error] = useUniversalPost("USER");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserInfo({
      ...userInfo,
      [name]: value,
    });
  };

  const handleSave = async () => {
    try {
      await sendData(userInfo);
      handleSnackbarOpen('Profil bol uložený!', 'success');
      onClose();
    } catch (err) {
      handleSnackbarOpen('Profil sa neuložil!', 'error');
      console.log(err);
    }
  };

  return (
    <>
    {userInfo &&
      <div>
      <Dialog 
        open={open} 
        onClose={onClose}
        onKeyUp={(e) => {
          if (e.key === 'Enter') {
            handleSave();
          }
        }}
      >
        <DialogTitle>Úprava profilu</DialogTitle>
        {isLoading ? (
          <Loading height={'10vh'} />
        ) : (
        <DialogContent>
          <TextField
            margin="dense"
            label="Meno"
            name="name"
            value={userInfo.name}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            margin="dense"
            label="Mesto/Obec"
            name="city"
            value={userInfo.city}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            margin="dense"
            label="Adresa"
            name="address"
            value={userInfo.address}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            margin="dense"
            label="PSČ"
            name="zip"
            value={userInfo.zip}
            onChange={handleChange}
            fullWidth
          />
        </DialogContent>
        )}
        <DialogActions>
          <Button onClick={onClose} color="secondary">
            Zatvoriť
          </Button>
          <Button onClick={handleSave} color="primary">
            Uložiť
          </Button>
        </DialogActions>
      </Dialog>
    </div>
    }
  </>
  );
};

export default ProfileEditModal;
