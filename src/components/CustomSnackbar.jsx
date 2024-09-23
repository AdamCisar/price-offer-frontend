import { Snackbar } from "@mui/material";
import MuiAlert from "@mui/material/Alert";

const CustomSnackbar = ({snackbarOpen, handleSnackbarClose, snackbarMessage, severity, duration}) => {
    return (
        <Snackbar 
            open={snackbarOpen} 
            autoHideDuration={duration} 
            onClose={handleSnackbarClose}
            anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        >
            <MuiAlert severity={severity} sx={{ width: '100%' }}>
                {snackbarMessage}
            </MuiAlert>
        </Snackbar>
    );
}

export default CustomSnackbar