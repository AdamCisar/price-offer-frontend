import React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';

const PriceOfferItems = ({ priceOfferItems }) => {
    const columns = [
        { field: 'id', headerName: 'ID', width: 70 },
        { field: 'title', headerName: 'Názov', width: 130 },
        { field: 'quantity', headerName: 'Množstvo', width: 130 },
        { field: 'price', headerName: 'Cena', width: 130 },
      ];

    const paginationModel = { page: 0, pageSize: 5 };

  return (
    <Paper sx={{ height: 400, width: '100%' }}>
    <DataGrid
      rows={priceOfferItems}
      columns={columns}
      initialState={{ pagination: { paginationModel } }}
      pageSizeOptions={[5, 10]}
      checkboxSelection
      sx={{ border: 0 }}
    />
  </Paper>
  );
};

export default PriceOfferItems;
