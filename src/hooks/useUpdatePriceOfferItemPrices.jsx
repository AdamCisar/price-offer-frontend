import useUpdateItemPrices from "./useUpdateItemPrices";

const useUpdatePriceOfferItemPrices = (priceOfferId) => {
    const { updatingItemPrices, updateItemPrices, broadcastData } = useUpdateItemPrices(priceOfferId);

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
        broadcastData
    }
}

export default useUpdatePriceOfferItemPrices