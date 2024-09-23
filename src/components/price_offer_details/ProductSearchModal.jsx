import React, { useState } from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, TextField, Button } from '@mui/material';

const ProductSearchModal = ({ open, onClose, inputSearchRef }) => {

    const handleSave = () => {

    };

  return (
    <div>
      <Dialog open={open} onClose={onClose}
            PaperProps={{
                style: { width: 500 }
            }} 
        >
        <DialogTitle>Vyhľadať produkt</DialogTitle>
        <DialogContent>
        <TextField
            margin="dense"
            name="search"
            fullWidth
            placeholder="Začnite písať..."
            variant="outlined"
            inputRef={inputSearchRef}
        />
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose} color="secondary">
            Zatvoriť
          </Button>
          <Button onClick={handleSave} color="primary">
            Pridať
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default ProductSearchModal;
