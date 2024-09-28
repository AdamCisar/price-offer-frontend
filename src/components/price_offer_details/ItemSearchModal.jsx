import { Dialog, DialogActions, DialogContent, DialogTitle, TextField, Button } from '@mui/material';
import { useContext, useEffect, useMemo, useRef, useState } from 'react';
import debounce from 'lodash.debounce';
import { useSearchItem } from '../../api/SearchItem';
import Loading from '../utilities/Loading';
import styled from 'styled-components';
import useSubmitPriceOfferItem from '../../hooks/useSubmitPriceOfferItem';
import { SnackBarContext } from '../../providers/SnackBarProvider';

const ItemRow = styled('div')(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  padding: '10px',
  margin: 'auto',
  marginBottom: '10px',
  width: '85%',
  borderRadius: '30px',
  cursor: 'pointer',
  border: '1px solid #ccc',
  // backgroundColor: isSelected ? 'black' : 'white', // Change background based on selection
  // color: isSelected ? 'white' : 'black', // Change text color based on selection
  transition: 'background-color 0.2s',
  '&:hover': {
    backgroundColor: 'black',
    color: 'white',
  },
}));

const ItemSearchModal = ({ open, onClose, focusInputRef }) => {
  const [searchItems, isLoading, error] = useSearchItem("ITEM_SEARCH");
  const { handleSnackbarOpen } = useContext(SnackBarContext);
  const { addPriceOfferItemToContext } = useSubmitPriceOfferItem(onClose);
  const [items, setItems] = useState([]);
  const selectedItems = useRef({
    items: [],
    elems: []
  });

  const handleChange = async (e) => {
    const items = await searchItems(e.target.value);
    setItems(items);
  };

  const debouncedResults = useMemo(() => {
    return debounce(handleChange, 400);
  }, []);

  useEffect(() => {
    return () => {
      debouncedResults.cancel();
    };
  });

  const handleItemClick = (item) => {
    for (let i = 0; i < selectedItems.current.items.length; i++) {
      if (selectedItems.current.items[i] === item) {
        selectedItems.current.items.splice(i, 1);
        selectedItems.current.elems[item.id].style.backgroundColor = 'white';
        selectedItems.current.elems[item.id].style.color = 'black';
        return;
      }

    }

    selectedItems.current.elems[item.id].style.backgroundColor = 'black';
    selectedItems.current.elems[item.id].style.color = 'white';
    selectedItems.current.items.push(item);
  };

  const onCloseModal = () => {
    onClose();
    setTimeout(() => {
      setItems([]);
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
      existingItems[item.name] = addPriceOfferItemToContext(item);
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
            onChange={debouncedResults}
        />
        </DialogContent>
        {isLoading ? 
          <Loading height={'10vh'} /> :
          items && 
            items.map((item) => (
              <ItemRow
                key={item.id}
                ref={el => selectedItems.current.elems[item.id] = el}
                // selected={selectedItems.current.some(selectedItem.item => selectedItem.item.id === item.id)}
                onClick={() => handleItemClick(item)}
                >
                <span>{item.title}</span>
                <span>{item.price} €</span>
              </ItemRow>
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
};

export default ItemSearchModal;
