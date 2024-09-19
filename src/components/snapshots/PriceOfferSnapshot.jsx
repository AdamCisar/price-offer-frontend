import React from 'react';
import { Card, CardActionArea, CardContent, CardMedia, Typography } from '@mui/material';
import { styled } from '@mui/system';

const BounceCard = styled(Card)(({ theme }) => ({
  transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
  '&:hover': {
    transform: 'scale(1.05)',
    boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.2)',
  },
  cursor: 'pointer',
}));

const PriceOfferSnapshot = (props) => {
  const onClick = () => {
    console.log('clicked');
  }
  return (
    <BounceCard onClick={onClick} >
      <CardActionArea sx={{ maxWidth: 200, textAlign: 'center', padding: 2 }}>
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
            Price: ${props.price}
          </Typography>
        </CardContent>
      </CardActionArea>
    </BounceCard>
  );
};

export default PriceOfferSnapshot;
