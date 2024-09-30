import React from "react";
import { Typography } from "@mui/material";

const UserInfo = React.memo(({userInfo}) => {
    return (
        <>
        <Typography variant="h6" sx={{ display: 'flex' ,justifyContent: 'center' }}>{userInfo?.name}</Typography>
        <Typography variant="h6" sx={{ display: 'flex' ,justifyContent: 'center' }}>{userInfo?.city}</Typography>
        <Typography variant="h6" sx={{ display: 'flex' ,justifyContent: 'center' }}>{userInfo?.address}</Typography>
        <Typography variant="h6" sx={{ display: 'flex' ,justifyContent: 'center' }}>{userInfo?.zip}</Typography>
        </>
    )
}, (prevProps, nextProps) => {
    return prevProps === nextProps;
})

export default UserInfo
