import { useContext } from "react";
import { useUniversalDelete } from "../api/UniversalDelete";
import { SnackBarContext } from "../providers/SnackBarProvider";

const useDeleteItem = () => {
    const [deleteData, isLoading, error] = useUniversalDelete("ITEM");
    const { handleSnackbarOpen } = useContext(SnackBarContext);

    const deleteItem = async (idList) => {
        if (idList.length === 0) {
            return;
        }
        
        try {
            const priceOfferIdList = await deleteData({"id": idList});
            handleSnackbarOpen('Označené položky boli vymazané!', 'success');
          } catch (err) {
            handleSnackbarOpen('Označené položky sa nepodarilo vymazať!', 'error');
            console.log(err);
            return;
        }

        return idList;
    };
   
    return {
        deleteItem
    };
};

export default useDeleteItem;
