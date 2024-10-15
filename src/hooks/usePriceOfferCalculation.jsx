import { useCallback, useContext } from "react";
import { PriceOfferContext } from "../providers/price_offer_providers/PriceOfferProvider";

const usePriceOfferCalculation = () => {
    const{ priceOfferDetails, setPriceOfferDetails } = useContext(PriceOfferContext); 

    const handleEditSelectedPriceOfferItemsPrices = useCallback((ids, percentage) => {
        if (!percentage) {
          return;
        }
        
        const updatedItems = priceOfferDetails.items.map((item) => {
            if (ids.includes(item.id)) {
                item.price = item.price * (1 + percentage / 100);
                return {
                    ...item,
                    price: item.price,
                    total: item.quantity * item.price,
                };
            }

            return item;
        })

        setPriceOfferDetails((prevData) => ({
            ...prevData,
            items: updatedItems,
        }));
    }, [priceOfferDetails, setPriceOfferDetails]);

    const calculateTotalPriceForItem = useCallback((item) => {
        if (!item) {
            return;
        }

        item.total = item.quantity * item.price;
        
        return item;
    }, []);

    return {
        handleEditSelectedPriceOfferItemsPrices,
        calculateTotalPriceForItem,
    };
};

export default usePriceOfferCalculation;
