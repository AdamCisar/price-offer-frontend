import { useCallback, useContext } from "react";
import { PriceOfferContext } from "../providers/price_offer_providers/PriceOfferProvider";

const itemRounding = 3;

const usePriceOfferCalculation = () => {
    const{ priceOfferDetails, setPriceOfferDetails } = useContext(PriceOfferContext); 

    const calculateTotal = useCallback((items) => {
        let total = items.reduce(
          (total, item) => total + item.quantity * item.price,
          0
        );

        return total.round();
    }, []);

    const handleEditSelectedPriceOfferItemsPrices = useCallback((ids, percentage) => {
        if (!percentage) {
          return;
        }
        
        const updatedItems = priceOfferDetails.items.map((item) => {
            if (ids.includes(item.id)) {
                item.price = item.price * (1 + percentage / 100);
                return {
                    ...item,
                    price: (item.price).round(itemRounding),
                    total: (item.quantity * item.price).round(itemRounding),
                };
            }

            return item;
        })

        const total = calculateTotal(updatedItems);
        setPriceOfferDetails((prevData) => ({
            ...prevData,
            items: updatedItems,
            "total": total
        }));
    }, [calculateTotal, priceOfferDetails, setPriceOfferDetails]);

    const calculateTotalPriceForItem = useCallback((item) => {
        if (!item) {
            return;
        }

        item.total = (item.quantity * item.price).round(itemRounding);
        return item;
    }, []);

    return {
        handleEditSelectedPriceOfferItemsPrices,
        calculateTotal,
        calculateTotalPriceForItem,
    };
};

export default usePriceOfferCalculation;
