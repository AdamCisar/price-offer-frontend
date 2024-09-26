import { useContext, useState } from "react";
import { useUniversalPost } from "../api/UniversalPost";
import { SnackBarContext } from "../providers/SnackBarProvider";
import useValidate from "./useValidate";

const initialState = {
    title: "",
    description: "",
    errors: {
        title: false,
        description: false,
    }
};

const useSubmitPriceOffer = (onClose, addToPriceOfferList) => {
    
    const [formData, setFormData] = useState(initialState);
    const { handleSnackbarOpen } = useContext(SnackBarContext);
    const [sendData, isLoading, error] = useUniversalPost("PRICE_OFFER");
    const { validate, handleInputChange, errors } = useValidate(onClose, addToPriceOfferList, initialState, setFormData, formData);

    const handleSubmit = async () => {
        
        if (!validate()) {
            return;
        }

        try {
            const priceOffer = await sendData({
              title: formData.title,
              description: formData.description,
            });

            handleSnackbarOpen('Cenová ponuka bola vytvorená!', 'success');
            addToPriceOfferList(priceOffer);
            setFormData(initialState);
            onClose();
          } catch (err) {
            handleSnackbarOpen('Cenovú ponuku sa nepodarilo vytvoriť!', 'error');
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
