import useUpdateItemPrices from "./useUpdateItemPrices";

const useUpdatePriceOfferItemPrices = (priceOfferId) => {
    const { updatingItemPrices, updateItemPrices, broadcastData, broadcastError } = useUpdateItemPrices(priceOfferId);

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