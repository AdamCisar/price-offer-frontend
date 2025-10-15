import { useContext, useState } from "react";
import { SnackBarContext } from "../providers/SnackBarProvider";
import useBroadcast from "./useBroadcast";
import ApiRoutes from '../configuration/api_routes/ApiRoutes';

const useUpdateItemPrices = () => {
    const { broadcastData, closeBroadcast } = useBroadcast("item-price-update");
    const [updatingItemPrices, setUpdatingItemPrices] = useState(false);
    const { handleSnackbarOpen } = useContext(SnackBarContext);

    if (broadcastData?.notification.body == 100) {
        setUpdatingItemPrices(false);
        closeBroadcast();
    }
    
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

    const updateItemPrices = async (itemIds, priceOfferId = undefined) => {
        setUpdatingItemPrices(true);

        const response = await fetchData({
            item_ids: itemIds,
            price_offer_id: priceOfferId
        });

        if (response.status === 409) {
            setUpdatingItemPrices(false);
            handleSnackbarOpen('Už prebieha iná aktualizácia cien!', 'warning');
            return;
        }

        handleSnackbarOpen('Začala sa aktualizácia cien!', 'info', null);
    }

    return {
        updatingItemPrices,
        updateItemPrices,
        eventData: broadcastData
    }
}

export default useUpdateItemPrices