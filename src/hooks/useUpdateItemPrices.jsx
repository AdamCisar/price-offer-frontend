import { useContext, useEffect, useState } from "react";
import { SnackBarContext } from "../providers/SnackBarProvider";
import useBroadcast from "./useBroadcast";
import ApiRoutes from '../configuration/api_routes/ApiRoutes';
import { PriceOfferContext } from "../providers/price_offer_providers/PriceOfferProvider";

const useUpdateItemPrices = () => {
    const { handleSnackbarOpen } = useContext(SnackBarContext);
    const { setPriceOfferDetails } = useContext(PriceOfferContext);
    const { broadcastData, closeBroadcast } = useBroadcast("item-price-update");
    const [updatingItemPrices, setUpdatingItemPrices] = useState(!!broadcastData);
    const [finished, setFinished] = useState(false);

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
        setUpdatingItemPrices(true);

        const response = await fetchData(data);

        if (response.status === 409) {
            setUpdatingItemPrices(false);
            handleSnackbarOpen('Už prebieha iná aktualizácia cien!', 'warning');
            return;
        }

        handleSnackbarOpen('Začala sa aktualizácia cien!', 'info');
    }

    if (broadcastData?.percentage === 100 && !finished) {
        setFinished(true);
        setTimeout(() => {
            setFinished(false);
            closeBroadcast();
            setUpdatingItemPrices(false);
            handleSnackbarOpen('Ceny boli aktualizované!', 'success');

            setPriceOfferDetails(prevData => ({
                ...prevData,
                items: prevData?.items.map(item => ({
                    ...item,
                    price: item.price * 1.10,
                })),
            }));
        }, 1000);
    }

    return {
        updatingItemPrices,
        updateItemPrices,
        broadcastData
    }
}

export default useUpdateItemPrices