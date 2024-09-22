import React from 'react';
import { Box, Typography, Button } from '@mui/material';

const OopsPage = () => {
  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      minHeight="100vh"
      sx={{ backgroundColor: '#f5f5f5', textAlign: 'center' }}
    >
      <Typography variant="h3" gutterBottom>
        Uups!
      </Typography>
      <Typography variant="h6" gutterBottom>
        Niekde nastala chyba.
      </Typography>
      <Button variant="contained" color="primary" href="/">
        Vrátiť sa domov
      </Button>
    </Box>
  );
};

export default OopsPage;
