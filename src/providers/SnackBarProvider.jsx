import React, { createContext, useRef, useState } from 'react';
import CustomSnackbar from '../components/CustomSnackbar';

export const SnackBarContext = createContext();

export const SnackBarProvider = ({ children }) => {
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const snackbarMessage = useRef('');
    const snackbarSeverity = useRef('');
  
    /**
     * 
     * @param {string} message Co sa ma zobrazit
     * @param {string} severityType akej farby ma by sprava|typ (success|error|warning|info)
     */
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
                duration={3000} 
            />
        </SnackBarContext.Provider>
    );
};
