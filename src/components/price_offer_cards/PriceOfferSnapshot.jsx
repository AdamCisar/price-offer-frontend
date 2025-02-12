import React, { useContext, useState } from 'react';
import { Card, CardActionArea, CardContent, CardMedia, Typography, Box, MenuItem } from '@mui/material';
import { styled } from '@mui/system';
import { PencilEditContext } from '../../providers/PencilEditProvider';
import { useLocation, useNavigate } from 'react-router-dom';
import Shimmer from '../styled_components/Shimmer';
import DottedMenu from '../utilities/DottedMenu';
import AppButtonModal from '../utilities/AppButtonModal';
import PriceOfferModal from './PriceOfferModal';
import FileCopyIcon from '@mui/icons-material/FileCopy';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { SnackBarContext } from '../../providers/SnackBarProvider';
import { Edit } from '@mui/icons-material';
import CheckIcon from '../utilities/CheckIcon';

const PriceOfferSnapshot = ({ ...props }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [selected, setSelected] = useState(false);
  const { isEditing, handleSelected } = useContext(PencilEditContext);
  const {handleSnackbarOpen} = React.useContext(SnackBarContext);

  const handleSelectClick = () => {
    if (!isEditing) {
      return;
    }

    handleSelected(props.id);
    setSelected((prev) => !prev);
  };

  const handlePriceOfferDetails = () => {
    if (isEditing) {
      return;
    }
    navigate(location.pathname + '/' + props.id);
  };
  const [isLoading, setIsLoading] = useState(true);

  const handleImageLoad = () => {
    setIsLoading(false);
  };
  
  const handleNothing = (event) => {
    event.stopPropagation();
    handleSnackbarOpen('Pracuje sa na tom 🛠️', 'info');
  };

  return (
    <div style={{ position: 'relative' }}>
      {!isEditing && 
      
      <DottedMenu 
        props={props}
        list={[
              <AppButtonModal
                Button={MenuItem}
                InnerComponent={Edit}
                title="Upraviť"
                modalTitle="Úprava cenovej ponuky"
                submitButtonText="Upraviť"
                priceOfferValues={props}
                ModalComponent={PriceOfferModal}
              />,
              <AppButtonModal
                Button={MenuItem}
                InnerComponent={FileCopyIcon}
                title="Duplikovať"
                modalTitle="Duplikovanie cenovej ponuky"
                submitButtonText="Duplikovať"
                duplicateFromId={props.id}
                ModalComponent={PriceOfferModal}
              />,
            <MenuItem onClick={handleNothing} disableRipple>
              <MoreHorizIcon />
              Viac
            </MenuItem>,
        ]}        

      />}

    <BounceCard
      onClick={() => {
              handleSelectClick(); 
              handlePriceOfferDetails();
            }} 
      isEditing={isEditing}
      sx={{ maxHeight: 320, minHeight: 320 }}
    >

    {isEditing && <div style={{ position: 'absolute', top: 5, right: 5 }}><CheckIcon selected={selected} /></div>}
    
    <CardActionArea sx={{ maxWidth: 200, minWidth: 200, textAlign: 'center', padding: 2 }}>
    <div style={{ position: 'relative' }}>
      {isLoading && (
        <Shimmer
          width="100%"
          height="200px" 
          borderRadius="8px" 
        />
      )}

      <CardMedia
        component="img"
        image="/invoice_thumb.png"
        alt={props.title}
        style={{ display: isLoading ? 'none' : 'block' }}
        onLoad={handleImageLoad} 
      />
    </div>
        <CardContent  style={{ padding: 0 }}>
          <Typography gutterBottom variant="h6" component="div" style={{ fontSize: 16 }}>
            {props.title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {props.description}
          </Typography>
        </CardContent>
      </CardActionArea>
    </BounceCard>
    </div>
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

export default PriceOfferSnapshot;
