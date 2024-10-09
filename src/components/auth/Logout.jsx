import React from 'react';
import LogoutIcon from '@mui/icons-material/Logout'; 
import { useUniversalPost } from '../../api/UniversalPost';
import { useNavigate } from "react-router-dom";
import Loading from '../utilities/Loading';

const Logout = () => {
    const navigate = useNavigate();
    const [sendData, isLoading, error] = useUniversalPost("LOGOUT");

    const onLogout = async (e) => {
        e.preventDefault();

        try {
            await sendData({})
 
            localStorage.removeItem("token");
            localStorage.removeItem("userId");

            navigate("/prihlasenie");
        } catch (error) {
            console.log(error);
        }
    };

    if (isLoading) {
        return <Loading />;
    }

    return (
        <div onClick={onLogout} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', cursor: 'pointer' }}>
            <LogoutIcon />
        </div>
    );
};

export default Logout;
