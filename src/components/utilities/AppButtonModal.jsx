import React, { useRef } from 'react';
import { useState } from 'react';

const AppButtonModal = ({...props}) => {
    const [modalOpen, setModalOpen] = useState(false);
    const focusInputRef = useRef();

    const handleButtonClick = () => {
        setModalOpen(true);
        setTimeout(() => {
            if (focusInputRef.current) { 
                focusInputRef.current.focus();
            }
        });
    };

    const handleCloseModal = () => {
        setModalOpen(false);
    };

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
};

export default AppButtonModal;