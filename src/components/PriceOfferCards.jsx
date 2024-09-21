import React from 'react';
import PriceOfferSnapshot from './snapshots/PriceOfferSnapshot';
import { PriceOfferContext } from '../providers/PriceOfferProvider';
import { useContext } from "react";
import AddPriceOfferButton from './AddPriceOfferButton';
import Loading from './Loading';

const PriceOfferCards = () => {
    const { priceOffer, isLoading, error } = useContext(PriceOfferContext);

    return (
      <div style={{ padding: '10px' }}>
          {isLoading ? (
              <Loading />
          ) : (
              priceOffer ? (
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