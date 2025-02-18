import React, { useContext, useEffect, useState } from 'react';
import { MenuItem } from '@mui/material';
import { PencilEditContext } from '../../providers/PencilEditProvider';
import { useLocation, useNavigate } from 'react-router-dom';
import Shimmer from '../styled_components/Shimmer';
import CardSkeleton from './CardSkeleton';
import DeleteIcon from '@mui/icons-material/Delete';
import AppButtonModal from '../utilities/AppButtonModal';
import PriceOfferModal from './PriceOfferModal';
import FileCopyIcon from '@mui/icons-material/FileCopy';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { SnackBarContext } from '../../providers/SnackBarProvider';
import { Edit } from '@mui/icons-material';
import GetProvider from '../../providers/ProviderFactory';
import ConfirmDialog from '../utilities/ConfirmDialog';
import invoiceThumb from "../../assets/invoice_thumb.png";

const PriceOfferSnapshot = ({ ...props }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [selected, setSelected] = useState(false);
  const { isEditing, handleSelected } = useContext(PencilEditContext);
  const { handleSnackbarOpen } = useContext(SnackBarContext);
  const { deleteFromContext } = GetProvider();

  const handleSelectClick = () => {
    if (!isEditing) {
      return;
    }

    handleSelected(props.id);
    setSelected((prev) => !prev);
  };

  const [isLoading, setIsLoading] = useState(true);

  const handleImageLoad = () => {
    setIsLoading(false);
  };

  const handleNothing = (event) => {
    event.stopPropagation();
    handleSnackbarOpen('Pracuje sa na tom 🛠️', 'info');
  };

  useEffect(() => {
    if (!isEditing) {
      return;
    }
    
    setIsLoading(true);
  }, [isEditing]); 
  
  if (isEditing) {
    return (
      <>
      <CardSkeleton
        textCallback={() => navigate(location.pathname + '/' + props.id)}
        innerContent={
          <div style={{ position: 'relative' }}>
            <AppButtonModal
              Button={MenuItem}
              InnerComponent={Edit}
              title="Upraviť"
              modalTitle="Úprava cenovej ponuky"
              submitButtonText="Upraviť"
              priceOfferValues={props}
              ModalComponent={PriceOfferModal}
              sx={{
                justifyContent: 'center', 
                alignItems: 'center',
                height: '60px',
                color: '#fff', 
                backgroundColor: '#3f51b5', '&:hover': {
                  backgroundColor: '#303f9f',
                },}}
              />
            <AppButtonModal
              Button={MenuItem}
              InnerComponent={FileCopyIcon}
              title="Duplikovať"
              modalTitle="Duplikovanie cenovej ponuky"
              submitButtonText="Duplikovať"
              duplicateFromId={props.id}
              ModalComponent={PriceOfferModal}
              sx={{
                justifyContent: 'center',
                alignItems: 'center',
                height: '60px',
                color: '#fff',
                backgroundColor: '#00bfae',
                '&:hover': {
                  backgroundColor: '#009688',
                },
              }}
            />
            <AppButtonModal
              Button={MenuItem}
              InnerComponent={DeleteIcon}
              ModalComponent={ConfirmDialog}
              onConfirm={() => deleteFromContext([props.id])}
              sx={{
                justifyContent: 'center',
                alignItems: 'center',
                height: '60px',
                color: '#fff',
                backgroundColor: '#ff6f61',
                '&:hover': {
                  backgroundColor: '#e64a3c',
                },
              }}
            />
            <MenuItem onClick={handleNothing} disableRipple 
              sx={{
                justifyContent: 'center',
                alignItems: 'center',
                height: '60px',
                color: '#fff',
                backgroundColor: '#9e9e9e',
                '&:hover': {
                  backgroundColor: '#616161',
                },
                marginBottom: '19px',
              }}
            >
              <MoreHorizIcon />
              Viac
            </MenuItem>
          </div>
        }
        {...props}
      />
    </>
    );
  }

  return (
    <CardSkeleton 
        cardCallback={() => {
          // handleSelectClick(); 
          navigate(location.pathname + '/' + props.id);
        }}
        isEditing={isEditing}
        innerContent={
          <div style={{ position: 'relative' }}>
            {isLoading && (
              <Shimmer
                width="100%"
                height="320px" 
                borderRadius="8px" 
              />
            )}

            <img
              src={invoiceThumb}
              alt={props.title}
              style={{
                position: 'relative',
                display: isLoading ? 'none' : 'block',
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                left: 9,
              }}
              onLoad={handleImageLoad} 
            />
          </div>
        }
        {...props}
    />
  );
};

export default PriceOfferSnapshot;
