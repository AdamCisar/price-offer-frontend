import { CircularProgress } from '@mui/material';
import React from 'react';

export default function Loading({ ...props }) {
    return (
        <div 
            style={{ 
                display: 'flex', 
                justifyContent: 'center', 
                alignItems: 'center', 
                height: props?.height ? props.height : '100vh' 
            }}>
            <CircularProgress />
        </div>
    );
}