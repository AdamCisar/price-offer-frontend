const API_BASE_URL = process.env.REACT_APP_API_URL;

const ApiRoutes = {
    PRICE_OFFER: `${API_BASE_URL}/price-offers`,
    PRICE_OFFER_ITEM: `${API_BASE_URL}/price-offers/:priceOfferId/items`,

    USER: `${API_BASE_URL}/users`,

    PRODUCTS: `${API_BASE_URL}/products`,
    LOGIN: `${API_BASE_URL}/auth/login`,
    REGISTER: `${API_BASE_URL}/auth/register`,
};

export default ApiRoutes;
