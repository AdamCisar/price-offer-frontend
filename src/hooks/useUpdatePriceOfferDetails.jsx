import { useContext } from "react";
import { useUniversalPost } from "../api/UniversalPost";
import { PriceOfferContext } from "../providers/price_offer_providers/PriceOfferProvider";
import ApiRoutes from "../configuration/api_routes/ApiRoutes";
import { useUniversalDelete } from "../api/UniversalDelete";

const useUpdatePriceOfferDetails = () => {
    const [sendData, isLoading, error] = useUniversalPost("PRICE_OFFER");
    const [deleteData ] = useUniversalDelete();
    const { priceOfferDetails, setPriceOfferDetails } = useContext(PriceOfferContext);

    const handleSavePriceOfferDetails = async () => {
        try {
            await sendData(priceOfferDetails, priceOfferDetails.id);
          } catch (err) {
            console.log(err);
        }
    };

    const handleDeleteSelectedPriceOfferItems = async (ids) => {
        try {
            const apiRoute = ApiRoutes["PRICE_OFFER_ITEM"].replace(':priceOfferId', priceOfferDetails.id);
            // await deleteData(apiRoute, ids);

            setPriceOfferDetails((prevData) => ({
                ...prevData,
                'items': prevData['items'].filter((item) => !ids.includes(item.id)),
              }));
        } catch (err) {
            console.log(err);
        }
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
