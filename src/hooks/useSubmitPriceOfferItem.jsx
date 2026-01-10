import { useContext, useState } from "react";
import { useUniversalPost } from "../api/UniversalPost";
import { SnackBarContext } from "../providers/SnackBarProvider";
import { PriceOfferContext } from "../providers/price_offer_providers/PriceOfferProvider";
import useValidate from "./useValidate";
import { isArray } from "lodash";

const initialState = {
    title: "",
    price: "",
    unit: "",
    url: "",
    errors: {
        title: false,
        price: false,
    }
};

const useSubmitPriceOfferItem = (onClose) => {
    
    const [formData, setFormData] = useState(initialState);
    const { handleSnackbarOpen } = useContext(SnackBarContext);
    const { priceOfferDetails, setPriceOfferDetails } = useContext(PriceOfferContext);
    const [sendData, isLoading, error] = useUniversalPost("ITEM");
    const { validate, handleInputChange, errors } = useValidate(setFormData, formData);

    const handleSubmit = async () => {
        
        if (!validate()) {
            return;
        }

        try {
            const priceOfferItem = await sendData({
              title: formData.title,
              unit: formData.unit,
              price: formData.price,
              url: [{'shop': 'ptacek', 'url': formData.ptacek}]
            });
            
            priceOfferItem.item_id = priceOfferItem.id;

            addPriceOfferItemToContext(priceOfferItem);
            setFormData(initialState);
            handleSnackbarOpen('Položka bola vytvorená!', 'success');
            onClose();
          } catch (err) {
            handleSnackbarOpen('Položku sa nepodarilo vytvoriť!', 'error');
            console.log(err);
        }
    };

    /**
     * Add price offer item/items to context
     * 
     * @param {object|object[]} priceOfferItems
     */
    const addPriceOfferItemToContext = (priceOfferItems) => {

        if (!priceOfferItems) {
            return false;
        }

        const itemsList = isArray(priceOfferItems) ? priceOfferItems : [priceOfferItems];
        
        let filteredOutItems = [];
        const filteredItems = itemsList.filter(priceOfferItem => {
            if (priceOfferDetails.items?.find(item => item.item_id === priceOfferItem.item_id)) {
                filteredOutItems[priceOfferItem.item_id] = priceOfferItem;
                return false;
            }
          
            if (!priceOfferItem.quantity) {
              priceOfferItem.quantity = 1;
            }
          
            if (!priceOfferItem.total) {
              priceOfferItem.total = priceOfferItem.price;
            }

            return true;
        });

        if (filteredItems.length) {
            setPriceOfferDetails((prevData) => ({
              ...prevData,
              'items': [...(prevData?.items || []), ...filteredItems],
            }));
        }

        return filteredOutItems;
    };

    return {
        handleSubmit,
        handleInputChange,
        addPriceOfferItemToContext,
        errors: formData.errors,
        isLoading
    };
};

export default useSubmitPriceOfferItem;
