import React, { useState } from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, TextField, Button } from '@mui/material';

const BulkPriceEditModal = ({ open, onClose, handleEditSelectedPriceOfferItems, selectedItems }) => {
    const [percent, setPercent] = useState(0);

    const handleChange = (event) => {
        setPercent(event.target.value);
    };

  return (
    <div>
      <Dialog open={open} onClose={onClose}
            PaperProps={{
                style: { width: 500 }
            }} 
        >
        <DialogTitle>Zadajte o koľko percent chcete upraviť ceny</DialogTitle>
        <DialogContent>
        <div style={{ width: '18%', display: 'flex', justifyContent: 'center', margin: 'auto', alignItems: 'center' }}>
            <TextField
                margin="dense"
                name="search"
                fullWidth
                variant="outlined"
                value={percent}
                onChange={handleChange}
            />
            <span style={{ marginLeft: '4px', lineHeight: 'normal' }}>%</span>
        </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose} color="secondary">
            Zatvoriť
          </Button>
          <Button    onClick={() => {
                        handleEditSelectedPriceOfferItems(selectedItems, percent);
                        onClose();
                    }}  
            color="primary" >
            Upraviť
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default BulkPriceEditModal;
