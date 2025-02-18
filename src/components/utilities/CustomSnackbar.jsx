import { Slide, Snackbar } from "@mui/material";
import MuiAlert from "@mui/material/Alert";

const CustomSnackbar = ({snackbarOpen, handleSnackbarClose, snackbarMessage, severity, duration}) => {
    const Transition = (props) => <Slide {...props} direction="down" />;
    return (
        <Snackbar 
            open={snackbarOpen} 
            TransitionComponent={Transition}
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