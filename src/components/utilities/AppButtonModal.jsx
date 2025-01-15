import React, { useCallback, useRef } from 'react';
import { useState } from 'react';
import _ from 'lodash';

const AppButtonModal = React.memo(({...props}) => {
    const [modalOpen, setModalOpen] = useState(false);
    const focusInputRef = useRef();

    const handleButtonClick = useCallback((event) => {
        setModalOpen(true);
        const timer = setTimeout(() => {
          focusInputRef.current?.focus(); 
        }, 0);
    
        return () => clearTimeout(timer);
    }, []);
    
    const handleCloseModal = useCallback(() => {
        setModalOpen(false);
      }, []);

    return (
        <div style={{...props.divStyles}}>
            <props.Button {...props.styles} sx={props.sx} onClick={handleButtonClick}>
                {props.InnerComponent && <props.InnerComponent />}
                {props.title}
            </props.Button>
            
            <props.ModalComponent 
                open={modalOpen}
                onClose={handleCloseModal}
                focusInputRef={focusInputRef}
                {...props}
            />
        </div>
    );
}, (prevProps, nextProps) => {
    return _.isEqual(prevProps, nextProps);
});

export default AppButtonModal;