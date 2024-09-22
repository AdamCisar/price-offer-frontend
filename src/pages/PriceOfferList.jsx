import React from 'react';
import PriceOfferCards from '../components/PriceOfferCards';
import {
    Box,
  } from '@mui/material';
const PriceOfferList = () => {

    return (
        <Box
        display="flex"
        justifyContent="center"
        alignItems="flex-start"
        sx={{ backgroundColor: '#f5f5f5', minHeight: '100vh' }}
      >
        <PriceOfferCards />
      </Box>
    );
};

export default PriceOfferList;