import { Dialog, DialogActions, DialogContent, DialogTitle, TextField, Button, Box, Divider } from '@mui/material';
import useSubmitPriceOfferItem from '../../hooks/useSubmitPriceOfferItem';
import React from 'react';

const textFieldStyle = {
    width: '50%',
}

const ItemCreateModal = React.memo(({ open, onClose, focusInputRef }) => {
    const {
        handleSubmit,
        handleInputChange,
        errors,
        isLoading,
    } = useSubmitPriceOfferItem(onClose);

    const onSubmit = () => {
        handleSubmit();
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
        <DialogTitle>Vytvorenie položky</DialogTitle>
        <Divider />
        <DialogContent>
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <TextField
                margin="dense"
                name="title"
                label="Názov položky"
                variant="outlined"
                sx={textFieldStyle}
                
                inputRef={focusInputRef}

                onChange={handleInputChange}
                error={errors.title}
            />
            <TextField
                margin="dense"
                name="unit"
                label="Jednotka položky"
                variant="outlined"
                sx={textFieldStyle}

                onChange={handleInputChange}
            />
            <TextField
                margin="dense"
                name="price"
                label="Cena položky"
                variant="outlined"
                sx={textFieldStyle}

                type="number"

                onChange={handleInputChange}
                error={errors.price}
            />
        </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose} color="secondary">
            Zatvoriť
          </Button>
          <Button onClick={onSubmit} color="primary">
            Pridať
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}, (prevProps, nextProps) => prevProps.open === nextProps.open);

export default ItemCreateModal;
