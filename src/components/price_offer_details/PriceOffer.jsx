import React, { useContext, useEffect, useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  Divider,
} from '@mui/material';
import AddItemToPriceOfferButton from './AddItemToPriceOfferButton';
import PriceOfferItems from './PriceOfferItems';
import useUpdatePriceOfferDetails from '../../hooks/useUpdatePriceOfferDetails';
import { PriceOfferContext } from '../../providers/price_offer_providers/PriceOfferProvider';
import { UserInfoContext } from '../../providers/UserInfoProvider';
import Loading from '../Loading';

const PriceOffer = () => {
  const {
        handleSavePriceOfferDetails, 
        handleCustomerInputChange, 
        handleItemsInputChange, 
        handleDeleteSelectedPriceOfferItems
      } = useUpdatePriceOfferDetails();

  const { priceOfferDetails, isLoading, error } = useContext(PriceOfferContext);
  const { userInfo, setUserInfo } = useContext(UserInfoContext);
  const [showDeleteButton, setShowDeleteButton] = useState(false);
  const [selectedItems, setSelectedItems] = useState([]);

  const toggleDeleteButton = (ids) => {
    if (ids.length > 0) {
      setShowDeleteButton(true);
    } else {
      setShowDeleteButton(false);
    }
  };


  const calculateTotal = () => {
    return priceOfferDetails.items?.reduce(
      (total, item) => total + item.quantity * item.price,
      0
    );
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="flex-start"
      padding={4}
      sx={{ backgroundColor: '#f5f5f5', minHeight: '100vh' }}
    >
      {isLoading ? <Loading /> : ( priceOfferDetails &&
        <Card sx={{ width: '100%', maxWidth: 1000 }}>
          <CardContent>
            <Typography variant="h4" gutterBottom sx={{ marginBottom: 5 }}>
              Cenová ponuka
            </Typography>
            <Box display="flex" flexDirection="row" justifyContent="space-between">
              <div style={{ display: 'flex', flexDirection: 'column', width: '40%' }}>
                <TextField
                    fullWidth
                    variant="outlined"
                    label="Meno"
                    name="name"
                    value={priceOfferDetails.customer?.name}
                    onChange={handleCustomerInputChange}
                    sx={{ marginBottom: 2 }}
                />
                <TextField
                    fullWidth
                    variant="outlined"
                    label="Adresa"
                    name="adress" 
                    value={priceOfferDetails.customer?.adress}
                    onChange={handleCustomerInputChange}
                    sx={{ marginBottom: 2 }}
                />
                <TextField
                    fullWidth
                    variant="outlined"
                    label="Mesto/Obec"
                    name="city" 
                    value={priceOfferDetails.customer?.city}
                    onChange={handleCustomerInputChange}
                    sx={{ marginBottom: 2 }}
                />
                <TextField
                    fullWidth
                    variant="outlined"
                    label="PSČ"
                    name="zip" 
                    value={priceOfferDetails.customer?.zip}
                    onChange={handleCustomerInputChange}
                    sx={{ marginBottom: 2 }}
                />
              </div>
              <Divider orientation="vertical" flexItem sx={{ margin: '0 20px' }} />
                <div style={{ width: '40%' }}>
                  {/* You can add any additional info you want on the right side here */}
                  <Typography variant="h6">{userInfo?.name}</Typography>
                  {/* For example, another TextField or just plain text */}
                </div>
            </Box>
            <Divider sx={{ margin: '20px 0' }} />
            <Box display="flex" flexDirection="row" alignItems="center" gap={1} style={{ marginBottom: 5 }}>
              <AddItemToPriceOfferButton />
              {showDeleteButton && <Button variant="contained" color="error" onClick={() => handleDeleteSelectedPriceOfferItems(selectedItems)} >Vymazať</Button>}
            </Box>
            <PriceOfferItems 
              priceOfferItems={priceOfferDetails.items} 
              handleItemsInputChange={handleItemsInputChange} 
              toggleDeleteButton={toggleDeleteButton} 
              setSelectedItems={setSelectedItems}
            />
            <Divider sx={{ margin: '20px 0' }} />
            <Typography variant="h5">Spolu: {calculateTotal()?.toFixed(2)} €</Typography>
          </CardContent>
          <CardContent>
            <Box display="flex" justifyContent="space-between" alignItems="center">
              <Box>
                <Button variant="outlined" color="primary" sx={{ marginRight: 1 }}>
                  Ukážka
                </Button>
                <Button variant="outlined" color="secondary">
                  Stiahnuť PDF
                </Button>
              </Box>
              <Button variant="contained" color="primary" onClick={handleSavePriceOfferDetails}>
                Uložiť
              </Button>
            </Box>
          </CardContent>
        </Card>
      )}
    </Box>
  );
};

export default PriceOffer;
