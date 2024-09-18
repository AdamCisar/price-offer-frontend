const API_BASE_URL = process.env.REACT_APP_API_URL;

const ApiRoutes = {
    PRODUCTS: `${API_BASE_URL}/products`,
    USERS: `${API_BASE_URL}/users`,
    LOGIN: `${API_BASE_URL}/auth/login`,
    REGISTER: `${API_BASE_URL}/auth/register`,
};

export default ApiRoutes;
