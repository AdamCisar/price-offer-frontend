const API_BASE_URL = process.env.REACT_APP_API_URL + '/api';

const ApiRoutes = {
    PRICE_OFFER: `${API_BASE_URL}/price-offers`,
    PRICE_OFFER_ITEM: `${API_BASE_URL}/price-offers/:priceOfferId/items`,
    PRICE_OFFER_CUSTOMER_SEARCH: `${API_BASE_URL}/price-offers/customers/search`,

    USER: `${API_BASE_URL}/users`,

    ITEM_SEARCH: `${API_BASE_URL}/items/search`,
    ITEM: `${API_BASE_URL}/items`,
    
    LOGIN: `${API_BASE_URL}/auth/login`,
    REGISTER: `${API_BASE_URL}/auth/register`,
};

export default ApiRoutes;
