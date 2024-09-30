import { DataGrid } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';

const localeText = {
  // Pagination
  noRowsLabel: 'Žiadne riadky',
  noResultsOverlayLabel: 'Žiadne výsledky',
  errorOverlayDefaultLabel: 'Niečo sa pokazilo.',
  page: 'Strana',
  // Column menu
  columnMenuLabel: 'Menu stĺpca',
  columnMenuShow: 'Zobraziť',
  columnMenuUnsort: 'Zrušiť triedenie',
  columnMenuSortAsc: 'Triediť vzostupne',
  columnMenuSortDesc: 'Triediť zostupne',
};

const paginationModel = { page: 0, pageSize: 5 };
const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'title', headerName: 'Názov', width: 320 },
    { field: 'unit', headerName: 'Jednotka', width: 130 },
    { field: 'quantity', headerName: 'Množstvo', width: 130, editable: true },
    { field: 'price', headerName: 'Cena', width: 130, editable: true },
    { field: 'total', headerName: 'Celkom', width: 130 },
];

const PriceOfferItems = ({ 
  priceOfferItems, 
  toggleSelectedRowButton, 
  setSelectedItems, 
  setPriceOfferDetails, 
  calculateTotalPriceForItem,  
  calculateTotal }) => {

  const handleItemSelection = (ids) => {
    setSelectedItems(ids);
    toggleSelectedRowButton(ids);
  } 

  const processRowUpdate = (newRow) => {
    const updatedItem = updateRow(newRow); 
    const calculatedItem = calculateTotalPriceForItem(updatedItem);
    const items = priceOfferItems.map(item => item.id === newRow.id ? calculatedItem : item);
    const totalPrice = calculateTotal(items);

    setPriceOfferDetails(prevData => {
      return {
        ...prevData,
        'items': items,
        'total': totalPrice
      }
    });

    return newRow;
  }

  const updateRow = (newRow) => {
    newRow.price = (Number(newRow.price.toString().replace(',', '.'))).round();
    newRow.quantity = Number(newRow.quantity.toString().replace(',', '.'));

    return newRow;
  }

  const handleProcessRowUpdateError = (error) => {
    console.error('processRowUpdateError', error);
  };

  return (
    <Paper sx={{ height: 'auto', width: '100%' }}>
    <DataGrid
      checkboxSelection
      disableColumnResize 
      localeText={localeText}
      autoHeight

      rows={priceOfferItems}
      columns={columns}

      initialState={{ pagination: { paginationModel } }}
      pageSizeOptions={[5, 10,  25, 50, 100]}
      slotProps={{ pagination: {  
                                  labelRowsPerPage: 'Riadkov na stránku' 
                                } 
                }}

      onRowSelectionModelChange={(ids) => handleItemSelection(ids)}
      processRowUpdate={processRowUpdate}
      onProcessRowUpdateError={handleProcessRowUpdateError}

      sx={{ border: 0 }}
    />
  </Paper>
  );
};

export default PriceOfferItems;
