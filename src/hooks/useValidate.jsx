const useValidate = (setFormData, formData) => {

    const validate = () => {
        let isValid = true;
        let errors = { ...formData.errors };

        for (let field in errors) {
            if (!formData[field]) {
                isValid = false;
                errors[field] = true;
            }
        }

        setFormData({
            ...formData,
            errors
        });

        return isValid;
    }

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
          ...formData,
          [name]: value,
          errors: {
            ...formData.errors,
            [name]: false,
          },
        });
    };

    return {
        validate,
        handleInputChange,
        errors: formData.errors,
    };
};

export default useValidate;
