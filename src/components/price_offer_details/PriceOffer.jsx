import React, { useContext, useRef, useState } from 'react';
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
import usePriceOfferCalculation from '../../hooks/usePriceOfferCalculation';
import BulkPriceEditModal from './BulkPriceEditModal';
import { SnackBarContext } from '../../providers/SnackBarProvider';

const PriceOffer = () => {
  const {
        handleSavePriceOfferDetails, 
        handleCustomerInputChange, 
        handleDeleteSelectedPriceOfferItems
      } = useUpdatePriceOfferDetails();

  const { calculateTotal, handleEditSelectedPriceOfferItemsPrices, calculateTotalPriceForItem } = usePriceOfferCalculation();

  const { priceOfferDetails, isLoading, error, setPriceOfferDetails } = useContext(PriceOfferContext);
  const { userInfo, setUserInfo } = useContext(UserInfoContext);
  const { handleSnackbarOpen } = useContext(SnackBarContext);

  const [isRowSelected, setRowSelected] = useState(false);
  const [selectedItems, setSelectedItems] = useState([]);

  const toggleDeleteButton = (ids) => {
    if (ids.length > 0) {
      setRowSelected(true);
    } else {
      setRowSelected(false);
    }
  };

  const [bulkPriceEditModal, setBulkPriceEditModal] = useState(false);

  const openBulkPriceEditModal = () => {
    setBulkPriceEditModal(true);
  };

  const closeBulkPriceEditModal = () => {
    setBulkPriceEditModal(false);
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
                    value={priceOfferDetails.customer?.name || ''}
                    onChange={handleCustomerInputChange}
                    sx={{ marginBottom: 2 }}
                />
                <TextField
                    fullWidth
                    variant="outlined"
                    label="Mesto/Obec"
                    name="city" 
                    value={priceOfferDetails.customer?.city || ''}
                    onChange={handleCustomerInputChange}
                    sx={{ marginBottom: 2 }}
                />
                <TextField
                    fullWidth
                    variant="outlined"
                    label="Adresa"
                    name="adress" 
                    value={priceOfferDetails.customer?.adress || ''}
                    onChange={handleCustomerInputChange}
                    sx={{ marginBottom: 2 }}
                />
                <TextField
                    fullWidth
                    variant="outlined"
                    label="PSČ"
                    name="zip" 
                    value={priceOfferDetails.customer?.zip || ''}
                    onChange={handleCustomerInputChange}
                    sx={{ marginBottom: 2 }}
                />
              </div>
              <Divider orientation="vertical" flexItem sx={{ margin: '0 20px' }} />
                <div style={{ width: '40%' }}>
                  <Typography variant="h6" sx={{ display: 'flex' ,justifyContent: 'center' }}>{userInfo?.name}</Typography>
                  <Typography variant="h6" sx={{ display: 'flex' ,justifyContent: 'center' }}>{userInfo?.city}</Typography>
                  <Typography variant="h6" sx={{ display: 'flex' ,justifyContent: 'center' }}>{userInfo?.adress}</Typography>
                  <Typography variant="h6" sx={{ display: 'flex' ,justifyContent: 'center' }}>{userInfo?.zip}</Typography>
                </div>
            </Box>
            <Divider sx={{ margin: '20px 0' }} />
            <Box display="flex" flexDirection="row" alignItems="center" gap={1} style={{ marginBottom: 5 }}>
              <AddItemToPriceOfferButton />
              {isRowSelected && 
              <>
              <Button variant="contained" color="secondary" onClick={openBulkPriceEditModal} >Upraviť hromadne ceny</ Button>
              <BulkPriceEditModal open={bulkPriceEditModal} onClose={closeBulkPriceEditModal} handleEditSelectedPriceOfferItemsPrices={handleEditSelectedPriceOfferItemsPrices} selectedItems={selectedItems} />
              <Button variant="contained" color="error" onClick={() => handleDeleteSelectedPriceOfferItems(selectedItems)} >Vymazať</ Button>
              </>
              }
            </Box>
            <PriceOfferItems 
              priceOfferItems={priceOfferDetails.items} 
              toggleDeleteButton={toggleDeleteButton} 
              setSelectedItems={setSelectedItems}
              setPriceOfferDetails={setPriceOfferDetails}
              calculateTotalPriceForItem={calculateTotalPriceForItem}
            />
            <Divider sx={{ margin: '20px 0' }} />
            <Typography variant="h5">Spolu: {calculateTotal(priceOfferDetails)?.toFixed(2)} €</Typography>
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
              <Button variant="contained" color="primary" onClick={() => handleSavePriceOfferDetails(handleSnackbarOpen)}>
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
