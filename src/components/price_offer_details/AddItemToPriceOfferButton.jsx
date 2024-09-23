import React, { useRef } from 'react';
import { Button } from '@mui/material';
import { useState } from 'react';
import ProductSearchModal from './ProductSearchModal';

const AddItemToPriceOfferButton = () => {
    const [modalOpen, setModalOpen] = useState(false);
    const inputSearchRef = useRef(null);

    const handleAddClick = () => {
        setModalOpen(true);
        setTimeout(() => {
            inputSearchRef.current.focus();
        });
    };

    const handleCloseModal = () => {
        inputSearchRef.current.value = '';
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
                inputSearchRef={inputSearchRef}
            />
        </div>
    );
};

export default AddItemToPriceOfferButton;