import React, { useContext } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button, Typography } from '@mui/material';
import { styled } from '@mui/system';
import useSubmitPriceOffer from '../hooks/useSubmitPriceOffer';
import Loading from './Loading';
import { PriceOfferListContext } from '../providers/PriceOfferListProvider';

const Title = styled(Typography)(({ theme }) => ({
    textAlign: 'center',
    color: 'lightblack',
    fontWeight: '600',
    fontSize: 18,
    marginBottom: 10,
    marginTop: 25,
}));

const CreatePriceOfferModal = ({ open, onClose, inputTitleRef }) => {
    const { addToPriceOfferList } = useContext(PriceOfferListContext);
    const {
        handleSubmit,
        handleInputChange,
        errors,
        isLoading,
    } = useSubmitPriceOffer(onClose, addToPriceOfferList);

    return (
        <Dialog open={open} onClose={onClose} aria-labelledby="dialog-title" aria-describedby="dialog-description">
            <DialogTitle id="dialog-title">
                Vytvorenie novej cenovej ponuky
            </DialogTitle>
            <DialogContent>
                <div style={{ width: '80%', justifyContent: 'center', margin: 'auto' }}>
                    <TextField
                        label="Názov"
                        fullWidth
                        margin="normal"
                        variant="outlined"
                        name='title'
                        error={errors.titleError}
                        onChange={handleInputChange}
                        inputRef={inputTitleRef}
                    />
                    <TextField
                        label="Popis"
                        fullWidth
                        margin="normal"
                        variant="outlined"
                        name='description'
                        error={errors.descriptionError}
                        onChange={handleInputChange}
                    />
                </div>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} color="secondary">
                    Zatvoriť
                </Button>
                <Button onClick={handleSubmit} color="primary">
                    Vytvoriť
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default CreatePriceOfferModal;
