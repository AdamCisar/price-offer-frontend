import { useContext, useEffect } from "react";
import { PriceOfferContext } from "../providers/price_offer_providers/PriceOfferProvider";
import Loading from "../components/utilities/Loading";
import PriceOffer from "../components/price_offer_details/PriceOffer";
import NotificationAlert from "../components/utilities/NotificationAlert";

const PriceOfferDetails = () => {
    const { isLoading } = useContext(PriceOfferContext);

    return (
        <div>
            {isLoading ? (
                <Loading />
            ) : (
                <>
                    <NotificationAlert />
                    <PriceOffer />
                </>
            )}
        </div>
    );
};

export default PriceOfferDetails;