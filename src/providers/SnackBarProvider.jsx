import { createContext, useRef, useState } from 'react';
import CustomSnackbar from '../components/utilities/CustomSnackbar';
import { useSnackbar, SnackbarProvider as SnackBarProviderNotiStack } from 'notistack';

export const SnackBarContext = createContext(null);

/**
 * 
 * @param {Object} props
 * @param {JSX.Element} props.children 
 * @returns {JSX.Element}
 */
export const SnackBarProvider = ({ children }) => {
  const { enqueueSnackbar } = useSnackbar();
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const snackbarMessage = useRef('');
    const snackbarSeverity = useRef('');

    const handleSnackbarOpen = (message, severityType) => {
      snackbarMessage.current = message;
      snackbarSeverity.current = severityType;
      // setSnackbarOpen(true);

      enqueueSnackbar(message, { variant: severityType });
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

export const SnackBarWrapper = ({ children }) => {
  return (
    <SnackBarProviderNotiStack maxSnack={3} autoHideDuration={2000}>
      <SnackBarProvider>{children}</SnackBarProvider>
    </SnackBarProviderNotiStack>
  );
};