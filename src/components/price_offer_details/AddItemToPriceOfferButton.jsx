import React from 'react';
import { Button } from '@mui/material';
import { useState } from 'react';
import ProductSearchModal from './ProductSearchModal';

const AddItemToPriceOfferButton = () => {
    const [modalOpen, setModalOpen] = useState(false);

    const handleAddClick = () => {
        setModalOpen(true);
    };

    const handleCloseModal = () => {
        setModalOpen(false);
    };

    return (
        <div>
            <Button variant="contained" color="s" onClick={handleAddClick}>
                Pridať položku
            </Button>
            
            <ProductSearchModal 
                open={modalOpen}
                onClose={handleCloseModal}
            />
        </div>
    );
};

export default AddItemToPriceOfferButton;