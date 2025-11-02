import { useContext, useEffect } from "react";
import useUpdateItemPrices from "./useUpdateItemPrices";
import { PriceOfferContext } from "../providers/price_offer_providers/PriceOfferProvider";

const useUpdatePriceOfferItemPrices = (priceOfferId) => {
    const { setPriceOfferDetails, priceOfferDetails } = useContext(PriceOfferContext);
    const { updatingItemPrices, updateItemPrices, broadcastData, broadcastError } = useUpdateItemPrices();
    
    useEffect(() => {
        if (!priceOfferDetails.items || !broadcastData?.item_id || broadcastData?.price_offer_id !== priceOfferId) {
            return;
        }
        
        const currentItem = priceOfferDetails.items.find(item => item.item_id === broadcastData.item_id);
    
        if (currentItem.price === broadcastData.price) {
            return;
        }

        setPriceOfferDetails(prevData => ({
            ...prevData,
            items: prevData.items.map(item =>
                item.item_id === broadcastData.item_id
                    ? { ...item, price: broadcastData.price }
                    : item
            )
        }));

    }, [broadcastData, priceOfferDetails.items, setPriceOfferDetails]);

    if (broadcastData && broadcastData?.price_offer_id !== priceOfferId) {
        return {
            updateItemPrices: false,
            updateItemPrices,
            eventData: null
        }
    }

    return {
        updatingItemPrices,
        updateItemPrices,
        broadcastData,
        broadcastError
    }
}

export default useUpdatePriceOfferItemPrices