import React from 'react';
import { PencilEditProvider } from './PencilEditProvider';
import { ItemsProvider } from './ItemsProvider';

const ItemsProviders = ({ children }) => {

  return (
    <PencilEditProvider>
        <ItemsProvider>
          {children}
        </ItemsProvider>
    </PencilEditProvider>
  );
};

export default ItemsProviders;
