import React, { useState } from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, TextField, Button } from '@mui/material';

const ProfileEditModal = ({ open, onClose }) => {
  const [profile, setProfile] = useState({
    name: '',
    address: '',
    zip: '',
    city: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile({
      ...profile,
      [name]: value,
    });
  };

  const handleSave = () => {
    console.log('Profile Data:', profile);
    onClose();
  };

  return (
    <div>
      <Dialog open={open} onClose={onClose}>
        <DialogTitle>Úprava profilu</DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            label="Meno"
            name="name"
            value={profile.name}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            margin="dense"
            label="Adresa"
            name="address"
            value={profile.address}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            margin="dense"
            label="PSČ"
            name="zip"
            value={profile.zip}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            margin="dense"
            label="Mesto/Obec"
            name="city"
            value={profile.city}
            onChange={handleChange}
            fullWidth
          />
        </DialogContent>
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
  );
};

export default ProfileEditModal;
