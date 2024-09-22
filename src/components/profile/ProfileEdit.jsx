import React, { useState } from 'react';
import PersonIcon from '@mui/icons-material/Person';
import ProfileEditModal from './ProfileEditModal';

const ProfileEdit = () => {
    const [modalOpen, setModalOpen] = useState(false);

    const handleEditClick = () => {
        setModalOpen(true);
    };

    const handleCloseModal = () => {
        setModalOpen(false);
    };

  return (
    <>
        <PersonIcon onClick={() => handleEditClick()} sx={{ fontSize: 30, cursor: 'pointer' }}/>
        <ProfileEditModal 
                    open={modalOpen}
                    onClose={handleCloseModal}
        />
    </>
  );
};

export default ProfileEdit;
