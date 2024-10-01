import { DataGrid } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';
import React, { useCallback, useMemo } from 'react';
import _ from 'lodash';

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

const columns = [
  { field: 'id', headerName: 'ID', width: 70 },
  { field: 'title', headerName: 'Názov', width: 320 },
  { field: 'unit', headerName: 'Jednotka', width: 130 },
  { field: 'quantity', headerName: 'Množstvo', width: 130, editable: true },
  { field: 'price', headerName: 'Cena', width: 130, editable: true },
  { field: 'total', headerName: 'Celkom', width: 130 },
];

const PriceOfferItems = React.memo(({ 
  priceOfferItems, 
  toggleSelectedRowButton, 
  setSelectedItems, 
  setPriceOfferDetails, 
  calculateTotalPriceForItem,  
  calculateTotal 
}) => {
  const rows = useMemo(() => priceOfferItems, [priceOfferItems]);

  const handleItemSelection = useCallback((ids) => {
    setSelectedItems(ids);
    toggleSelectedRowButton(ids);
  }, [setSelectedItems, toggleSelectedRowButton]);

  const processRowUpdate = useCallback((newRow) => {
    const updatedItem = updateRow(newRow); 
    const calculatedItem = calculateTotalPriceForItem(updatedItem);
    const items = rows.map(item => 
      item.id === newRow.id ? calculatedItem : item
    );
    const totalPrice = calculateTotal(items);

    setPriceOfferDetails(prevData => ({
      ...prevData,
      items,
      total: totalPrice,
    }));

    return newRow;
  }, [calculateTotal, calculateTotalPriceForItem, rows, setPriceOfferDetails]);

  const updateRow = (newRow) => {
    newRow.price = (Number(newRow.price.toString().replace(',', '.'))).round();
    newRow.quantity = Number(newRow.quantity.toString().replace(',', '.'));
    return newRow;
  };

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
        rows={rows}
        columns={columns}
        pageSizeOptions={[5, 10, 25, 50, 100]}
        onRowSelectionModelChange={handleItemSelection}
        processRowUpdate={processRowUpdate}
        onProcessRowUpdateError={handleProcessRowUpdateError}
        sx={{ border: 0 }} 
      />
    </Paper>
  );
}, (prevProps, nextProps) => {
  return (
    _.isEqual(prevProps.priceOfferItems, nextProps.priceOfferItems) &&
    _.isEqual(prevProps.selectedItems, nextProps.selectedItems) 
  );
});

export default PriceOfferItems;
