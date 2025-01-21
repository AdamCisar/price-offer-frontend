import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
} from "@mui/material";

const ConfirmDialog = ({ open, onClose, onConfirm, title, message, cancelButtonText, confirmButtonText }) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{title || "Odstránenie položiek"}</DialogTitle>
      <DialogContent>
        <DialogContentText>{message || "Naozaj chcete vymazať označené položky?"}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          {cancelButtonText || "Zatvoriť"}
        </Button>
        <Button onClick={onConfirm} color="secondary" autoFocus>
          {confirmButtonText || "Potvrdiť"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmDialog;