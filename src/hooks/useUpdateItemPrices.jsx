import { useContext, useEffect, useRef, useState } from "react";
import { SnackBarContext } from "../providers/SnackBarProvider";
import useBroadcast from "./useBroadcast";
import ApiRoutes from '../configuration/api_routes/ApiRoutes';

const useUpdateItemPrices = () => {
    const { handleSnackbarOpen } = useContext(SnackBarContext);
    
    const { broadcastData, closeBroadcast } = useBroadcast("item-price-update");

    const [updatingItemPrices, setUpdatingItemPrices] = useState(!!broadcastData);
    const [broadcastError, setBroadcastError] = useState(false);
    const finished = useRef(false);

    useEffect(() => {
        setUpdatingItemPrices(!!broadcastData);
    }, [broadcastData]);

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

    const updateItemPrices = async (data) => {
        if (!data.item_ids || data.item_ids.length === 0) {
            setBroadcastError(true);
            setTimeout(() => {
                setBroadcastError(false);
            }, 500);
            return;
        }

        setUpdatingItemPrices(true);

        const response = await fetchData(data);

        if (response.status === 409) {
            setUpdatingItemPrices(false);
            handleSnackbarOpen('Už prebieha iná aktualizácia cien!', 'warning');
            return;
        }

        handleSnackbarOpen('Začala sa aktualizácia cien!', 'info');
    }
 
    if (broadcastData?.percentage === 100 && !finished.current) {
        finished.current = true;
        setTimeout(() => {
            closeBroadcast();
            setUpdatingItemPrices(false);
            handleSnackbarOpen('Ceny boli aktualizované!', 'success');
        }, 1000);
    }

    return {
        updatingItemPrices,
        updateItemPrices,
        broadcastData,
        broadcastError
    }
}

export default useUpdateItemPrices