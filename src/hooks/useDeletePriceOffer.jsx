import { useUniversalDelete } from "../api/UniversalDelete";
import ApiRoutes from "../configuration/api_routes/ApiRoutes";

const useDeletePriceOffer = () => {
    const [deleteData, isLoading, error] = useUniversalDelete("PRICE_OFFER");

    const deletePriceOffer = async (idList) => {
        if (idList.length === 0) {
            return;
        }

        try {
            const apiRoute = ApiRoutes["PRICE_OFFER"];
            const priceOfferIdList = await deleteData(apiRoute, idList);
          } catch (err) {
            console.log(err);
        }

        return idList;
    };
   
    return {
        deletePriceOffer
    };
};

export default useDeletePriceOffer;
