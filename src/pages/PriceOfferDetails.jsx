import { useContext } from "react";
import { PriceOfferContext } from "../providers/price_offer_providers/PriceOfferProvider";
import Loading from "../components/Loading";

const PriceOfferDetails = () => {
    const { priceOffer, isLoading, error } = useContext(PriceOfferContext);
    
    return (
        <div>
            {isLoading ? (
                <Loading />
            ) : (
                priceOffer && (
                    <div>
                        <h1>{priceOffer.title}</h1>
                        <p>{priceOffer.price}</p>
                    </div>
                )
            )}
        </div>
    );
};

export default PriceOfferDetails;