import { createContext, useEffect, useState } from "react";
import { useUniversalGet } from "../api/UniversalGet";
import Tutorial from "../components/utilities/Tutorial";

export const UserInfoContext = createContext(null);

export function UserInfoProvider ({ children }) {
    const [user, isLoading, error] = useUniversalGet("USER");
    const [userInfo, setUserInfo] = useState({});

    useEffect(() => {
        setUserInfo(user);
    }, [user]);

    return (
        <UserInfoContext.Provider value={{ userInfo, setUserInfo, isLoading, error }}>
        <>
            {children}
            
            {!isLoading && userInfo && (
                <Tutorial />
            )}
        </>
        </UserInfoContext.Provider>
    );
}
