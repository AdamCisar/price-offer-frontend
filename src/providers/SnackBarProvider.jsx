import { createContext, useRef, useState } from 'react';
import CustomSnackbar from '../components/utilities/CustomSnackbar';
import { closeSnackbar, useSnackbar, SnackbarProvider as SnackBarProviderNotiStack } from 'notistack';
import CloseIcon from '@mui/icons-material/Close';
import { IconButton } from '@mui/material';

export const SnackBarContext = createContext(null);

export const SnackBarProvider = ({ children }) => {
  const { enqueueSnackbar } = useSnackbar();
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const snackbarMessage = useRef('');
    const snackbarSeverity = useRef('');

    const handleSnackbarOpen = (message, severityType, duration = 2500) => {
      snackbarMessage.current = message;
      snackbarSeverity.current = severityType;

      enqueueSnackbar(message, { 
        variant: severityType,
        autoHideDuration: duration,
        action: (key) => (
          <IconButton
            onClick={() => closeSnackbar(key)}
            size="small"
            sx={{
              color: '#ffffff',
              backgroundColor: 'rgba(0,0,0,0.2)',
              ml: 1,
              '&:hover': {
                backgroundColor: 'rgba(0,0,0,0.4)',
                transform: 'rotate(90deg) scale(1.05)',
              },
              transition: 'all 0.3s ease',
            }}
          >
            <CloseIcon sx={{ fontSize: 14 }} />
          </IconButton>
        ),
      });
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
    <SnackBarProviderNotiStack maxSnack={3} autoHideDuration={2500} anchorOrigin={{ vertical: 'top', horizontal: 'right' }}>
      <SnackBarProvider>{children}</SnackBarProvider>
    </SnackBarProviderNotiStack>
  );
};