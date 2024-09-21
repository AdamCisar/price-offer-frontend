import React from 'react';
import { IconButton } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { useState } from 'react';
import CreatePriceOfferModal from './CreatePriceOfferModal';

const AddPriceOfferButton = () => {
    const [modalOpen, setModalOpen] = useState(false);

    const handleAddClick = () => {
        setModalOpen(true);
    };

    const handleCloseModal = () => {
        setModalOpen(false);
    };

    return (
        <>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: 200 }}>
                <IconButton
                    onClick={handleAddClick}
                    sx={{
                        width: 106,
                        height: 106,
                        borderRadius: '100%',
                        backgroundColor: 'darkgrey', 
                        color: 'white',
                        '&:hover': {
                        backgroundColor: 'grey',
                        },
                    }}
                    >
                <AddIcon />
                </IconButton>
            </div>

            <CreatePriceOfferModal
                open={modalOpen}
                onClose={handleCloseModal}
            />
        </>
    );
};

export default AddPriceOfferButton;