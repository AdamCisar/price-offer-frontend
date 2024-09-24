import React, { useContext } from 'react';
import { Box } from '@mui/material';
import { styled } from '@mui/system';
import { PencilEditContext } from '../../providers/PencilEditProvider';
import { PriceOfferListContext } from '../../providers/PriceOfferListProvider';

const TrashCan = () => {
    const { selectedCards, setSelectedCards } = useContext(PencilEditContext);
    const { deleteFromPriceOfferList } = useContext(PriceOfferListContext);

  return (
    <TrashBox className="trash-box" 
              onClick={() => {
                        deleteFromPriceOfferList(selectedCards);
                        setSelectedCards([]);
                      }}
    >
      <Trash className="trash" />
      <TrashTop className="trash-top" />
      <TrashBtm className="trash-btm">
        <TrashLines className="trash-lines">
          <TrashLine className="trash-line" />
          <TrashLine className="trash-line" />
        </TrashLines>
      </TrashBtm>
    </TrashBox>
  );
};

const trashColor1 = 'grey';
const trashColor3 = 'white';
const transition = 'all 0.2s ease-in-out';

const TrashBox = styled(Box)(({ theme }) => ({
  width: '30px',
  height: '30px',
  position: 'relative',
  '&:hover .trash-top': {
    transform: 'translate(-50%, -15%) rotate(-20deg)',
  },
  '&:hover .trash-btm': {
    transform: 'translate(-50%, -100%) rotate(5deg)',
  },
  '&:hover .trash': {
    top: '50%',
    transform: 'translate(-42%, -50%) rotate(35deg)',
  },
  'cursor': 'pointer',
}));

const TrashTop = styled(Box)(({ theme }) => ({
  position: 'absolute',
  top: '15%',
  left: '50%',
  transform: 'translate(-50%, -15%)',
  width: '80%',
  height: '15%',
  background: trashColor1,
  borderRadius: '5px',
  transformOrigin: 'left bottom',
  transition,
  '&::before': {
    content: '""',
    position: 'absolute',
    bottom: '95%',
    left: '50%',
    transform: 'translate(-50%)',
    width: '30%',
    height: '80%',
    background: trashColor1,
    borderRadius: '5px 5px 0 0',
  },
}));

const TrashBtm = styled(Box)(({ theme }) => ({
  position: 'absolute',
  top: '100%',
  left: '50%',
  transform: 'translate(-50%, -100%)',
  width: '70%',
  height: '65%',
  background: trashColor1,
  borderRadius: '5px',
  transformOrigin: 'left 70%',
  transition,
}));

const TrashLines = styled(Box)(({ theme }) => ({
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '60%',
  height: '80%',
  display: 'flex',
  justifyContent: 'space-around',
}));

const TrashLine = styled(Box)(({ theme }) => ({
  width: '20%',
  height: '100%',
  background: 'white', 
  borderRadius: '3px',
}));

const Trash = styled(Box)(({ theme }) => ({
  position: 'absolute',
  top: '80%',
  left: '38%',
  transform: 'translate(-38%, -80%) rotate(35deg)',
  width: '40%',
  height: '40%',
  background: trashColor3,
  borderRadius: '2px',
  transition,
  '&::before': {
    content: '""',
    position: 'absolute',
    transform: 'translate(30%, -20%) rotate(25deg)',
    width: '100%',
    height: '100%',
    background: 'white', 
    borderRadius: '2px',
  },
}));

export default TrashCan;
