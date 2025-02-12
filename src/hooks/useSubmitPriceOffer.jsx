import { useContext, useState } from "react";
import { useUniversalPost } from "../api/UniversalPost";
import { SnackBarContext } from "../providers/SnackBarProvider";
import useValidate from "./useValidate";

const initialState = {
    title: "",
    description: "",
    errors: {
        title: false,
        description: false
    }
};

const useSubmitPriceOffer = (onClose, addToPriceOfferList, duplicateFromId = undefined, priceOfferId = undefined) => {
    
    const [formData, setFormData] = useState(initialState);
    const { handleSnackbarOpen } = useContext(SnackBarContext);
    const [sendData, isLoading, error] = useUniversalPost("PRICE_OFFER");
    const { validate, handleInputChange, errors } = useValidate(setFormData, formData);

    const handleSubmit = async () => {
        
        if (!validate() || priceOfferId) {
            return;
        }

        try {
            const priceOffer = await sendData({
                id: priceOfferId,
                title: formData.title,
                description: formData.description,
                duplicateFromId: duplicateFromId
            });

            handleSnackbarOpen(`Cenová ponuka bola ${priceOfferId ? 'upravená' : 'vytvorená'}!`, 'success');
            addToPriceOfferList(priceOffer);
            setFormData(initialState);
            onClose();
          } catch (err) {
            handleSnackbarOpen(`Cenovú ponuku sa nepodarilo ${priceOfferId ? 'upraviť' : 'vytvoriť'}!`, 'error');
            console.log(err);
        }
    };

    return {
        handleSubmit,
        handleInputChange,
        errors: formData.errors,
        isLoading
    };
};

export default useSubmitPriceOffer;
