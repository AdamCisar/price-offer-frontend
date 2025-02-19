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

    const validInput = cleanedInput.replace(/(?!^-)[^0-9.]/g, '');
    const dotCount = validInput.split('.').length - 1;

    if (dotCount > 1) {
        return validInput.split('.')[0] + '.' + validInput.split('.').slice(1).join('').substring(0, validInput.indexOf('.') + 1);
    }
    
    return validInput;
};

const PriceOfferItems = React.memo(({ 
  priceOfferItems, 
  toggleSelectedRowButton, 
  setSelectedItems, 
  setPriceOfferDetails, 
  calculateTotalPriceForItem,
  isVat
}) => {
  const rows = useMemo(() => priceOfferItems, [priceOfferItems]);

  const columns = [
    { field: 'title', headerName: 'Názov', width: (isVat ? 425 : 510), editable: true },
    { field: 'unit', headerName: 'Merná jednotka', width: 80, editable: true },
    { field: 'quantity', headerName: 'Množstvo', width: 100, editable: true,
      renderCell: (params) => (Number(params.value).round()),
      valueParser: (value, row, column, apiRef) => {
        return handleCellEditChange(value);
      },
    },
    { field: 'price', headerName: (isVat ? 'Cena bez DPH' : 'Cena'), width: 110, 
      renderCell: (params) => (Number(params.value).round()), editable: true,
      valueParser: (value, row, column, apiRef) => {
        return handleCellEditChange(value);
      },
    },
    ...(isVat ? [{ field: "vat", headerName: "DPH %", width: 80, editable: false,
        renderCell: (params) => (Number(params.value).round()),
        valueParser: (value, row, column, apiRef) => {
          return handleCellEditChange(value);
        },
        valueGetter: (params) => params ?? 23,
    }] : []),
    { field: 'total', headerName: (isVat ? 'Spolu bez DPH' : 'Spolu'), width: 115,
      renderCell: (params) => (Number(params.value).round()),
      valueParser: (value, row, column, apiRef) => {
        return handleCellEditChange(value);
      },
    },
  ];

  const handleItemSelection = useCallback((ids) => {
    setSelectedItems(ids);
    toggleSelectedRowButton(ids);
  }, [setSelectedItems, toggleSelectedRowButton]);

  const processRowUpdate = useCallback((newRow) => {
    const calculatedItem = calculateTotalPriceForItem(newRow);
    const items = rows.map(item => 
      item.item_id === newRow.item_id ? calculatedItem : item
    );

    if (JSON.stringify(priceOfferItems) === JSON.stringify(items)) {
      return newRow;
    }

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
        getRowId={(row) => row.item_id ?? row.id}
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
    _.isEqual(prevProps.selectedItems, nextProps.selectedItems) &&
    _.isEqual(prevProps.isVat, nextProps.isVat)
  );
});

export default PriceOfferItems;
