import { useContext } from "react";
import { PriceOfferContext } from "../providers/price_offer_providers/PriceOfferProvider";

const usePriceOfferCalculation = () => {
    const{ priceOfferDetails, setPriceOfferDetails } = useContext(PriceOfferContext); 

    const calculateTotal = (priceOfferDetails) => {
        return priceOfferDetails.items?.reduce(
          (total, item) => total + item.quantity * item.price,
          0
        );
      };

    const handleEditSelectedPriceOfferItemsPrices = (ids, percentage) => {
        if (!percentage) {
          return;
        }
        
        const updatedItems = priceOfferDetails.items.map((item) => {
            if (ids.includes(item.id)) {
                item.price = (item.price * (1 + percentage / 100)).round(4);
                return {
                    ...item,
                    price: item.price,
                    total: (item.quantity * item.price).round(4),
                };
            }
            return item;
        })

        setPriceOfferDetails((prevData) => ({
            ...prevData,
            items: updatedItems,
        }));
    };

    const calculateTotalPriceForItem = (items) => {
        const calculatedItems = items?.map(item => ({
            ...item,
            total: (item.quantity * item.price).round(4),
        }));
    
        return calculatedItems;
    }

    const roundPrice = (price) => {
        return Math.round(price * 100) / 100;
    }

    return {
        handleEditSelectedPriceOfferItemsPrices,
        calculateTotal,
        calculateTotalPriceForItem,
    };
};

export default usePriceOfferCalculation;
