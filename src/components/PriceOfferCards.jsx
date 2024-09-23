import React from 'react';
import PriceOfferSnapshot from './snapshots/PriceOfferSnapshot';
import { PriceOfferListContext } from '../providers/PriceOfferListProvider';
import { useContext } from "react";
import AddPriceOfferButton from './AddPriceOfferButton';
import Loading from './Loading';

const PriceOfferCards = () => {
    const { priceOffer, isLoading, error } = useContext(PriceOfferListContext);

    return (
      <div style={{ padding: '10px', width: '100%' }}>
          {isLoading ? (
              <Loading />
          ) : (
              priceOffer && priceOffer.length > 0 ? (
                  <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
                      {priceOffer.map((item) => (
                          <PriceOfferSnapshot key={item.id} {...item} />
                      ))}
                      <AddPriceOfferButton />
                  </div>
              ) : (
                  <p>No price offers available.</p>
              )
          )}
      </div>
  );
}

export default PriceOfferCards