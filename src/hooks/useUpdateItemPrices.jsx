import { useContext, useState } from "react";
import { SnackBarContext } from "../providers/SnackBarProvider";
import useBroadcast from "./useBroadcast";
import ApiRoutes from '../configuration/api_routes/ApiRoutes';

const useUpdateItemPrices = () => {
    const eventData = useBroadcast("item-price-update");
    const [updatingItemPrices, setUpdatingItemPrices] = useState(false);
    const { handleSnackbarOpen } = useContext(SnackBarContext);

    const fetchData = async (data) => {
        const response = await fetch(ApiRoutes['GET_UPDATED_ITEM_PRICES'], {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem("token")}`,
            },
            body: JSON.stringify(data),
        });

        return response;
    };

    const updateItemPrices = async (itemIds) => {
        setUpdatingItemPrices(true);

        const response = await fetchData({
            item_ids: itemIds
        });

        if (response.status === 409) {
            setUpdatingItemPrices(false);
            handleSnackbarOpen('Už prebieha iná aktualizácia cien!', 'warning');
            return;
        }

        handleSnackbarOpen('Ceny boli aktualizované!', 'success', null);
    }

    return {
        updatingItemPrices,
        updateItemPrices,
        eventData
    }
}

export default useUpdateItemPrices