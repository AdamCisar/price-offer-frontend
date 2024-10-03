import React, { useContext, useState } from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, TextField, Button, Divider, Box } from '@mui/material';
import { useUniversalPost } from '../../api/UniversalPost';
import { SnackBarContext } from '../../providers/SnackBarProvider';
import Loading from '../utilities/Loading';
import useValidate from '../../hooks/useValidate';

const textFieldStyle = {
    width: '50%',
}

const ItemEditModal = ({ open, onClose, focusInputRef, item, setItems }) => {
    const [itemEdit, setItemEdit] = useState(item);
    const [sendData, isLoading, error] = useUniversalPost("ITEM");
    const { handleSnackbarOpen } = useContext(SnackBarContext);
    const {validate, handleInputChange, errors} = useValidate(setItemEdit, itemEdit);

    const onSubmit = async () => {
        try {
            await sendData(itemEdit);
            setItems((prevData) => 
                prevData.map((prevItem) =>
                    prevItem.id === itemEdit.id ? itemEdit : prevItem
                )
            );
            handleSnackbarOpen('Produkt bol uložený!', 'success');
        } catch (err) {
            console.log(err);
            handleSnackbarOpen('Produkt sa neuložil!', 'error');
        }
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
            <DialogTitle>Úprava produktu</DialogTitle>
            <Divider />
            {isLoading ? (
                <Loading height={'10vh'} />
            ) : (
            <DialogContent>
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                <TextField
                    margin="dense"
                    name="title"
                    label="Názov položky"
                    variant="outlined"
                    sx={textFieldStyle}
                    value={itemEdit.title}
                    inputRef={focusInputRef}
                    onChange={handleInputChange}

                />
                <TextField
                    margin="dense"
                    name="unit"
                    label="Jednotka položky"
                    variant="outlined"
                    sx={textFieldStyle}
                    value={itemEdit.unit}
                    onChange={handleInputChange}

                />
                <TextField
                    margin="dense"
                    name="price"
                    label="Cena položky"
                    variant="outlined"
                    sx={textFieldStyle}
                    value={itemEdit.price}
                    type="number"
                    onChange={handleInputChange}

                />
                {itemEdit.url?.map((url, index) => (
                    <TextField
                        sx={{marginTop: 1}}
                        key={index}
                        label={(url.shop).toUpperCase()}
                        variant="outlined"
                        fullWidth
                        value={ url.url || ''}
                        onChange={(e) => {
                            const newUrls = [...itemEdit.url];
                            newUrls[index].url = e.target.value;
                            setItemEdit({ ...itemEdit, url: newUrls });
                        }}
                    />
                ))}
            </Box>
            </DialogContent>
            )}
            <DialogActions>
            <Button onClick={onClose} color="secondary">
                Zatvoriť
            </Button>
            <Button 
                onClick={onSubmit}  
                color="primary" >
                Uložiť
            </Button>
            </DialogActions>
        </Dialog>
        </div>
    );
};

export default ItemEditModal;
