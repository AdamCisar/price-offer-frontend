import PriceOfferCards from '../components/price_offer_cards/PriceOfferCards';
import {
    Box,
  } from '@mui/material';
import Pagination from '../components/utilities/Pagination';
import { PriceOfferListContext } from '../providers/PriceOfferListProvider';
import { useContext } from 'react';

const PriceOfferList = () => {
    const { setOffset, page, setPage, pageCount } = useContext(PriceOfferListContext);

    const onPageChange = (event, value) => {
      setPage(value);
      setOffset((value - 1) * 21);
      window.scrollTo(0, 0);
    }

    return (
        <Box
          sx={{ 
            height: '100%',
            backgroundColor: '#f5f5f5', 
            display: 'grid',
            gridTemplateRows: '1fr auto',
          }}
        >
          <Box>
            <PriceOfferCards />
          </Box>

          <Pagination page={page} pageCount={pageCount} onChange={onPageChange} />
        </Box>
    );
};

export default PriceOfferList;