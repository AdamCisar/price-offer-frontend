import React, { useCallback, useRef } from 'react';
import { useState } from 'react';

const AppButtonModal = React.memo(({...props}) => {
    const [modalOpen, setModalOpen] = useState(false);
    const focusInputRef = useRef();

    const handleButtonClick = useCallback(() => {
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
        <div>
            <props.Button {...props.styles} sx={props.sx} onClick={handleButtonClick}>
                {props.title}
                {props.InnerComponent && <props.InnerComponent />}
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
    return prevProps === nextProps;
});

export default AppButtonModal;