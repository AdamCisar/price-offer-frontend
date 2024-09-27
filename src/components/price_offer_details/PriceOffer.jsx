import React, { useContext, useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  Divider,
} from '@mui/material';
import PriceOfferItems from './PriceOfferItems';
import useUpdatePriceOfferDetails from '../../hooks/useUpdatePriceOfferDetails';
import { PriceOfferContext } from '../../providers/price_offer_providers/PriceOfferProvider';
import { UserInfoContext } from '../../providers/UserInfoProvider';
import Loading from '../utilities/Loading';
import usePriceOfferCalculation from '../../hooks/usePriceOfferCalculation';
import BulkPriceEditModal from './BulkPriceEditModal';
import { SnackBarContext } from '../../providers/SnackBarProvider';
import AppButtonModal from '../utilities/AppButtonModal';
import ItemSearchModal from './ItemSearchModal';
import ItemCreateModal from './ItemCreateModal';
import PdfPreviewer from '../price_offer_pdf/PdfPreviewer';
import { PDFDownloadLink } from '@react-pdf/renderer';
import PdfDocument from '../price_offer_pdf/PdfDocument';

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

  const toggleSelectedRowButton = (ids) => {
    if (ids.length > 0) {
      setRowSelected(true);
    } else {
      setRowSelected(false);
    }
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="flex-start"
      padding={4}
      sx={{ backgroundColor: '#f5f5f5', minHeight: '100vh' }}
    >
      {isLoading ? <Loading /> : ( priceOfferDetails && userInfo &&
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
                    name="address" 
                    value={priceOfferDetails.customer?.address || ''}
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
                  <Typography variant="h6" sx={{ display: 'flex' ,justifyContent: 'center' }}>{userInfo?.address}</Typography>
                  <Typography variant="h6" sx={{ display: 'flex' ,justifyContent: 'center' }}>{userInfo?.zip}</Typography>
                </div>
            </Box>
            <Divider sx={{ margin: '20px 0' }} />
            <Box display="flex" justifyContent={'space-between'} gap={1} style={{ marginBottom: 5 }}>
              <Box display="flex" gap={1}>
                <AppButtonModal 
                  styles={{ variant: 'contained', color: '' }}
                  title={"Pridať položku"} 
                  Button={Button}
                  ModalComponent={ItemSearchModal}
                />
                <AppButtonModal 
                  styles={{ variant: 'contained', color: '' }}
                  title={"Vytvoriť položku"} 
                  Button={Button}
                  ModalComponent={ItemCreateModal}
                />
              </Box>
              {isRowSelected && 
              <Box display="flex" gap={1}>
                <AppButtonModal
                  styles={{ variant: 'contained', color: 'secondary' }}
                  title={"Upraviť hromadne ceny"} 
                  Button={Button}
                  ModalComponent={BulkPriceEditModal}
                  handleEditSelectedPriceOfferItemsPrices={handleEditSelectedPriceOfferItemsPrices} 
                  selectedItems={selectedItems}
                />
                <Button variant="contained" color="error" onClick={() => handleDeleteSelectedPriceOfferItems(selectedItems)} >Vymazať</ Button>
              </Box>
              }
            </Box>
            <PriceOfferItems 
              priceOfferItems={priceOfferDetails.items} 
              toggleSelectedRowButton={toggleSelectedRowButton} 
              setSelectedItems={setSelectedItems}
              setPriceOfferDetails={setPriceOfferDetails}
              calculateTotalPriceForItem={calculateTotalPriceForItem}
              calculateTotal={calculateTotal}
            />
            <Divider sx={{ margin: '20px 0' }} />
            <Typography variant="h5">Spolu: {priceOfferDetails.total} €</Typography>
          </CardContent>
          <CardContent>
            <Box display="flex" justifyContent="space-between" alignItems="center">
              <Box display="flex">
                <AppButtonModal
                  styles={{ variant:"outlined", color:"primary" }}
                  sx={{ marginRight: 1 }}
                  title={"Ukážka"} 
                  Button={Button}
                  ModalComponent={PdfPreviewer}
                  priceOfferDetails={priceOfferDetails}
                  userInfo={userInfo}
                />
                {priceOfferDetails && priceOfferDetails.items && (
                  <PDFDownloadLink
                    document={
                          <PdfDocument 
                          priceOfferDetails={priceOfferDetails} 
                          userInfo={userInfo} />} 
                          fileName={"cenova_ponuka_"+ priceOfferDetails.customer.name + ".pdf"}> 
                       {({ blob, url, loading, error }) => (
                          <Button
                              variant="outlined"
                              color="secondary"
                              disabled={loading}
                              style={{ width: '100%' }} 
                          >
                              {'Stiahnuť PDF'}
                          </Button>
                      )}
                  </PDFDownloadLink>
                )}
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
