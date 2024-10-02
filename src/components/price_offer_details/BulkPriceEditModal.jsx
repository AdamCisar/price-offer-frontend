import React, { useState } from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, TextField, Button, Divider } from '@mui/material';

const BulkPriceEditModal = ({ open, onClose, handleEditSelectedPriceOfferItemsPrices, selectedItems, focusInputRef }) => {
  const [percent, setPercent] = useState('');

  const handleChange = (event) => {
      let { value } = event.target;
      value = value.replace(',', '.');

      if (isNaN(value) && value !== '-') {
          setPercent('');
          return;
      }

      setPercent(value);
  };

  const onSubmit = () => {
      handleEditSelectedPriceOfferItemsPrices(selectedItems, percent);
      setPercent('');
      onClose();
  };

  return (
    <div>
      <Dialog open={open} onClose={onClose}
            PaperProps={{
                style: { width: 500 }
            }} 

            onKeyUp={(e) => {
              if (e.key === 'Enter') {
                onSubmit();
              }
            }}
        >
        <DialogTitle>Zadajte o koľko percent chcete upraviť ceny</DialogTitle>
        <Divider />
        <DialogContent>
        <div style={{ width: '18%', display: 'flex', justifyContent: 'center', margin: 'auto', alignItems: 'center' }}>
            <TextField
                margin="dense"
                name="search"
                fullWidth
                variant="outlined"
                value={percent}
                onChange={handleChange}
                inputRef={focusInputRef}
            />
            <span style={{ marginLeft: '4px', lineHeight: 'normal' }}>%</span>
        </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose} color="secondary">
            Zatvoriť
          </Button>
          <Button 
            onClick={onSubmit}  
            color="primary" >
            Upraviť
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default BulkPriceEditModal;
