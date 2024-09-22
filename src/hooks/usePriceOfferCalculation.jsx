import { useContext } from "react";
import { PriceOfferContext } from "../providers/price_offer_providers/PriceOfferProvider";

const usePriceOfferCalculation = () => {
    const { priceOfferDetails, setPriceOfferDetails } = useContext(PriceOfferContext);

    const calculateTotal = (priceOfferDetails) => {
        return priceOfferDetails.items?.reduce(
          (total, item) => total + item.quantity * item.price,
          0
        );
      };

      
    const handleEditSelectedPriceOfferItems = (ids, percentage) => {
        if (!percentage) {
          return;
        }
        
        const updatedItems = priceOfferDetails.items.map((item) => {
            if (ids.includes(item.id)) {
                return {
                    ...item,
                    price: (item.price * (1 + percentage / 100)).toFixed(4),
                };
            }
            return item;
        })

        setPriceOfferDetails((prevData) => ({
            ...prevData,
            items: updatedItems,
        }));
    };

    return {
        handleEditSelectedPriceOfferItems,
        calculateTotal,
    };
};

export default usePriceOfferCalculation;
