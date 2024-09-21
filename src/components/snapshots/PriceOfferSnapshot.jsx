import React, { useContext, useState } from 'react';
import { Card, CardActionArea, CardContent, CardMedia, Typography, Box } from '@mui/material';
import { styled } from '@mui/system';
import { PencilEditContext } from '../../providers/PencilEditProvider';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const PriceOfferSnapshot = ({ ...props }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [selected, setSelected] = useState(false);
  const { isEditing, handleSelectedPriceOfferCard } = useContext(PencilEditContext);

  const handleSelectClick = () => {
    if (!isEditing) {
      return;
    }

    handleSelectedPriceOfferCard(props.id);
    setSelected((prev) => !prev);
  };

  const handlePriceOfferDetails = () => {
    if (isEditing) {
      return;
    }
    navigate(location.pathname + '/' + props.id);
  };

  return (
    <BounceCard   onClick={() => {
                          handleSelectClick(); 
                          handlePriceOfferDetails();
                        }} 
                  isEditing={isEditing}>

      {isEditing && <CircleIndicator selected={selected} />}
      <CardActionArea sx={{ maxWidth: 200, minWidth: 200, maxHeight: 350, minHeight: 350, textAlign: 'center', padding: 2 }}>
        <CardMedia
          component="img"
          image='/invoice_thumb.png'
          alt={props.title}
        />
        <CardContent>
          <Typography gutterBottom variant="h6" component="div">
            {props.title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {props.description}
          </Typography>
        </CardContent>
      </CardActionArea>
    </BounceCard>
  );
};

const BounceCard = styled(Card, {
  shouldForwardProp: (prop) => prop !== 'isEditing',
    })(({ theme, isEditing }) => ({
      transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
      cursor: 'pointer',
      position: 'relative',
      ...(isEditing ? {} : {
        '&:hover': {
          transform: 'scale(1.05)',
          boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.2)',
        },
      }),
}));


const CircleIndicator = styled(Box)(({ selected }) => ({
  width: 20,
  height: 20,
  borderRadius: '50%',
  backgroundColor: selected ? '#1976d2' : "#bbb",
  position: 'absolute',
  top: 10,
  right: 10,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
}));

export default PriceOfferSnapshot;
