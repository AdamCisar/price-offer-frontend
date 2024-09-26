import { useContext, useState } from "react";
import { useUniversalPost } from "../api/UniversalPost";
import { SnackBarContext } from "../providers/SnackBarProvider";
import useValidate from "./useValidate";

const initialState = {
    title: "",
    price: "",
    unit: "",
    errors: {
        title: false,
        price: false,
    }
};

const useSubmitPriceOfferItem = (onClose, setPriceOfferDetails) => {
    
    const [formData, setFormData] = useState(initialState);
    const { handleSnackbarOpen } = useContext(SnackBarContext);
    const [sendData, isLoading, error] = useUniversalPost("ITEM");
    const { validate, handleInputChange, errors } = useValidate(onClose, setPriceOfferDetails, initialState, setFormData, formData);

    const handleSubmit = async () => {
        
        if (!validate()) {
            return;
        }

        try {
            const priceOfferItem = await sendData({
              title: formData.title,
              unit: formData.unit,
              price: formData.price,
            });

            if (!priceOfferItem.quantity) {
                priceOfferItem.quantity = 1;
            }

            if (!priceOfferItem.total) {
                priceOfferItem.total = priceOfferItem.price;
            }

            handleSnackbarOpen('Položka bola vytvorená!', 'success');
            setPriceOfferDetails((prevData) => ({
              ...prevData,
              'items': [...prevData['items'], priceOfferItem],
            }));
            setFormData(initialState);
            onClose();
          } catch (err) {
            handleSnackbarOpen('Položku sa nepodarilo vytvoriť!', 'error');
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

export default useSubmitPriceOfferItem;
