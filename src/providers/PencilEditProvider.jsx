import React, { useState } from 'react';

export const PencilEditContext = React.createContext(null);

export const PencilEditProvider = ({ children }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [selectedCards, setSelectedCards] = useState([]);

  const handleSelected = (id) => {
      if (selectedCards.includes(id)) {
        setSelectedCards(selectedCards.filter((card) => card !== id));
      } else {
        setSelectedCards([...selectedCards, id]);
      }
  };
  
  return (
    <PencilEditContext.Provider value={{ isEditing, setIsEditing, handleSelected, selectedCards, setSelectedCards }}>
      {children}
    </PencilEditContext.Provider>
  );
};
