import React from 'react';
import LogoutIcon from '@mui/icons-material/Logout'; 
import { useUniversalPost } from '../../api/UniversalPost';
import { useNavigate } from "react-router-dom";
import Loading from '../utilities/Loading';
import styled from 'styled-components';

const PendingDots = styled('div')`
    width: 60px;
    position: absolute;
    top: 30px;
    left: 50%;
    aspect-ratio: 4;
    --_g: no-repeat radial-gradient(circle closest-side, #fff 90%, #0000);
    background: 
      var(--_g) 0%   50%,
      var(--_g) 50%  50%,
      var(--_g) 100% 50%;
    background-size: calc(100%/3) 100%;
    animation: l7 1s infinite linear;
  @keyframes l7 {
      33%{background-size:calc(100%/3) 0%  ,calc(100%/3) 100%,calc(100%/3) 100%}
      50%{background-size:calc(100%/3) 100%,calc(100%/3) 0%  ,calc(100%/3) 100%}
      66%{background-size:calc(100%/3) 100%,calc(100%/3) 100%,calc(100%/3) 0%  }
  }
`;

const Logout = () => {
    const navigate = useNavigate();
    const [sendData, isLoading, error] = useUniversalPost("LOGOUT");

    const onLogout = async (e) => {
        e.preventDefault();

        try {
            await sendData({})
 
            localStorage.removeItem("token");

            navigate("/prihlasenie");
        } catch (error) {
            console.log(error);
        }
    };

    if (isLoading) {
        if (!!localStorage.getItem('token')) {
            return <PendingDots />
        }

        return <Loading />
    }

    return (
        <div onClick={onLogout} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', cursor: 'pointer' }}>
            <LogoutIcon />
        </div>
    );
};

export default Logout;
