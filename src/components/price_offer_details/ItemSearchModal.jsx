import { Dialog, DialogActions, DialogContent, DialogTitle, TextField, Button, Checkbox } from '@mui/material';
import React, { useCallback, useContext, useRef } from 'react';
import { useSearch } from '../../api/Search';
import Loading from '../utilities/Loading';
import useSubmitPriceOfferItem from '../../hooks/useSubmitPriceOfferItem';
import { SnackBarContext } from '../../providers/SnackBarProvider';
import SearchedResultRow from '../styled_components/SearchedResultRow';
import { IMAGES_FOLDER } from '../../configuration/api_routes/ApiRoutes';

const ItemSearchModal = React.memo(({ open, onClose, focusInputRef, styles }) => {
  const { searchedResults, setSearchedResults, debouncedSearch, isLoading, error } = useSearch("ITEM_SEARCH");
  const { handleSnackbarOpen } = useContext(SnackBarContext);
  const { addPriceOfferItemToContext } = useSubmitPriceOfferItem(onClose);
  const [selectedItems, setSelectedItems] = React.useState({});

  const onSubmit = () => {
    if (selectedItems.length === 0) {
      onClose();
      return;
    }

    const existingItems = addPriceOfferItemToContext(Object.values(selectedItems));
    let messageText = selectedItems.length === 1 ? 'Produkt bol pridaný do ponuky.' : 'Produkty boli pridané do ponuky.';
    let severity = 'success';

    if (existingItems.length) {
      messageText = 'Niektoré z vybraných produktov neboli pridané do ponuky, pretože sa už v nej nachádzajú.';
      severity = 'warning';
    }

    handleSnackbarOpen(messageText, severity);
    setSelectedItems({});
    setSearchedResults([]);
    onClose();
  };

  const handleItemClick = useCallback((item) => {
    setSelectedItems((prevItems) => {
      const newItems = { ...prevItems };

      if (newItems[item.item_id]) {
        delete newItems[item.item_id];
      } else {
        newItems[item.item_id] = item;
      }

      return newItems;
    });
  }, []);

  return (
    <div>
      <Dialog open={open} onClose={onClose}
            PaperProps={{
                style: { 
                  width: 500,
                }
            }} 

            onKeyUp={(e) => {
              if (e.key === 'Enter') {
                onSubmit();
              }
            }}
        >
        <DialogTitle>Vyhľadať produkt</DialogTitle>
        <DialogContent>
        <TextField
            margin="dense"
            name="search"
            fullWidth
            placeholder="Začnite písať..."
            variant="outlined"
            inputRef={focusInputRef}
            onChange={debouncedSearch}
            style={{
              width: '97%',
            }}
        />
        </DialogContent>
        <div
          style={{
            height: 300,
            overflowY: 'auto',
            justifyContent: 'center',
          }}
        >
          {isLoading ? 
            <Loading height={'10vh'} /> :
            searchedResults && 
            searchedResults.map((item) => (
                <SearchedResultRow
                  key={item.item_id}
                  onClick={() => handleItemClick(item)}
                  >
                  <Checkbox 
                    checked={!!selectedItems[item.item_id]}
                  />
                  <span style={{ display: 'flex', alignItems: 'center', marginRight: 10 }}>
                    {/* <img style={{ width: 30, height: 25 }} src={IMAGES_FOLDER + item.img_url} alt={' '} /> */}
                  </span>
                  <span style={{ flexGrow: 1 }}>{item.title}</span>
                  <span>{item.price} €</span>
                </SearchedResultRow>
              ))
          }
        </div>
        <DialogActions>
          <Button onClick={onClose} color="secondary">
            Zatvoriť
          </Button>
          <Button onClick={onSubmit} color="primary">
            Pridať
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}, (prevProps, nextProps) => {
  return prevProps.open === nextProps.open;
});

export default ItemSearchModal;
