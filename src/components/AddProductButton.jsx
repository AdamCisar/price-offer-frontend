import React from 'react';
import { Button } from '@mui/material';
import { useState } from 'react';
import ProductSearchModal from './ProductSearchModal';

const AddProductButton = () => {
    const [modalOpen, setModalOpen] = useState(false);

    const handleAddClick = () => {
        setModalOpen(true);
    };

    const handleCloseModal = () => {
        setModalOpen(false);
    };

    return (
        <div style={{ marginBottom: 5 }}>
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

export default AddProductButton;