import React, { useContext } from 'react';
import { Modal, Box, TextField, Button, Typography } from '@mui/material';
import { styled } from '@mui/system';
import useSubmitPriceOffer from '../hooks/useSubmitPriceOffer';
import Loading from './Loading';
import { PriceOfferListContext } from '../providers/PriceOfferListProvider';

const ModalContainer = styled(Box)(({ theme }) => ({
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    minWidth: '50%',
    maxWidth: 600,
    backgroundColor: 'white',
    borderRadius: 25,
    boxShadow: 'white',
    padding: '4',
    outline: 'none',
}));

const Title = styled(Typography)(({ theme }) => ({
    textAlign: 'center',
    color: 'lightblack',
    fontWeight: '600',
    fontSize: 18,
    marginBottom: 10,
    marginTop: 25,
}));

const CreatePriceOfferModal = ({ open, onClose }) => {
    const { addToPriceOfferList } = useContext(PriceOfferListContext);
    const {
        handleSubmit,
        handleInputChange,
        errors,
        isLoading,
    } = useSubmitPriceOffer(onClose, addToPriceOfferList);

    return (
        <Modal
            open={open}
            onClose={onClose}
            aria-labelledby="modal-title"
            aria-describedby="modal-description"
        >
            <ModalContainer>

                <Title id="modal-title" variant="h6">
                    Vytvorenie novej cenovej ponuky
                </Title>
                {isLoading ? (
                    <Loading />
                ) : (
                    <>
                    <div style={{ padding: '20px', width: '80%', justifyContent: 'center', margin: 'auto' }}>
                        <TextField
                            label="Názov"
                            fullWidth
                            margin="normal"
                            variant="outlined"
                            name='title'
                            error={errors.titleError}
                            onChange={handleInputChange}
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

                    <Box mt={2} display="flex" justifyContent="flex-end">
                        <Button onClick={onClose} variant="outlined" color="secondary" sx={{ p: 2, borderRadius: 25, m: 2, mr: -0.5 }}>
                            Zatvoriť
                        </Button>
                        <Button onClick={handleSubmit} variant="contained" color="primary" sx={{ p: 2, borderRadius: 25, m: 2 }}>
                            Vytvoriť
                        </Button>
                    </Box>
                    </>
                )}

            </ModalContainer>
        </Modal>
    );
};

export default CreatePriceOfferModal;
