import React, { useContext } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button } from '@mui/material';
import useSubmitPriceOffer from '../../hooks/useSubmitPriceOffer';
import { PriceOfferListContext } from '../../providers/PriceOfferListProvider';

const PriceOfferModal = ({ open, onClose, focusInputRef, modalTitle, submitButtonText, duplicateFromId, priceOfferValues }) => {
    const { setPriceOfferList } = useContext(PriceOfferListContext);
    const {
        handleSubmit,
        handleInputChange,
        errors,
        isLoading,
    } = useSubmitPriceOffer(onClose, setPriceOfferList, duplicateFromId, priceOfferValues?.id);

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
                        placeholder={priceOfferValues?.title || ''}
                    />
               
                    <TextField
                        label="Popis"
                        fullWidth
                        margin="normal"
                        variant="outlined"
                        name='description'
                        error={errors.description}
                        onChange={handleInputChange}
                        placeholder={priceOfferValues?.description || ''}
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

export default PriceOfferModal;
