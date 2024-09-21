import React, { useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  Divider,
} from '@mui/material';
import AddProductButton from './AddProductButton';
import PriceOfferItems from './PriceOfferItems';

const PriceOffer = () => {
  const [priceOffer, setpriceOfferData] = useState({
    invoiceNumber: 'INV-12345',
    date: '2023-09-21',
    customer: {name: 'John Doe', adress: '123 Main St', zip: '12345', city: 'New York'},
    items: [
      { id: 1, title: 'Product 1', quantity: 2, price: 50 },
      { id: 2, title: 'Product 2', quantity: 1, price: 100 },
      { id: 3, title: 'Product 3', quantity: 3, price: 25 },
    ],
  });

  const calculateTotal = () => {
    return priceOffer.items.reduce(
      (total, item) => total + item.quantity * item.price,
      0
    );
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setpriceOfferData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="flex-start"
      padding={4}
      sx={{ backgroundColor: '#f5f5f5', minHeight: '100vh' }}
    >
      <Card sx={{ width: '100%', maxWidth: 800 }}>
        <CardContent>
          <Typography variant="h4" gutterBottom sx={{ marginBottom: 5 }}>
            Cenová ponuka
          </Typography>
          <div style={{ display: 'flex', flexDirection: 'column', width: '50%' }}>
            <TextField
                fullWidth
                variant="outlined"
                label="Meno"
                name="customerName"
                value={priceOffer.customer.name}
                onChange={handleInputChange}
                sx={{ marginBottom: 2 }}
            />
            <TextField
                fullWidth
                variant="outlined"
                label="Adresa"
                name="customerName" 
                value={priceOffer.customer.adress}
                onChange={handleInputChange}
                sx={{ marginBottom: 2 }}
            />
            <TextField
                fullWidth
                variant="outlined"
                label="Mesto/Obec"
                name="customerName" 
                value={priceOffer.customer.city}
                onChange={handleInputChange}
                sx={{ marginBottom: 2 }}
            />
            <TextField
                fullWidth
                variant="outlined"
                label="PSČ"
                name="customerName" 
                value={priceOffer.customer.zip}
                onChange={handleInputChange}
                sx={{ marginBottom: 2 }}
            />
          </div>
          <Divider sx={{ margin: '20px 0' }} />
          <Box>
            <AddProductButton />
            <PriceOfferItems priceOfferItems={priceOffer.items} />
          </Box>
          <Divider sx={{ margin: '20px 0' }} />
          <Typography variant="h5">Spolu: {calculateTotal().toFixed(2)} €</Typography>
        </CardContent>
        <CardContent>
          <Button variant="contained" color="primary" sx={{ marginRight: 1 }}>
            Ukážka
          </Button>
          <Button variant="outlined" color="secondary">
            Stiahnuť PDF
          </Button>
        </CardContent>
      </Card>
    </Box>
  );
};

export default PriceOffer;
