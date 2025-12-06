import { Dialog, DialogActions, DialogTitle, Button } from '@mui/material';

const RefreshPriceModal = ({ open, onClose, refreshing, activatedButtonCallback, error }) => {
    const onSubmit = async () => {
        !refreshing && activatedButtonCallback();
        onClose();
    };

    return (
        <div>
        <Dialog open={open} onClose={onClose}
                PaperProps={{
                    style: { width: 600 }
                }} 

                onKeyUp={(e) => {
                    if (e.key === 'Enter') {
                        onSubmit();
                    }
                }}
            >
            <DialogTitle style={{ margin: '0 auto'}}>Skutočne chcete importovať ceny z obchodu Ptaček?</DialogTitle>
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

export default RefreshPriceModal;
