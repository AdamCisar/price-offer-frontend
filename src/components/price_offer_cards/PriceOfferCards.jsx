import React from 'react';
import PriceOfferSnapshot from './PriceOfferSnapshot';
import { PriceOfferListContext } from '../../providers/PriceOfferListProvider';
import { useContext } from "react";
import Loading from '../utilities/Loading';
import AppButtonModal from '../utilities/AppButtonModal';
import { IconButton } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import CreatePriceOfferModal from './CreatePriceOfferModal';

const PriceOfferCards = () => {
    const { priceOffer, isLoading, error } = useContext(PriceOfferListContext);

    return (
        <div style={{ padding: '10px', width: '100%' }}>
          {isLoading ? (
            <Loading />
          ) : ( priceOffer && priceOffer.length > 0) ? (
            <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
                {priceOffer?.map((item) => (
                <PriceOfferSnapshot key={item.id} {...item} />
                ))}

                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: 200, minHeight: 350 }}>
                  <AppButtonModal
                    Button={IconButton}
                    ModalComponent={CreatePriceOfferModal}
                    InnerComponent={AddIcon}
                    sx={{
                      width: 106,
                      height: 106,
                      borderRadius: '100%',
                      backgroundColor: 'darkgrey', 
                      color: 'white',
                      '&:hover': {
                      backgroundColor: 'grey',
                      },
                    }}
                  />
                </div>

            </div>
          ) : (
                null
          )}
        </div>
      );
      
}

export default PriceOfferCards