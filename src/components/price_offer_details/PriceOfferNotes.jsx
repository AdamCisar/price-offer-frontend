import { useContext, useEffect, useRef, useState } from "react";
import { styled, Typography } from "@mui/material";
import { PriceOfferContext } from "../../providers/price_offer_providers/PriceOfferProvider";

const StyledTextArea = styled('textarea')(({ theme }) => ({
    resize: 'both',
    minWidth: '150px',
    minHeight: '50px',
    maxWidth: '500px',
    maxHeight: '800px',
    overflow: 'auto',
    fontSize: '16px',
    fontFamily: 'Arial, sans-serif',
    padding: '12px',
    borderRadius: '4px',
    border: '1px solid #ccc',
    boxShadow: '2px 2px 10px rgba(0, 0, 0, 0.1)',
    outline: 'none',
    transition: 'border 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
    scrollBehavior: 'smooth',
  
    '&:focus': {
      boxShadow: '0px 0px 14px rgba(70, 70, 70, 0.5)',
    },
}));

const PriceOfferNotes = () => {
    const{ priceOfferDetails, setPriceOfferDetails } = useContext(PriceOfferContext); 
    const [notes, setNotes] = useState(priceOfferDetails?.notes);
    const notesElement = useRef(null);
    const [scrollY, setScrollY] = useState(0);

    const setNoteToPriceOfferDetails = () => {
        if (priceOfferDetails.notes === notes) {
            return;
        }
        
        setPriceOfferDetails(prevData => ({
            ...prevData,
            notes: notes
        }))
    }

    useEffect(() => {
        const el = notesElement.current?.querySelector('textarea');
        
        if (!el) {
            return;
        }

        el.style.height = 'auto';
        el.style.height = `${el.scrollHeight}px`;

    }, [notes]);

    useEffect(() => {
        const handleScroll = () => {
            setScrollY(window.scrollY);
        };

        window.addEventListener('scroll', handleScroll);
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: 'smooth',
        });

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    useEffect(() => {
        if (!notesElement.current) {
            return;
        }
        
        notesElement.current.style.top = `${scrollY + 0.1}px`;
    }, [scrollY]);

    return (
        <div 
            ref={notesElement}
            style={{
                display: 'flex',
                position: 'relative',
                flexDirection: 'column',
                justifyContent: 'flex-start', 
                padding: '10px',
            }}
        >
            <Typography variant="h6">Poznámky</Typography>
            <StyledTextArea 
                name="notes"
                onChange={(e) => setNotes(e.target.value)}
                onBlur={setNoteToPriceOfferDetails}
                value={notes} 
            />
        </div>
    );
};

export default PriceOfferNotes;
