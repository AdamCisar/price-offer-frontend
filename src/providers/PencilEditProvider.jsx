import React, { useState } from 'react';
import useDeletePriceOffer from '../hooks/useDeletePriceOffer';

export const PencilEditContext = React.createContext(null);

export const PencilEditProvider = ({ children }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [selectedCards, setSelectedCards] = useState([]);
  const { deletePriceOffer } = useDeletePriceOffer();

  const handleSelectedPriceOfferCard = (id) => {
      if (selectedCards.includes(id)) {
        setSelectedCards(selectedCards.filter((card) => card !== id));
      } else {
        setSelectedCards([...selectedCards, id]);
      }
  };
  
  return (
    <PencilEditContext.Provider value={{ isEditing, setIsEditing, handleSelectedPriceOfferCard, deletePriceOffer, selectedCards }}>
      {children}
    </PencilEditContext.Provider>
  );
};
