import React, { useState } from 'react';

export const PencilEditContext = React.createContext(null);

export const PencilEditProvider = ({ children }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [selectedCards, setSelectedCards] = useState([]);

  const handleSelectedPriceOfferCard = (id) => {
      if (selectedCards.includes(id)) {
        setSelectedCards(selectedCards.filter((card) => card !== id));
      } else {
        setSelectedCards([...selectedCards, id]);
      }
  };
  
  return (
    <PencilEditContext.Provider value={{ isEditing, setIsEditing, handleSelectedPriceOfferCard, selectedCards }}>
      {children}
    </PencilEditContext.Provider>
  );
};
