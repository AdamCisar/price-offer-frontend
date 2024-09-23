import React, { useRef } from 'react';
import { IconButton } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { useState } from 'react';
import CreatePriceOfferModal from './CreatePriceOfferModal';

const AddPriceOfferButton = () => {
    const [modalOpen, setModalOpen] = useState(false);
    const inputTitleRef = useRef(null);

    const handleAddClick = () => {
        setModalOpen(true);
        setTimeout(() => {
            inputTitleRef.current.focus();
        });
    };

    const handleCloseModal = () => {
        setModalOpen(false);
    };

    return (
        <>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: 200, minHeight: 350 }}>
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
                inputTitleRef={inputTitleRef}
            />
        </>
    );
};

export default AddPriceOfferButton;