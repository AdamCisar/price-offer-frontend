export const isTokenExpired = () => {
    const token = localStorage.getItem('token');
 
    if (typeof token === 'udefined' || !token || token.split(".").length !== 3) {
        return true; 
    }

    const [, payload] = token.split('.'); 
    const decodedPayload = JSON.parse(atob(payload));
  
    const currentTime = Math.floor(Date.now() / 1000); 
    return decodedPayload.exp < currentTime; 
};