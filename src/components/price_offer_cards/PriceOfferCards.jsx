import PriceOfferSnapshot from './PriceOfferSnapshot';
import { PriceOfferListContext } from '../../providers/PriceOfferListProvider';
import React, { useContext } from "react";
import Loading from '../utilities/Loading';
import MonthDivider from './MonthDivider';

const PriceOfferCards = () => {
    const { priceOffer, isLoading, isFetching, error } = useContext(PriceOfferListContext);

    return (
        <div>
            {isLoading || isFetching ? (
                <Loading height={'50vh'} />
            ) : (
                <div
                    style={{
                        display: "grid",
                        gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
                        gridAutoRows: "minmax(50px, auto)",
                        gap: "10px 0px"
                    }}
                >
                    {priceOffer.length > 0 && priceOffer.map((item, index) => {
                        const divider = MonthDivider({ date: item.created_at, index });
                        return (
                        <React.Fragment key={item.id}>
                            {divider && <div style={{ gridColumn: "1 / -1" }}>{divider}</div>}
                            <PriceOfferSnapshot {...item} />
                        </React.Fragment>
                        );
                    })}
                </div>
            )}
        </div>
  );
}

export default PriceOfferCards