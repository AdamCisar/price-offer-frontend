import React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';

const PriceOfferItems = ({ priceOfferItems, handleItemsInputChange, toggleDeleteButton, setSelectedItems }) => {

    const paginationModel = { page: 0, pageSize: 5 };
    const columns = [
        { field: 'id', headerName: 'ID', width: 70 },
        { field: 'title', headerName: 'Názov', width: 130 },
        { field: 'quantity', headerName: 'Množstvo', width: 130 },
        { field: 'price', headerName: 'Cena', width: 130 },
        { field: 'total', headerName: 'Celkom', width: 130 },
      ];

    const handleItemSelection = (ids) => {
      setSelectedItems(ids);
      toggleDeleteButton(ids);
    } 

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

  return (
    <Paper sx={{ height: 400, width: '100%' }}>
    <DataGrid
      rows={priceOfferItems}
      columns={columns}
      initialState={{ pagination: { paginationModel } }}
      pageSizeOptions={[5, 10]}
      checkboxSelection
      slotProps={{ pagination: { labelRowsPerPage: 'Riadkov na stránku' } }}
      onRowSelectionModelChange={(ids) => handleItemSelection(ids)}
      sx={{ border: 0 }}
      localeText={localeText}
    />
  </Paper>
  );
};

export default PriceOfferItems;
