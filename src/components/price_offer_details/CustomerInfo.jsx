import { TextField, Typography } from "@mui/material";
import React, { useContext, useRef } from "react";
import _ from 'lodash';
import { useSearch } from "../../api/Search";
import Loading from "../utilities/Loading";
import SearchedResultRow from "../styled_components/SearchedResultRow";
import styled, { css } from "styled-components";

const CustomersDivWrapper = styled('div')(
    ({ theme }) => css`
    padding: '20px';
    borderRadius: '8px';
    backgroundColor: '#f0f0f0';
    marginBottom: '20px';
    `
);

const CustomerInfo = React.memo(({customerInfo, setPriceOfferDetails, handleCustomerInputChange, handleSnackbarOpen}) => {
    const { searchedResults, setSearchedResults, debouncedSearch, isLoading, error } = useSearch("PRICE_OFFER_CUSTOMER_SEARCH");
    const searchTermRef = useRef('');

    const handleSelectedCustomer = (customer) => {
        setPriceOfferDetails((prevData) => ({
            ...prevData,
            "customer": 
                {
                    id: prevData.customer.id,
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
                padding: '20px',
                borderRadius: '8px',
                backgroundColor: '#f0f0f0',
                marginBottom: '20px',
            }}
            >
            <CustomersDivWrapper>
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
            </CustomersDivWrapper>
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
            value={customerInfo?.name || ''}
            onChange={(e) => {
                handleCustomerInputChange(e);
              }}
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