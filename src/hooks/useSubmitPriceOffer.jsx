import { useState } from "react";
import { useUniversalPost } from "../api/UniversalPost";

const useSubmitPriceOffer = (onClose, addToPriceOfferList) => {
    const initialState = {
        title: "",
        description: "",
        errors: {
            titleError: false,
            descriptionError: false,
        }
      };

    const [formData, setFormData] = useState(initialState);
    const [sendData, isLoading, error] = useUniversalPost("PRICE_OFFER");

    const validate = () => {
        let isValid = true;
        let errors = { ...formData.errors };

        if (!formData.title) {
            isValid = false;
            errors.titleError = true;
        }

        if (!formData.description) {
            isValid = false;
            errors.descriptionError = true;
        }

        setFormData({
            ...formData,
            errors
        });

        return isValid;
    }

    const handleSubmit = async () => {
        
        if (!validate()) {
            return;
        }

        try {
            const priceOffer = await sendData({
              title: formData.title,
              description: formData.description,
            });

            addToPriceOfferList(priceOffer);
            setFormData(initialState);
            onClose();
          } catch (err) {
            console.log(err);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
          ...formData,
          [name]: value,
          errors: {
            ...formData.errors,
            [`${name}Error`]: false,
          },
        });
    };

    return {
        handleSubmit,
        handleInputChange,
        errors: formData.errors,
        isLoading
    };
};

export default useSubmitPriceOffer;
