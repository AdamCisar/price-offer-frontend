import { useContext, useState } from "react";
import { SnackBarContext } from "../providers/SnackBarProvider";

const useUpdateItemPrices = () => {
    const [updatingItemPrices, setUpdatingItemPrices] = useState(false);
    const { handleSnackbarOpen } = useContext(SnackBarContext);

    const updateItemPrices = (itemIds) => {
        setUpdatingItemPrices(true);

        if (1) {
            setUpdatingItemPrices(false);
            handleSnackbarOpen('Nastala chyba pri aktualizácii cien!', 'error');
            return;
        }

        setTimeout(() => {
        setUpdatingItemPrices(false);
        handleSnackbarOpen('Ceny boli aktualizované!', 'success', null);
        }, 1000);
    }


    return {
        updatingItemPrices,
        updateItemPrices
    }
}

export default useUpdateItemPrices