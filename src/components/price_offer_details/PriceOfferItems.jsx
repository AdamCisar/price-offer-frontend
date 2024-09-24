import { DataGrid } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';

const PriceOfferItems = ({ priceOfferItems, toggleSelectedRowButton, setSelectedItems, setPriceOfferDetails, calculateTotalPriceForItem }) => {
    const paginationModel = { page: 0, pageSize: 5 };
    const columns = [
        { field: 'id', headerName: 'ID', width: 70 },
        { field: 'unit', headerName: 'Jednotka', width: 130 },
        { field: 'title', headerName: 'Názov', width: 320 },
        { field: 'quantity', headerName: 'Množstvo', width: 130, editable: true },
        { field: 'price', headerName: 'Cena', width: 130, editable: true },
        { field: 'total', headerName: 'Celkom', width: 130 },
      ];


    const handleItemSelection = (ids) => {
      setSelectedItems(ids);
      toggleSelectedRowButton(ids);
    } 

    const processRowUpdate = (newRow) => {
      const updatedItems = updateRow(newRow); 
      const calculatedItems = calculateTotalPriceForItem(updatedItems); 

      setPriceOfferDetails(prevData => {
        return {
          ...prevData,
          'items': calculatedItems
        }
      });

      return calculatedItems.find(item => item.id === newRow.id);
    }

    const updateRow = (newRow) => {
      const updatedItems = priceOfferItems.map((item) => {
        if (item.id === newRow.id) {
          newRow.price = newRow.price.toString().replace(',', '.');
          newRow.quantity = newRow.quantity.toString().replace(',', '.');
          return newRow;
        }
        return item;
      });

      return updatedItems;
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

      sx={{ border: 0 }}
    />
  </Paper>
  );
};

export default PriceOfferItems;
