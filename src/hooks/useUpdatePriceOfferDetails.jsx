import { useCallback, useContext } from "react";
import { useUniversalPost } from "../api/UniversalPost";
import { PriceOfferContext } from "../providers/price_offer_providers/PriceOfferProvider";
import { SnackBarContext } from "../providers/SnackBarProvider";

const useUpdatePriceOfferDetails = () => {
    const [sendData, isLoading, error] = useUniversalPost("PRICE_OFFER_DETAILS");
    const { priceOfferDetails, setPriceOfferDetails } = useContext(PriceOfferContext);
    const { handleSnackbarOpen } = useContext(SnackBarContext);

    const handleSavePriceOfferDetails = useCallback(async (priceOfferDetails) => {
        if (!Object.keys(priceOfferDetails).length) {
            return;
        }

        try {
            await sendData(priceOfferDetails);
            handleSnackbarOpen('Automatické ukladanie cenovej ponuky bolo úspešné!', 'success');
          } catch (err) {
            handleSnackbarOpen('Cenová ponuka sa neuložila!', 'error');
            console.log(err);
        }
    }, [priceOfferDetails, sendData]);

    const handleDeleteSelectedPriceOfferItems = useCallback(async (ids) => {
        const items = priceOfferDetails.items.filter((item) => !ids.includes(item.item_id));
        setPriceOfferDetails((prevData) => ({
            ...prevData,
            'items': items,
        }));
    }, [priceOfferDetails, setPriceOfferDetails]);

    return {
        isLoading,
        handleSavePriceOfferDetails,
        handleDeleteSelectedPriceOfferItems,
    };
};

export default useUpdatePriceOfferDetails;
