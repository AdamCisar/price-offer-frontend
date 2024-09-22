import { useContext } from "react";
import { useUniversalPost } from "../api/UniversalPost";
import { PriceOfferContext } from "../providers/price_offer_providers/PriceOfferProvider";

const useUpdatePriceOfferDetails = () => {
    const [sendData, isLoading, error] = useUniversalPost("PRICE_OFFER");
    const { priceOfferDetails, setPriceOfferDetails } = useContext(PriceOfferContext);

    const handleSavePriceOfferDetails = async () => {
        try {
            await sendData(priceOfferDetails, priceOfferDetails.id);
          } catch (err) {
            console.log(err);
        }
    };

    const handleDeleteSelectedPriceOfferItems = async (ids) => {
        setPriceOfferDetails((prevData) => ({
            ...prevData,
            'items': prevData['items'].filter((item) => !ids.includes(item.id)),
        }));
    };

    const handleCustomerInputChange = (event) => {
        const { name, value } = event.target;
        setPriceOfferDetails((prevData) => ({
            ...prevData,
            'customer': {
              ...prevData['customer'],  
              [name]: value,          
            },
          }));
      };

    return {
        isLoading,
        handleSavePriceOfferDetails,
        handleCustomerInputChange,
        handleDeleteSelectedPriceOfferItems,
    };
};

export default useUpdatePriceOfferDetails;
