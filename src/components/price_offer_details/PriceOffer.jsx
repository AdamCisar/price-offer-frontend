import React, { useCallback, useContext, useMemo, useRef, useState } from 'react';
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
import UploadFileIcon from '@mui/icons-material/UploadFile';
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
import PriceOfferNotes from './PriceOfferNotes';
import RefreshButton from '../utilities/RefreshButton';
import ProgressDivider from '../utilities/ProgressDivider';
import useUpdatePriceOfferItemPrices from '../../hooks/useUpdatePriceOfferItemPrices';
import RefreshPriceModal from './RefreshPriceModal';
import ExcelImportModal from './ExcelImportModal';
import * as XLSX from 'xlsx';

const boxStyles = {
      display: "flex",
      justifyContent: "center",
      alignItems: "flex-start",
      padding: 4,
      sx: { backgroundColor: '#f5f5f5', minHeight: '100vh' }
}

const PriceOffer = () => {
  const { priceOfferDetails, isLoading, isFetching, error, setPriceOfferDetails } = useContext(PriceOfferContext);
  const { userInfo } = useContext(UserInfoContext);
  
  const itemIds = useMemo(
    () => priceOfferDetails.items?.map(item => item.item_id) ?? [],
    [priceOfferDetails.items]
  );

  const priceOfferId = useMemo(
      () => priceOfferDetails.id ?? null,
    [priceOfferDetails]
  );

  const {
        handleDeleteSelectedPriceOfferItems
      } = useUpdatePriceOfferDetails();

  const { handleEditSelectedPriceOfferItemsPrices, calculateTotalPriceForItem } = usePriceOfferCalculation();
  const { updatingItemPrices, updateItemPrices, broadcastData, broadcastError } = useUpdatePriceOfferItemPrices(priceOfferId);

  const [isRowSelected, setRowSelected] = useState(false);
  const [selectedItems, setSelectedItems] = useState([]);

  const fileInputRef = useRef(null);
  const [excelRows, setExcelRows] = useState(null);
  const [importModalOpen, setImportModalOpen] = useState(false);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (evt) => {
      const workbook = XLSX.read(evt.target.result, { type: 'binary' });
      const sheet = workbook.Sheets[workbook.SheetNames[0]];
      const rows = XLSX.utils.sheet_to_json(sheet, { header: 1 });
      setExcelRows(rows);
      setImportModalOpen(true);
    };
    reader.readAsBinaryString(file);
    e.target.value = '';
  };

  const handleUpdatePrices = useCallback((data) => {
    updateItemPrices({
      item_ids: itemIds, 
      price_offer_id: priceOfferId,
      ...data
    });
  }, [itemIds, priceOfferId, updateItemPrices]);

  const toggleSelectedRowButton = useCallback((ids) => {
    setRowSelected(ids.length > 0);
  }, []);

  if (isLoading || isFetching) {
    return <Loading />
  }

  if (error) {
    return (
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        minHeight="100vh"
        textAlign="center"
      >
        <Typography variant="h1" sx={{ mb: 2, color: 'text.secondary' }}>
          🤔
        </Typography>
        <Typography variant="h6" color="text.secondary">
          Cenová ponuka sa nenašla...
        </Typography>
      </Box>
    );
  }

  return (
    <Box
      {...boxStyles}
    >
    {priceOfferDetails && userInfo && typeof priceOfferDetails.is_vat !== 'undefined' &&
        <>
        <Card sx={{ width: '100%', maxWidth: 1000 }}>
          <CardContent>
            <Box display="flex" justifyContent="space-between" alignItems="center" sx={{ marginBottom: 5 }}>
              <Typography variant="h4" gutterBottom>
                Cenová ponuka
              </Typography>
              <Button
                variant="outlined"
                startIcon={<UploadFileIcon />}
                onClick={() => fileInputRef.current.click()}
              >
                Importovať z Excelu
              </Button>
              <input
                type="file"
                accept=".xlsx,.xls"
                ref={fileInputRef}
                style={{ display: 'none' }}
                onChange={handleFileChange}
              />
            </Box>
            <Box display="flex" flexDirection="row" justifyContent="space-between">
              <div style={{ display: 'flex', flexDirection: 'column', width: '40%' }}>
                <CustomerInfo customerInfo={priceOfferDetails.customer} setPriceOfferDetails={setPriceOfferDetails} />
              </div>
              <Divider orientation="vertical" flexItem sx={{ margin: '0 20px' }} />
                <div style={{ width: '40%' }}>
                  <UserInfo userInfo={userInfo} />
                </div>
            </Box>
            <ProgressDivider progress={Number(broadcastData?.percentage)} updatingItemPrices={updatingItemPrices} />
            <Box display="flex" justifyContent="space-between" alignItems="center" style={{ marginBottom: 5 }}>
              <Box display="flex" gap={1} alignItems="center">
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
                  control={
                    <Switch
                      checked={priceOfferDetails.is_vat}
                      onChange={() => setPriceOfferDetails({ ...priceOfferDetails, is_vat: !priceOfferDetails.is_vat })}
                      color="primary"
                    />
                  }
                  label={'Použiť DPH'}
                />

                {isRowSelected && (
                  <Box display="flex" gap={1}>
                    <AppButtonModal
                      styles={{ variant: 'contained', color: 'secondary' }}
                      title={"Upraviť hromadne ceny"} 
                      Button={Button}
                      ModalComponent={BulkPriceEditModal}
                      handleEditSelectedPriceOfferItemsPrices={handleEditSelectedPriceOfferItemsPrices} 
                      selectedItems={selectedItems}
                    />
                    <Button 
                      variant="contained" 
                      color="error" 
                      onClick={() => handleDeleteSelectedPriceOfferItems(selectedItems)}
                    >
                      Vymazať
                    </Button>
                  </Box>
                )}
              </Box>
              <AppButtonModal
                styles={{ variant: 'outlined', color: 'primary' }}
                title={"Upraviť"}
                Button={RefreshButton}
                ModalComponent={RefreshPriceModal}
                refreshing={updatingItemPrices}
                activatedButtonCallback={handleUpdatePrices}
                error={broadcastError}
              />
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
                  <Typography variant="body1">{priceOfferDetails.vatBase?.round()} €</Typography>
                </Box>
                <Box display="flex" justifyContent="space-between">
                  <Typography variant="body1">DPH:</Typography>
                  <Typography variant="body1">{priceOfferDetails.vat?.round()} €</Typography>
                </Box>
                <Box display="flex" justifyContent="space-between">
                  <Typography variant="body1">Spolu s DPH:</Typography>
                  <Typography variant="body1">{(priceOfferDetails.total + Math.abs(priceOfferDetails.discount)).round()} €</Typography>
                </Box>
                <Divider sx={{ margin: '20px 0' }} />
              </div>
            }
            {priceOfferDetails.discount < 0 && (
                  <>
                      {priceOfferDetails.items.map((item, index) => {
                          if (item.price >= 0) {
                              return null;
                          }

                          return (
                            <>
                            <Box key={index} display="flex" justifyContent="space-between" style={{ padding: 5 }}>
                              <Typography variant="body1" style={{ color: '#cb1819' }} dangerouslySetInnerHTML={{ __html: item.title }}/>
                              <Typography variant="body1" style={{ color: '#cb1819' }}>{Number(item.price)?.round()} €</Typography>
                            </Box>
                            <Divider sx={{ margin: '20px 0' }} />
                            </>
                          );
                      })}
                  </>
              )}
            <Box display="flex" justifyContent="space-between" style={{ padding: 5 }}>
              <Typography variant="h5">Celkom:</Typography>
              <Typography variant="h5">{priceOfferDetails.is_vat ? priceOfferDetails.total?.round() : priceOfferDetails.vatBase?.round()} €</Typography>
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
        <PriceOfferNotes />
        {importModalOpen && excelRows && (
          <ExcelImportModal
            open={importModalOpen}
            onClose={() => setImportModalOpen(false)}
            excelRows={excelRows}
          />
        )}
        </>
    }
    </Box>
  );
};

export default PriceOffer;
