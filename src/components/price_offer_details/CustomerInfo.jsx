import { TextField, Typography } from "@mui/material";
import React, { useContext, useRef } from "react";
import _ from 'lodash';
import { useSearch } from "../../api/Search";
import Loading from "../utilities/Loading";
import SearchedResultRow from "../styled_components/SearchedResultRow";
import styled, { css } from "styled-components";
import { SnackBarContext } from "../../providers/SnackBarProvider";

const CustomerInfo = React.memo(({customerInfo, setPriceOfferDetails}) => {
    const { searchedResults, setSearchedResults, debouncedSearch, isLoading, error } = useSearch("PRICE_OFFER_CUSTOMER_SEARCH");
      const { handleSnackbarOpen } = useContext(SnackBarContext);
    const searchTermRef = useRef('');
    const [customer, setCustomer] = React.useState(customerInfo);

    const handleSelectedCustomer = (customer) => {
        setCustomer({
            name: customer.name,
            address: customer.address,
            city: customer.city,
            zip: customer.zip
        })

        setPriceOfferDetails((prevData) => ({
            ...prevData,
            "customer": 
                {
                    name: customer.name,
                    address: customer.address,
                    city: customer.city,
                    zip: customer.zip
                }
        }));

        handleSnackbarOpen('Údaje o zákaznikovi boli vyplnené.', 'success');
        searchTermRef.current.value = '';
        setSearchedResults([]);
    };

    const handleCustomerInputChange = (event) => {
        const { name, value } = event.target;
        setCustomer({
          ...customer,
          [name]: value
        })
      };

    const setCustomerToPriceOfferDetails = () => {

        if (
            customer.name === customerInfo.name && 
            customer.address === customerInfo.address && 
            customer.city === customerInfo.city && 
            customer.zip === customerInfo.zip
        ) {
            return;
        }

        setPriceOfferDetails((prevData) => ({
            ...prevData,
            "customer": 
                {
                    name: customer.name,
                    address: customer.address,
                    city: customer.city,
                    zip: customer.zip
                }
        }));
    }

    return (
        <>
        <TextField
            fullWidth
            variant="outlined"
            placeholder="Vyhľadávanie zákazníkov: meno, adresa..."
            name="customer_search"
            inputRef={searchTermRef}
            onChange={(e) => {
                debouncedSearch(e);
              }}
            sx={{ marginBottom: 2 }}
        />

        {isLoading && searchedResults.length === 0 ? (
            <Loading height={'10vh'} />
        ) : (
            searchedResults && searchedResults.length > 0 ? (
            <div
                style={{
                    height: 300,
                    overflowY: 'auto',
                    justifyContent: 'center',
                    padding: '20px',
                    borderRadius: '4px',
                    border: '1px solid #ccc',
                    marginBottom: '20px',
                }}
            >
                <Typography variant="h6" gutterBottom sx={{ marginBottom: 2, color: '#333' }}>
                    Nájdení zákazníci:
                </Typography>
                  
                {searchedResults.map((customer, index) => (
                <SearchedResultRow
                    key={index}
                    onClick={() => handleSelectedCustomer(customer)}
                >
                    <Typography variant="body1" sx={{ fontWeight: 500 }}>
                        {customer.name}
                    </Typography>
                    <Typography variant="body2">
                        {customer.city} 
                        {' '}
                        {customer.address}
                    </Typography>
                    <Typography variant="body2">
                        {customer.zip}
                    </Typography>
                </SearchedResultRow>
                ))}
            </div>
        ) : (
            null
        )
        )}

        <TextField
            fullWidth
            variant="outlined"
            label="Meno"
            name="name"
            value={customer?.name || ''}
            onChange={handleCustomerInputChange}
            onBlur={setCustomerToPriceOfferDetails}
            sx={{ marginBottom: 2 }}
        />
        <TextField
            fullWidth
            variant="outlined"
            label="Mesto/Obec"
            name="city" 
            value={customer?.city || ''}
            onChange={handleCustomerInputChange}
            onBlur={setCustomerToPriceOfferDetails}
            sx={{ marginBottom: 2 }}
        />
        <TextField
            fullWidth
            variant="outlined"
            label="Adresa"
            name="address" 
            value={customer?.address || ''}
            onChange={handleCustomerInputChange}
            onBlur={setCustomerToPriceOfferDetails}
            sx={{ marginBottom: 2 }}
        />
        <TextField
            fullWidth
            variant="outlined"
            label="PSČ"
            name="zip" 
            value={customer?.zip || ''}
            onChange={handleCustomerInputChange}
            onBlur={setCustomerToPriceOfferDetails}
            sx={{ marginBottom: 2 }}
        />
        </>
    )
}, (prevProps, nextProps) => {
    return _.isEqual(prevProps.customerInfo, nextProps.customerInfo);
})

export default CustomerInfo