import React, { useContext, useState } from 'react';
import { Card, CardActionArea, CardContent, CardMedia, Typography, Box } from '@mui/material';
import { styled } from '@mui/system';
import { PencilEditContext } from '../../providers/PencilEditProvider';
import { useLocation, useNavigate } from 'react-router-dom';
import Shimmer from '../styled_components/Shimmer';

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
  const [isLoading, setIsLoading] = useState(true);

  // Handler for when the image is fully loaded
  const handleImageLoad = () => {
    setIsLoading(false);
  };
  return (
    <BounceCard   
      onClick={() => {
              handleSelectClick(); 
              handlePriceOfferDetails();
            }} 
      isEditing={isEditing}
      sx={{ maxHeight: 320, minHeight: 320,}}
    >

      {isEditing && <CircleIndicator selected={selected} />}
      <CardActionArea sx={{ maxWidth: 200, minWidth: 200, textAlign: 'center', padding: 2 }}>
      <div style={{ position: 'relative' }}>
      {isLoading && (
        <Shimmer
          width="100%"
          height="200px"  // Adjust height to match your image dimensions
          borderRadius="8px"  // Same border radius as your image if applicable
        />
      )}

      <CardMedia
        component="img"
        image="/invoice_thumb.png"
        alt={props.title}
        style={{ display: isLoading ? 'none' : 'block' }}
        onLoad={handleImageLoad}  // Calls handler when image is fully loaded
      />
    </div>
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
