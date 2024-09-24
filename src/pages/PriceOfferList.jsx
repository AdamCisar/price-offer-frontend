import React from 'react';
import PriceOfferCards from '../components/price_offer_cards/PriceOfferCards';
import {
    Box,
  } from '@mui/material';
const PriceOfferList = () => {

    return (
        <Box
        display="flex"
        justifyContent="center"
        alignItems="flex-start"
        sx={{ backgroundColor: '#f5f5f5', minHeight: '100vh', width: '100%' }}
      >
        <PriceOfferCards />
      </Box>
    );
};

export default PriceOfferList;