import React, { useContext } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button, Typography } from '@mui/material';
import { styled } from '@mui/system';
import useSubmitPriceOffer from '../../hooks/useSubmitPriceOffer';
import { PriceOfferListContext } from '../../providers/PriceOfferListProvider';

const Title = styled(Typography)(({ theme }) => ({
    textAlign: 'center',
    color: 'lightblack',
    fontWeight: '600',
    fontSize: 18,
    marginBottom: 10,
    marginTop: 25,
}));

const CreatePriceOfferModal = ({ open, onClose, focusInputRef, modalTitle, submitButtonText, duplicateFromId }) => {
    const { addToPriceOfferList } = useContext(PriceOfferListContext);
    const {
        handleSubmit,
        handleInputChange,
        errors,
        isLoading,
    } = useSubmitPriceOffer(onClose, addToPriceOfferList, duplicateFromId);

    return (
        <Dialog aria-labelledby="dialog-title" aria-describedby="dialog-description"
            open={open} 
            onClose={onClose} 
            onKeyUp={(e) => {
                if (e.key === 'Enter') {
                    handleSubmit();
                }
            }}
        >
            <DialogTitle id="dialog-title">
                {modalTitle || 'Vytvorenie novej cenovej ponuky'}
            </DialogTitle>
            <DialogContent>
                <div style={{ width: '80%', justifyContent: 'center', margin: 'auto' }}>
                    <TextField
                        label="Názov"
                        fullWidth
                        margin="normal"
                        variant="outlined"
                        name='title'
                        error={errors.title}
                        onChange={handleInputChange}
                        inputRef={focusInputRef}
                    />
               
                    <TextField
                        label="Popis"
                        fullWidth
                        margin="normal"
                        variant="outlined"
                        name='description'
                        error={errors.description}
                        onChange={handleInputChange}
                    />
                </div>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} color="secondary">
                    Zatvoriť
                </Button>
                <Button onClick={handleSubmit} color="primary">
                    {submitButtonText || 'Vytvoriť'}
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default CreatePriceOfferModal;
