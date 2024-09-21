import { useUniversalDelete } from "../api/UniversalDelete";

const useDeletePriceOffer = () => {
    const [deleteData, isLoading, error] = useUniversalDelete("PRICE_OFFER");

    const deletePriceOffer = async (idList) => {
        if (idList.length === 0) {
            return;
        }

        try {
            const priceOfferIdList = await deleteData(idList);
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
