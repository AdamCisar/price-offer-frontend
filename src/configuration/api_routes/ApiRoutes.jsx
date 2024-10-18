const API_BASE_URL = process.env.REACT_APP_BASE_URL + '/api/api';
export const IMAGES_FOLDER = process.env.REACT_APP_BASE_URL + '/images';

const ApiRoutes = {
    PRICE_OFFER: `${API_BASE_URL}/price-offers`,
    PRICE_OFFER_ITEM: `${API_BASE_URL}/price-offers/:priceOfferId/items`,
    PRICE_OFFER_CUSTOMER_SEARCH: `${API_BASE_URL}/price-offers/customers/search`,

    USER: `${API_BASE_URL}/users`,

    ITEM_SEARCH: `${API_BASE_URL}/items/search`,
    ITEM: `${API_BASE_URL}/items`,
    
    LOGIN: `${API_BASE_URL}/login`,
    LOGOUT: `${API_BASE_URL}/logout`,
};

export default ApiRoutes;
