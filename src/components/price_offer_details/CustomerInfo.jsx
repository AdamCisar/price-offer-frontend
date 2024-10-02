import { Box, TextField, Typography } from "@mui/material";
import React, { useEffect, useMemo, useState } from "react";
import _, { debounce } from 'lodash';
import { useSearch } from "../../api/Search";
import Loading from "../utilities/Loading";
import styled from "styled-components";

const CustomerRow = styled('div')(({ theme }) => ({
    display: 'flex',
    justifyContent: 'space-between',
    padding: '10px',
    margin: 'auto',
    marginBottom: '10px',
    width: '95%',
    alignItems: 'center',
    borderRadius: '10px',
    cursor: 'pointer',
    border: '1px solid #ccc',
    transition: 'background-color 0.3s ease',
    '&:hover': {
      backgroundColor: 'black',
      color: 'white',
    },
  }));

const CustomerInfo = React.memo(({customerInfo, handleCustomerInputChange}) => {
    const [search, isLoading, error] = useSearch("PRICE_OFFER_CUSTOMER_SEARCH");
    const [customers, setCustomers] = useState([]);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
      if (customers.length > 0) {
        const timer = setTimeout(() => setIsVisible(true), 100);
        return () => clearTimeout(timer); 
      } else {
        setIsVisible(false);
      }
    }, [customers]);
    
    const handleCustomersSearch = async (e) => {
        const customers = await search(e.target.value);
        setCustomers(customers);
      };
    
      const debouncedResults = useMemo(() => {
        return debounce(handleCustomersSearch, 400);
      }, []);
    
      useEffect(() => {
        return () => {
          debouncedResults.cancel();
        };
      }, [debouncedResults]);

    return (
        <>
        {isLoading && customers.length === 0 ? (
            <Loading height={'10vh'} />
        ) : (
        customers && customers.length > 0 ? (
            <div
            style={{
                padding: '20px',
                borderRadius: '8px',
                backgroundColor: '#f0f0f0',
                marginBottom: '20px',
            }}
            >
            <Box
                sx={{
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? 'translateY(0)' : 'translateY(10px)',
                transition: 'opacity 0.5s ease, transform 0.5s ease',
                padding: '20px',
                borderRadius: '8px',
                backgroundColor: '#f0f0f0',
                marginBottom: '20px',
                }}
                >
                <Typography variant="h6" gutterBottom sx={{ marginBottom: 2, color: '#333' }}>
                Nájdení zákazníci:
                </Typography>
                {customers.map((customer, index) => (
                <CustomerRow
                    key={index}
                >
                    <Typography variant="body1" sx={{ fontWeight: 500 }}>
                    {customer.name}
                    </Typography>
                    <Typography variant="body2">
                    {customer.city}
                    </Typography>
                    <Typography variant="body2">
                    {customer.address}
                    </Typography>
                </CustomerRow>
                ))}
            </Box>
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
                debouncedResults(e);
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