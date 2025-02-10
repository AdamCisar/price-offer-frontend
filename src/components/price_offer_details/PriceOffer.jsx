import React, { useCallback, useContext, useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  Divider,
  Switch,
  FormControlLabel,
} from '@mui/material';
import PriceOfferItems from './PriceOfferItems';
import useUpdatePriceOfferDetails from '../../hooks/useUpdatePriceOfferDetails';
import { PriceOfferContext } from '../../providers/price_offer_providers/PriceOfferProvider';
import { UserInfoContext } from '../../providers/UserInfoProvider';
import Loading from '../utilities/Loading';
import usePriceOfferCalculation from '../../hooks/usePriceOfferCalculation';
import BulkPriceEditModal from './BulkPriceEditModal';
import AppButtonModal from '../utilities/AppButtonModal';
import ItemSearchModal from './ItemSearchModal';
import ItemCreateModal from './ItemCreateModal';
import PdfPreviewer from '../price_offer_pdf/PdfPreviewer';
import PdfDownloadLink from '../price_offer_pdf/PdfDownloadLink';
import UserInfo from './UserInfo';
import CustomerInfo from './CustomerInfo';

const boxStyles = {
      display: "flex",
      justifyContent: "center",
      alignItems: "flex-start",
      padding: 4,
      sx: { backgroundColor: '#f5f5f5', minHeight: '100vh' }
}

const PriceOffer = () => {
  const {
        handleCustomerInputChange, 
        handleDeleteSelectedPriceOfferItems
      } = useUpdatePriceOfferDetails();

  const { handleEditSelectedPriceOfferItemsPrices, calculateTotalPriceForItem } = usePriceOfferCalculation();

  const { priceOfferDetails, isLoading, error, setPriceOfferDetails } = useContext(PriceOfferContext);
  const { userInfo } = useContext(UserInfoContext);

  const [isRowSelected, setRowSelected] = useState(false);
  const [selectedItems, setSelectedItems] = useState([]);

  const toggleSelectedRowButton = useCallback((ids) => {
    setRowSelected(ids.length > 0);
  }, []);

  if (isLoading) {
    return <Loading />
  }

  if (error) {
    return <Typography color="error">Error loading price offer details.</Typography>
  }

  return (
    <Box
      {...boxStyles}
    >
    {priceOfferDetails && userInfo &&
        <Card sx={{ width: '100%', maxWidth: 1000 }}>
          <CardContent>
            <Typography variant="h4" gutterBottom sx={{ marginBottom: 5 }}>
              Cenová ponuka
            </Typography>
            <Box display="flex" flexDirection="row" justifyContent="space-between">
              <div style={{ display: 'flex', flexDirection: 'column', width: '40%' }}>
                <CustomerInfo customerInfo={priceOfferDetails.customer} setPriceOfferDetails={setPriceOfferDetails} handleCustomerInputChange={handleCustomerInputChange} />
              </div>
              <Divider orientation="vertical" flexItem sx={{ margin: '0 20px' }} />
                <div style={{ width: '40%' }}>
                  <UserInfo userInfo={userInfo} />
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
                <FormControlLabel
                  control={<Switch
                    checked={priceOfferDetails.is_vat}
                    onChange={() => setPriceOfferDetails({ ...priceOfferDetails, is_vat: !priceOfferDetails.is_vat })}
                    color="primary"
                    />}
                    label={'Použiť DPH'}
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
              isVat={priceOfferDetails.is_vat}
            />
            <Divider sx={{ margin: '20px 0' }} />
            {
              priceOfferDetails.is_vat &&
              <div>
                <Box display="flex" justifyContent="space-between">
                  <Typography variant="body1">Základ DPH:</Typography>
                  <Typography variant="body1">{priceOfferDetails.vatBase} €</Typography>
                </Box>
                <Box display="flex" justifyContent="space-between">
                  <Typography variant="body1">DPH:</Typography>
                  <Typography variant="body1">{priceOfferDetails.vat} €</Typography>
                </Box>
              </div>
            }
            <Box display="flex" justifyContent="space-between">
            <Typography variant="h5">Celkom:</Typography>
              <Typography variant="h5">{priceOfferDetails.is_vat ? priceOfferDetails.total : priceOfferDetails.vatBase} €</Typography>
            </Box>
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
              <PdfDownloadLink priceOfferDetails={priceOfferDetails} userInfo={userInfo} />
              </Box>
            </Box>
          </CardContent>
        </Card>
    }
    </Box>
  );
};

export default PriceOffer;
