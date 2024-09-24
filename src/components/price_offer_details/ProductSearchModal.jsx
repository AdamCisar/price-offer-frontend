import { Dialog, DialogActions, DialogContent, DialogTitle, TextField, Button } from '@mui/material';

const ProductSearchModal = ({ open, onClose, focusInputRef }) => {

    const onSubmit = () => {
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
        <DialogTitle>Vyhľadať produkt</DialogTitle>
        <DialogContent>
        <TextField
            margin="dense"
            name="search"
            fullWidth
            placeholder="Začnite písať..."
            variant="outlined"
            inputRef={focusInputRef}
        />
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
};

export default ProductSearchModal;
