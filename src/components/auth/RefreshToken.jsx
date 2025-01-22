import ApiRoutes from "../../configuration/api_routes/ApiRoutes";

const refreshToken = async () => {
    console.log('Refreshing token...');
    try {
        const response = await fetch(ApiRoutes["REFRESH"], {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem("token")}`,
            },
        });

        if (!response.ok) {
            console.error("Failed to refresh token");
            return;
        }
    
        const data = await response.json();
        localStorage.setItem("token", data.auth.token);
        console.log("Token refreshed successfully");
    } catch (error) {
        console.error("Error refreshing token:", error);
    }
};

let tokenCheckInterval = null;
export const checkExpiringToken = () => {
    if (tokenCheckInterval) {
        return;
    }

    const token = localStorage.getItem("token");

    if (!token) {
        return;
    }

    tokenCheckInterval = setInterval(() => {
        const expireTime = JSON.parse(atob(token.split(".")[1])).exp * 1000;
        const currentTime = Date.now();
        const timeLeft = expireTime - currentTime;

        if (timeLeft < 5 * 60 * 1000) {
            refreshToken();
        }
        
    }, 10000);

    return () => clearInterval(tokenCheckInterval);
};


