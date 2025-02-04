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

const handleCellEditChange = (value) => {
    let cleanedInput = value.replace(/,/g, '.');

    const validInput = cleanedInput.replace(/[^0-9.]/g, ''); 
    const dotCount = validInput.split('.').length - 1;

    if (dotCount > 1) {
        return validInput.split('.')[0] + '.' + validInput.split('.').slice(1).join('').substring(0, validInput.indexOf('.') + 1);
    }
    
    return validInput;
};

const itemRounding = 2;
const columns = [
  { field: 'title', headerName: 'Názov', width: 320, editable: true },
  { field: 'unit', headerName: 'Merná jednotka', width: 130, editable: true },
  { field: 'quantity', headerName: 'Množstvo', width: 130, editable: true,
    renderCell: (params) => (Number(params.value).round(itemRounding)),
    valueParser: (value, row, column, apiRef) => {
      return handleCellEditChange(value);
    },
  },
  { field: 'price', headerName: 'Cena', width: 130, 
    renderCell: (params) => (Number(params.value).round(itemRounding)), editable: true,
    valueParser: (value, row, column, apiRef) => {
      return handleCellEditChange(value);
    },
  },
  { field: 'total', headerName: 'Spolu', width: 130,
    renderCell: (params) => (Number(params.value).round(itemRounding)),
    valueParser: (value, row, column, apiRef) => {
      return handleCellEditChange(value);
    },
  },
];

const PriceOfferItems = React.memo(({ 
  priceOfferItems, 
  toggleSelectedRowButton, 
  setSelectedItems, 
  setPriceOfferDetails, 
  calculateTotalPriceForItem,  
}) => {
  const rows = useMemo(() => priceOfferItems, [priceOfferItems]);

  const handleItemSelection = useCallback((ids) => {
    setSelectedItems(ids);
    toggleSelectedRowButton(ids);
  }, [setSelectedItems, toggleSelectedRowButton]);

  const processRowUpdate = useCallback((newRow) => {
    const calculatedItem = calculateTotalPriceForItem(newRow);
    const items = rows.map(item => 
      item.item_id === newRow.item_id ? calculatedItem : item
    );

    setPriceOfferDetails(prevData => ({
      ...prevData,
      items,
    }));

    return newRow;
  }, [calculateTotalPriceForItem, rows, setPriceOfferDetails]);

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
        getRowId={(row) => row.item_id}
        pageSizeOptions={[5, 10, 25, 50, 100]}
        onRowSelectionModelChange={handleItemSelection}
        processRowUpdate={processRowUpdate}
        onProcessRowUpdateError={handleProcessRowUpdateError}
        disableRowSelectionOnClick
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
