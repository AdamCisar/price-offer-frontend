import { TextField } from "@mui/material";
import React from "react";
import _ from 'lodash';


const CustomerInfo = React.memo(({customerInfo, handleCustomerInputChange}) => {
    console.log('rendered');
    return (
        <>
        <TextField
            fullWidth
            variant="outlined"
            label="Meno"
            name="name"
            value={customerInfo?.name || ''}
            onChange={handleCustomerInputChange}
            sx={{ marginBottom: 2 }}
        />
        <TextField
            fullWidth
            variant="outlined"
            label="Mesto/Obec"
            name="city" 
            value={customerInfo?.city || ''}
            onChange={handleCustomerInputChange}
            sx={{ marginBottom: 2 }}
        />
        <TextField
            fullWidth
            variant="outlined"
            label="Adresa"
            name="address" 
            value={customerInfo?.address || ''}
            onChange={handleCustomerInputChange}
            sx={{ marginBottom: 2 }}
        />
        <TextField
            fullWidth
            variant="outlined"
            label="PSČ"
            name="zip" 
            value={customerInfo?.zip || ''}
            onChange={handleCustomerInputChange}
            sx={{ marginBottom: 2 }}
        />
        </>
    )
}, (prevProps, nextProps) => {
    return _.isEqual(prevProps.customerInfo, nextProps.customerInfo);
})

export default CustomerInfo