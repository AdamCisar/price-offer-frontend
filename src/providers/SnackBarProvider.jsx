import { createContext, useRef, useState } from 'react';
import CustomSnackbar from '../components/utilities/CustomSnackbar';


export const SnackBarContext = createContext(null);

/**
 * 
 * @param {Object} props
 * @param {JSX.Element} props.children 
 * @returns {JSX.Element}
 */
export const SnackBarProvider = ({ children }) => {
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const snackbarMessage = useRef('');
    const snackbarSeverity = useRef('');
  
    const handleSnackbarOpen = (message, severityType) => {
      snackbarMessage.current = message;
      snackbarSeverity.current = severityType;
      setSnackbarOpen(true);
    };
  
    const handleSnackbarClose = (event, reason) => {
      if (reason === 'clickaway') {
        return;
      }
      setSnackbarOpen(false);
    };

    return (
        <SnackBarContext.Provider value={{ handleSnackbarOpen }}>
            {children}
            <CustomSnackbar 
                snackbarOpen={snackbarOpen} 
                handleSnackbarClose={handleSnackbarClose} 
                snackbarMessage={snackbarMessage.current} 
                severity={snackbarSeverity.current} 
                duration={2000} 
            />
        </SnackBarContext.Provider>
    );
};
