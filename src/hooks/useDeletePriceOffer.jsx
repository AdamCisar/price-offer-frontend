import { useContext } from "react";
import { useUniversalDelete } from "../api/UniversalDelete";
import { SnackBarContext } from "../providers/SnackBarProvider";

const useDeletePriceOffer = () => {
    const [deleteData, isLoading, error] = useUniversalDelete("PRICE_OFFER");
    const { handleSnackbarOpen } = useContext(SnackBarContext);

    const deletePriceOffer = async (idList) => {
        if (idList.length === 0) {
            return;
        }
        
        try {
            const priceOfferIdList = await deleteData({"id": idList});
            handleSnackbarOpen('Označené cenové ponuky boli vymazané!', 'success');
          } catch (err) {
            handleSnackbarOpen('Označené cenové ponuky sa nepodarilo vymazať!', 'error');
            console.log(err);
            return;
        }

        return idList;
    };
   
    return {
        deletePriceOffer
    };
};

export default useDeletePriceOffer;
