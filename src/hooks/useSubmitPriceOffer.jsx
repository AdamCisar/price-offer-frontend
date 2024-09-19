import { useState } from "react";

const useSubmitPriceOffer = (onSubmit, onClose) => {
    const initialState = {
        title: "",
        description: "",
        errors: {
            titleError: false,
            descriptionError: false,
        }
      };

    const [formData, setFormData] = useState(initialState);

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

    const handleSubmit = () => {
        
        if (!validate()) {
            return;
        }

        setFormData(initialState);
        onClose();
        // onSubmit({ title: state.title, description: state.description });
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
    };
};

export default useSubmitPriceOffer;
