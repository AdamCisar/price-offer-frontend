import PriceOfferSnapshot from './PriceOfferSnapshot';
import { PriceOfferListContext } from '../../providers/PriceOfferListProvider';
import React, { useContext } from "react";
import Loading from '../utilities/Loading';
import MonthDivider from './MonthDivider';

const PriceOfferCards = () => {
    const { priceOffer, isLoading, isFetching, error } = useContext(PriceOfferListContext);

    return (
        <div style={{ padding: '10px', width: '100%' }}>
            {isLoading || isFetching ? (
                <Loading height={'50vh'} />
            ) : (
                <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
                    {priceOffer && priceOffer.length > 0 ? (
                         <>
                            {priceOffer.map((item, index) => (
                                <React.Fragment key={item.id}>
                                    <MonthDivider date={item.created_at} index={index} />
                                    <PriceOfferSnapshot {...item} />
                                </React.Fragment>
                            ))}
                        </>
                    ) : (
                        null
                    )}
                </div>
            )}
        </div>
  );
}

export default PriceOfferCards