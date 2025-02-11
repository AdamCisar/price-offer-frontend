import { Dialog, DialogActions, DialogContent, DialogTitle, TextField, Button } from '@mui/material';
import React, { useContext, useRef } from 'react';
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
  const selectedItems = useRef({
    items: [],
    elems: []
  });

  const handleItemClick = (item) => {
    for (let i = 0; i < selectedItems.current.items.length; i++) {
      if (selectedItems.current.items[i] === item) {
        selectedItems.current.items.splice(i, 1);
        selectedItems.current.elems[item.item_id].style.backgroundColor = 'white';
        selectedItems.current.elems[item.item_id].style.color = 'black';
        return;
      }
    }

    selectedItems.current.elems[item.item_id].style.backgroundColor = 'black';
    selectedItems.current.elems[item.item_id].style.color = 'white';
    selectedItems.current.items.push(item);
  };

  const onCloseModal = () => {
    onClose();
    setTimeout(() => {
      setSearchedResults([]);
      selectedItems.current = {
        items: [],
        elems: []
      };
    }, 500);
  }

  const onSubmit = () => {
    if (selectedItems.current.items.length === 0) {
      onClose();
      return;
    }

    let existingItems = {};

    for (let item of selectedItems.current.items) {
      existingItems[item.title] = addPriceOfferItemToContext(item);
    }
    
    let messageText = selectedItems.current.items.length === 1 ? 'Produkt bol pridaný do ponuky.' : 'Produkty boli pridané do ponuky.';
    let severity = 'success';

    if (Object.values(existingItems).includes(false)) {
      messageText = 'Niektoré z vybraných produktov neboli pridané do ponuky, pretože sa už v nej nachádzajú.';
      severity = 'warning';
    }

    handleSnackbarOpen(messageText, severity);

    onCloseModal();
  };

  return (
    <div>
      <Dialog open={open} onClose={onCloseModal}
            PaperProps={{
                style: { width: 500 }
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
        />
        </DialogContent>
        {isLoading ? 
          <Loading height={'10vh'} /> :
          searchedResults && 
          searchedResults.map((item) => (
              <SearchedResultRow
                key={item.item_id}
                ref={el => selectedItems.current.elems[item.item_id] = el}
                onClick={() => handleItemClick(item)}
                >
                <span style={{ display: 'flex', alignItems: 'center', marginRight: 10 }}>
                  <img style={{ width: 30, height: 25 }} src={IMAGES_FOLDER + item.img_url} alt={' '} />
                </span>
                <span style={{ flexGrow: 1 }}>{item.title}</span>
                <span>{item.price} €</span>
              </SearchedResultRow>
            ))
        }
        <DialogActions>
          <Button onClick={onCloseModal} color="secondary">
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
