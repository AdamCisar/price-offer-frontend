import { useContext } from "react";
import { PriceOfferContext } from "../providers/price_offer_providers/PriceOfferProvider";
import Loading from "../components/utilities/Loading";
import PriceOffer from "../components/price_offer_details/PriceOffer";

const PriceOfferDetails = () => {
    const { priceOffer, isLoading, error } = useContext(PriceOfferContext);
    
    return (
        <div>
            {isLoading ? (
                <Loading />
            ) : (
                <PriceOffer />
            )}
        </div>
    );
};

export default PriceOfferDetails;