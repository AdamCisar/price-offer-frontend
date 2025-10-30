import { Dialog, DialogActions, DialogContent, DialogTitle, TextField, Button, Divider, Box, Checkbox, FormControlLabel } from '@mui/material';
import { useState } from 'react';

const RefreshPriceLoginModal = ({ open, onClose, refreshing, activatedButtonCallback, error }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [withVat, setWithVat] = useState(false);

    const onSubmit = async () => {
        !refreshing && activatedButtonCallback({ email, password, withVat });
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
            <DialogTitle>IMPORT CIEN Z PTACEK</DialogTitle>
            <Divider />
            <DialogContent>
                <TextField
                    margin="dense"
                    label="E-mailová adresa"
                    name="email"
                    type="email"
                    fullWidth
                    onChange={(e) => setEmail(e.target.value)}
                />
                <TextField
                    margin="dense"
                    label="Heslo"
                    name="password"
                    fullWidth
                    type="password"
                    onChange={(e) => setPassword(e.target.value)}
                />
                <FormControlLabel
                    style={{ marginTop: 10 }}
                    control={
                        <Checkbox 
                        name="withVat" 
                        checked={withVat} 
                        onChange={(e) => setWithVat(e.target.checked)}
                        />
                    }
                    label="s DPH"
                />
            </DialogContent>
            <DialogActions>
            <Button onClick={onClose} color="secondary">
                Zatvoriť
            </Button>
            <Button 
                onClick={onSubmit}  
                color="primary" >
                IMPORTOVAŤ
            </Button>
            </DialogActions>
        </Dialog>
        </div>
    );
};

export default RefreshPriceLoginModal;
